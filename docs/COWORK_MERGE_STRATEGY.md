# Montucky Moonshine — Cowork Agent Clean Merge Strategy

**Purpose:** Ensure the Montucky Studio Cowork session (6 agent streams, 26+ pages) merges cleanly into `main` without stomping existing work or creating branch conflicts.

---

## Current Branch Inventory

| Branch | Contents | Merge Status |
|---|---|---|
| `main` | Production — 9 pages, full design system | ✅ Protected base |
| `feature/content-hub-recipes` | ContentHub.jsx, voice.js, shopify-audio.js, history.html voice wires, netlify.toml CSP update | 🟡 Ready — PR #11 |
| `feature/add-montucky-visual-assets` | 90 visual asset files (PNG/WebP, 4 sizes × 10 designs) | 🟡 Ready — PR pending |
| `feature/lifestyle-section` | Lifestyle index, recipe pages (previous pass) | ⚠️ Needs rebase check |
| `claude/*` branches | Various Claude Code agent worktrees | ⚠️ Audit before merge |
| `worktree-agent-*` | Parallel Claude Code agent sessions | ⚠️ Cherry-pick only |

---

## Pre-Cowork Checklist (Run Before Starting Cowork Session)

### 1. Merge existing clean branches first
```bash
# Merge PR #11 (content hub) via GitHub UI
# Then merge visual assets PR
# Result: main has ContentHub + 90 assets before Cowork starts
```

### 2. Rebase lifestyle-section off current main
```bash
git checkout feature/lifestyle-section
git fetch origin
git rebase origin/main
# Resolve conflicts in: netlify.toml, index.html nav links
git push --force-with-lease origin feature/lifestyle-section
```

### 3. Audit worktree-agent branches
```bash
# For each worktree-agent-* branch:
git log --oneline main..worktree-agent-XXXX
# Cherry-pick only commits that add NEW files
# Discard any that touch: css/style.css, js/main.js, netlify.toml, index.html
# (those files are owned by main — patch them explicitly)
```

---

## Cowork Session Branch Architecture

Each Cowork agent stream gets its own branch off **current main** (post-existing merges):

```
main (with content hub + visual assets merged)
├── cowork/stream-1-scaffold        ← pages, routing, nav additions ONLY
├── cowork/stream-2-recipes         ← /lifestyle/recipes/*.html files
├── cowork/stream-3-editorial       ← /lifestyle/culture/*.html + guides
├── cowork/stream-4-automation      ← js/social-*.js, n8n configs
├── cowork/stream-5-qa              ← Lighthouse fixes, responsive patches
└── cowork/stream-6-client-kit      ← docs/, video-scripts/
```

### File ownership rules (enforce in Cowork prompt)

| File | Owner Stream | Rule |
|---|---|---|
| `css/style.css` | Stream 1 only | All other streams read-only; submit CSS changes as a separate patch PR |
| `js/main.js` | Stream 1 only | Same — no other stream touches this |
| `netlify.toml` | Stream 1 only | New redirects go through stream-1 |
| `index.html` | Stream 1 only | Nav link additions only via stream-1 |
| `/lifestyle/recipes/*.html` | Stream 2 | Full ownership |
| `/lifestyle/culture/*.html` | Stream 3 | Full ownership |
| `/lifestyle/guides/*.html` | Stream 3 | Full ownership |
| `js/voice.js` | Pre-merged | Read-only in Cowork — already in main |
| `js/shopify-audio.js` | Pre-merged | Read-only in Cowork |
| `src/components/ContentHub.jsx` | Pre-merged | Read-only in Cowork |

---

## Merge Order (Sequential, Not Parallel)

```
1. cowork/stream-1-scaffold   → main  (establishes shared CSS tokens + routing)
2. cowork/stream-2-recipes    → main  (depends on stream-1 CSS classes)
3. cowork/stream-3-editorial  → main  (depends on stream-1 CSS classes)
4. cowork/stream-4-automation → main  (no CSS deps, can go anytime after stream-1)
5. cowork/stream-5-qa         → main  (runs last, patches everything)
6. cowork/stream-6-client-kit → main  (docs only, no conflict risk)
```

### Conflict hotspots to watch

1. **netlify.toml** — multiple streams may add redirects. Stream-1 owns it; others submit redirect additions as a comment in their PR for stream-1 to consolidate.

2. **index.html nav** — new pages need nav entries. Stream-1 adds all nav links in a single commit after reviewing what streams 2-3 produce.

3. **css/style.css** — recipe and editorial pages may need new component classes. Stream-1 adds them in a dedicated "styles for stream-2/3 pages" commit.

---

## The Cowork Orchestrator Prompt

Include this in the Cowork session kickoff:

```
You are building the Montucky Moonshine Proposal Site (montucky-moonshine-proposal.netlify.app).
Repo: ksksrbiz-arch/montucky-moonshine-proposal
Current main branch is the ground truth.

CRITICAL FILE RULES:
- css/style.css, js/main.js, netlify.toml, index.html are OWNED BY STREAM 1 ONLY.
  Other streams MUST NOT commit to these files.
  Instead, leave a comment block at the top of your PR: "## Needed CSS additions: ..."
  
- Use ONLY these design system classes from css/style.css:
  .v-grid, .v-hero, .v-card, .v-cap, .editorial, .person-card, .fact-box
  DO NOT write inline styles. DO NOT invent new class names.
  
- Voice triggers: add data-voice="[key]" to section wrappers where you want audio spots.
  Valid keys: opener, bertie, josephine, bootlegger, whiskey_rebellion, montana_repeal
  
- Audio player (Friends cover): add data-ambient-audio to <body> on venue/events/lifestyle pages.

- Every recipe page MUST include JSON-LD Recipe schema in a <script type="application/ld+json"> block.

- FTC compliance: NO fabricated reviews, star ratings, or unverified badges.

- Brand integrity: DO NOT alter the logo, favicon, or OG image.
```

---

## Post-Cowork Verification

```bash
# After all streams merged to main:
# 1. Lighthouse audit
npx lighthouse https://montucky-moonshine-proposal.netlify.app --output html

# 2. Check for broken redirects
grep -c "redirects" netlify.toml  # should be 35+ entries

# 3. Validate no inline styles crept in
grep -r 'style="' lifestyle/ | grep -v "display:none\|color-scheme\|text-anchor" | wc -l
# Should be minimal

# 4. Verify JSON-LD on recipe pages
grep -l "application/ld+json" lifestyle/recipes/*.html | wc -l
# Should equal number of recipe files

# 5. Voice triggers present on history page
grep "data-voice=" history.html | wc -l  # should be 3+
```

---

*Generated: 2026-04-05 | Montucky Moonshine × 1Commerce*
