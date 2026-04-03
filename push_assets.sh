#!/usr/bin/env bash
# =================================================================
# Montucky Moonshine — Bulk Asset Push to GitHub
# Extracts a local tar file and uploads every asset via GitHub API.
# Usage: GITHUB_PAT=ghp_xxx bash push_assets.sh /path/to/assets.tar.gz
# =================================================================
set -euo pipefail

# ── Token from environment (never hardcode secrets) ───────────────
if [[ -z "${GITHUB_PAT:-}" ]]; then
  echo "❌ GITHUB_PAT environment variable is not set."
  echo "Usage: GITHUB_PAT=ghp_xxx bash push_assets.sh <path-to-tar>"
  exit 1
fi

REPO="ksksrbiz-arch/montucky-moonshine-proposal"
BRANCH="feature/add-montucky-visual-assets"
DEST_DIR="assets/montucky-visuals"
API="https://api.github.com/repos/$REPO"

# ── Arg check ────────────────────────────────────────────────────
if [[ $# -lt 1 ]]; then
  echo "Usage: GITHUB_PAT=ghp_xxx bash push_assets.sh <path-to-tar>"
  echo "Supported: .tar  .tar.gz  .tar.bz2  .tgz"
  exit 1
fi

TAR="$1"
[[ ! -f "$TAR" ]] && { echo "❌ Not found: $TAR"; exit 1; }
for cmd in curl python3 tar; do
  command -v "$cmd" &>/dev/null || { echo "❌ Missing: $cmd"; exit 1; }
done

# ── Extract ───────────────────────────────────────────────────────
TMP=$(mktemp -d /tmp/montucky_XXXXXX)
trap "rm -rf $TMP" EXIT

echo "📦 Extracting $(basename "$TAR")..."
tar -xf "$TAR" -C "$TMP"

# Unwrap single top-level wrapper dir if present
mapfile -t ITEMS < <(ls -1 "$TMP")
if [[ ${#ITEMS[@]} -eq 1 && -d "$TMP/${ITEMS[0]}" ]]; then
  ROOT="$TMP/${ITEMS[0]}"
  echo "   Unwrapped: ${ITEMS[0]}/"
else
  ROOT="$TMP"
fi

COUNT=$(find "$ROOT" -type f ! -path "*/__MACOSX/*" ! -name ".DS_Store" ! -name "Thumbs.db" | wc -l | tr -d ' ')
echo "   $COUNT files found"
echo ""

# ── Upload helper ─────────────────────────────────────────────────
push_file() {
  local lpath="$1" rel="$2"
  local gpath="$DEST_DIR/$rel"
  local payload
  payload=$(mktemp /tmp/gh_XXXXXX.json)

  # Build JSON with base64 content
  python3 - "$lpath" "$gpath" "$BRANCH" > "$payload" << 'PY'
import sys, json, base64
lp, gp, br = sys.argv[1], sys.argv[2], sys.argv[3]
with open(lp, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode()
print(json.dumps({"message": "Add " + gp.split("/")[-1], "content": b64, "branch": br}))
PY

  # Get existing SHA if file already on branch (for updates)
  sha=$(curl -sf -H "Authorization: Bearer $GITHUB_PAT" \
    "$API/contents/$gpath?ref=$BRANCH" 2>/dev/null \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))" 2>/dev/null || true)

  if [[ -n "$sha" ]]; then
    python3 - "$payload" "$sha" << 'PY'
import sys, json
p, sha = sys.argv[1], sys.argv[2]
with open(p) as f: d = json.load(f)
d['sha'] = sha
with open(p, 'w') as f: json.dump(d, f)
PY
  fi

  out=$(curl -s -X PUT \
    -H "Authorization: Bearer $GITHUB_PAT" \
    -H "Content-Type: application/json" \
    "$API/contents/$gpath" --data "@$payload")
  rm "$payload"

  echo "$out" | python3 -c "
import sys,json
d=json.load(sys.stdin)
print('ok' if 'content' in d else 'err:'+d.get('message','unknown'))
"
}

# ── Loop ──────────────────────────────────────────────────────────
echo "🚀 Uploading to github.com/$REPO  [$BRANCH]"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

OK=0; FAIL=0; N=0

while IFS= read -r -d '' f; do
  rel="${f#$ROOT/}"
  [[ "$rel" == .* || "$rel" == *__MACOSX* || "$rel" == *.DS_Store || "$rel" == *Thumbs.db ]] && continue
  ((N++)) || true
  printf "[%3d/%d] %-52s" "$N" "$COUNT" "$rel"
  st=$(push_file "$f" "$rel")
  if [[ "$st" == "ok" ]]; then
    echo " ✅"; ((OK++)) || true
  else
    echo " ❌ ${st#err:}"; ((FAIL++)) || true
  fi
  sleep 0.15   # ~400 req/min, well under 5000/hr cap
done < <(find "$ROOT" -type f -print0 | sort -z)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ $OK uploaded   ❌ $FAIL failed"
echo ""
[[ $FAIL -gt 0 ]] && { echo "⚠️  Re-run to retry failures."; exit 1; }
echo "🎉 All $OK assets are live."
