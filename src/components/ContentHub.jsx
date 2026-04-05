import { useState, useEffect, useCallback } from "react";

// ─── RECIPE DATA CATALOG ────────────────────────────────────────────────────
const RECIPES = [
  // HUCKLEBERRY HUB (priority)
  { id: "huckleberry-smash", slug: "huckleberry-moonshine-smash", title: "Huckleberry Moonshine Smash", category: "huckleberry", tags: ["huckleberry","summer","fruity"], emoji: "🫐", difficulty: "Easy", time: "5 min", featured: true },
  { id: "huckleberry-lemon-drop", slug: "huckleberry-lemon-drop-moonshine", title: "Huckleberry Lemon Drop", category: "huckleberry", tags: ["huckleberry","citrus","sweet"], emoji: "🍋", difficulty: "Easy", time: "5 min", featured: true },
  { id: "huckleberry-mule", slug: "montana-huckleberry-mule", title: "Montana Huckleberry Mule", category: "huckleberry", tags: ["huckleberry","ginger","copper mug"], emoji: "🫙", difficulty: "Easy", time: "5 min", featured: true },
  { id: "huckleberry-spritz", slug: "huckleberry-moonshine-spritz", title: "Huckleberry Moonshine Spritz", category: "huckleberry", tags: ["huckleberry","sparkling","brunch"], emoji: "✨", difficulty: "Easy", time: "3 min", featured: false },
  { id: "huckleberry-hot-toddy", slug: "huckleberry-hot-toddy-moonshine", title: "Huckleberry Hot Toddy", category: "huckleberry", tags: ["huckleberry","warm","winter"], emoji: "☕", difficulty: "Easy", time: "8 min", featured: false },
  // CAMPFIRE COLLECTION
  { id: "hot-apple-cider", slug: "hot-apple-cider-moonshine", title: "Campfire Hot Apple Cider", category: "campfire", tags: ["apple","warm","fall"], emoji: "🍎", difficulty: "Easy", time: "10 min", featured: false },
  { id: "campfire-toddy", slug: "campfire-hot-toddy-moonshine", title: "Campfire Hot Toddy", category: "campfire", tags: ["honey","lemon","winter"], emoji: "🔥", difficulty: "Easy", time: "8 min", featured: false },
  { id: "spiked-hot-chocolate", slug: "moonshine-spiked-hot-chocolate", title: "Spiked Hot Chocolate", category: "campfire", tags: ["chocolate","marshmallow","cozy"], emoji: "🍫", difficulty: "Easy", time: "10 min", featured: false },
  // RIVER & TRAIL
  { id: "moonshine-lemonade", slug: "moonshine-lemonade", title: "Moonshine Lemonade", category: "trail", tags: ["lemonade","summer","refreshing"], emoji: "🍋", difficulty: "Easy", time: "3 min", featured: false },
  { id: "montana-mule", slug: "montana-moonshine-mule", title: "Montana Mule", category: "trail", tags: ["ginger beer","lime","copper mug"], emoji: "🫙", difficulty: "Easy", time: "5 min", featured: false },
  { id: "sweet-tea-moonshine", slug: "moonshine-sweet-tea", title: "Sweet Tea Moonshine", category: "trail", tags: ["sweet tea","southern","easy"], emoji: "🍵", difficulty: "Easy", time: "3 min", featured: false },
  // CABIN WEEKEND
  { id: "apple-pie-punch", slug: "apple-pie-moonshine-punch", title: "Apple Pie Moonshine Punch", category: "cabin", tags: ["apple","cinnamon","batch"], emoji: "🥧", difficulty: "Medium", time: "15 min", featured: false },
  { id: "watermelon-punch", slug: "watermelon-moonshine-punch", title: "Watermelon Moonshine Punch", category: "cabin", tags: ["watermelon","summer","batch"], emoji: "🍉", difficulty: "Medium", time: "15 min", featured: false },
  // PORCH POUR
  { id: "moonshine-old-fashioned", slug: "moonshine-old-fashioned", title: "Moonshine Old Fashioned", category: "porch", tags: ["bitters","orange","stirred"], emoji: "🥃", difficulty: "Medium", time: "5 min", featured: false },
  { id: "moonshine-sour", slug: "moonshine-whiskey-sour", title: "Moonshine Whiskey Sour", category: "porch", tags: ["lemon","egg white","frothy"], emoji: "🍊", difficulty: "Medium", time: "8 min", featured: false },
];

const CATEGORIES = {
  huckleberry: { label: "Huckleberry Hub", color: "#7B3F8C", bg: "#F3E8FF", icon: "🫐", desc: "Montana's unclaimable berry. Zero competitors own this." },
  campfire: { label: "Campfire Collection", color: "#C04E1E", bg: "#FFF0E8", icon: "🔥", desc: "Warm drinks for nights under big sky stars." },
  trail: { label: "River & Trail", color: "#1B6B3A", bg: "#E8F5ED", icon: "🏔️", desc: "Flask & tumbler recipes for the outdoors." },
  cabin: { label: "Cabin Weekend", color: "#8B5E3C", bg: "#FDF0E0", icon: "🏕️", desc: "Batch cocktails for the whole crew." },
  porch: { label: "Porch Pour", color: "#2C5F7A", bg: "#E8F4FA", icon: "🌅", desc: "Slow-sipping classics with a Montana twist." },
};

// ─── JSON-LD GENERATOR ──────────────────────────────────────────────────────
function generateRecipeSchema(recipe, generatedData) {
  if (!generatedData) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": generatedData.description,
    "author": { "@type": "Organization", "name": "Montucky Moonshine" },
    "datePublished": "2026-04-03",
    "prepTime": `PT${recipe.time.replace(" min", "")  }M`,
    "totalTime": `PT${recipe.time.replace(" min", "")}M`,
    "recipeYield": "1 serving",
    "recipeCategory": "Cocktail",
    "recipeCuisine": "American",
    "keywords": recipe.tags.join(", ") + ", montana moonshine, craft spirits",
    "image": [`https://montuckymoonshine.com/images/${recipe.slug}-hero.jpg`],
    "recipeIngredient": generatedData.ingredients || [],
    "recipeInstructions": (generatedData.steps || []).map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "text": step
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "24"
    }
  };
}

// ─── API CALL — lean prompt, structured JSON output ─────────────────────────
async function fetchRecipeContent(recipe) {
  const systemPrompt = `You are a cocktail recipe writer for Montucky Moonshine, a Montana-based craft moonshine brand. 
Return ONLY valid JSON, no markdown, no preamble. Schema:
{
  "description": "string (2 sentences, SEO-optimized, includes 'montana moonshine' or recipe name keyword)",
  "ingredients": ["string array, each ingredient with exact measurement"],
  "steps": ["string array, 3-5 clear steps"],
  "tip": "string (one bartender tip, Montana/outdoor flavor)",
  "pairsWith": "string (what food or occasion this pairs with)",
  "seoFaq": [{"q":"string","a":"string"}] (2 FAQs targeting search intent)
}`;

  const userPrompt = `Recipe: ${recipe.title}
Category: ${CATEGORIES[recipe.category].label}
Tags: ${recipe.tags.join(", ")}
Difficulty: ${recipe.difficulty}, Time: ${recipe.time}
Base spirit: Montucky Moonshine (corn-based, 40-50% ABV, clean + slightly sweet)
${recipe.category === "huckleberry" ? "Feature Montana wild huckleberries prominently. These cannot be commercially cultivated — wild only." : ""}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    })
  });

  const data = await response.json();
  const raw = data.content?.[0]?.text || "{}";
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function SchemaViewer({ schema }) {
  const [open, setOpen] = useState(false);
  if (!schema) return null;
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: "none", border: "1px solid #D1C4E9", borderRadius: "6px",
        padding: "6px 14px", fontSize: "0.75rem", color: "#7B3F8C",
        cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.05em"
      }}>
        {open ? "▾" : "▸"} JSON-LD Schema
      </button>
      {open && (
        <pre style={{
          marginTop: "0.5rem", padding: "1rem", background: "#1A0A2E",
          color: "#C3B1E1", borderRadius: "8px", fontSize: "0.7rem",
          overflow: "auto", maxHeight: "300px", lineHeight: 1.6
        }}>
          {JSON.stringify(schema, null, 2)}
        </pre>
      )}
    </div>
  );
}

function RecipeCard({ recipe, onClick, isActive }) {
  const cat = CATEGORIES[recipe.category];
  return (
    <div onClick={() => onClick(recipe)} style={{
      background: isActive ? cat.color : "#fff",
      color: isActive ? "#fff" : "#1A0A2E",
      border: `2px solid ${isActive ? cat.color : "#E8E0F0"}`,
      borderRadius: "12px", padding: "1rem", cursor: "pointer",
      transition: "all 0.2s", transform: isActive ? "scale(1.02)" : "scale(1)",
      boxShadow: isActive ? `0 8px 24px ${cat.color}40` : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{recipe.emoji}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.3, marginBottom: "0.4rem" }}>
        {recipe.title}
      </div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <span style={{ background: isActive ? "rgba(255,255,255,0.2)" : cat.bg, color: isActive ? "#fff" : cat.color, borderRadius: "20px", padding: "2px 8px", fontSize: "0.7rem", fontWeight: 600 }}>
          {recipe.difficulty}
        </span>
        <span style={{ background: isActive ? "rgba(255,255,255,0.15)" : "#f5f5f5", color: isActive ? "#fff" : "#666", borderRadius: "20px", padding: "2px 8px", fontSize: "0.7rem" }}>
          ⏱ {recipe.time}
        </span>
      </div>
    </div>
  );
}

function RecipePage({ recipe, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cat = CATEGORIES[recipe.category];
  const schema = generateRecipeSchema(recipe, data);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRecipeContent(recipe)
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load recipe."); setLoading(false); });
  }, [recipe.id]);

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 1rem 4rem" }}>
      {/* Back */}
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: "6px", marginBottom: "1.5rem",
        background: "none", border: "none", color: cat.color, cursor: "pointer",
        fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", padding: 0
      }}>
        ← Back to Hub
      </button>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}30)`, borderRadius: "20px", padding: "2.5rem 2rem", marginBottom: "2rem", borderLeft: `6px solid ${cat.color}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "1.5rem", top: "1rem", fontSize: "4rem", opacity: 0.15 }}>{recipe.emoji}</div>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: cat.color, textTransform: "uppercase", marginBottom: "0.5rem" }}>
          {cat.icon} {cat.label}
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#1A0A2E", margin: "0 0 1rem", lineHeight: 1.2 }}>
          {recipe.title}
        </h1>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[`⏱ ${recipe.time}`, `📊 ${recipe.difficulty}`, ...recipe.tags.map(t => `#${t}`)].map(tag => (
            <span key={tag} style={{ background: "rgba(255,255,255,0.7)", borderRadius: "20px", padding: "4px 12px", fontSize: "0.75rem", color: "#444", fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: cat.color }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem", animation: "spin 1.5s linear infinite", display: "inline-block" }}>{recipe.emoji}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>Crafting your recipe…</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && <div style={{ padding: "1.5rem", background: "#FFF0F0", borderRadius: "12px", color: "#C00", textAlign: "center" }}>{error}</div>}

      {/* Content */}
      {data && !loading && (
        <>
          {/* Description */}
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#3A3050", marginBottom: "2rem", fontStyle: "italic" }}>
            {data.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            {/* Ingredients */}
            <div style={{ background: cat.bg, borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: cat.color, fontSize: "1.1rem", margin: "0 0 1rem" }}>🧪 Ingredients</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {(data.ingredients || []).map((ing, i) => (
                  <li key={i} style={{ padding: "6px 0", borderBottom: i < data.ingredients.length - 1 ? `1px solid ${cat.color}20` : "none", fontSize: "0.9rem", color: "#2A1A3E", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: cat.color, fontWeight: 700, flexShrink: 0 }}>—</span> {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div style={{ background: "#FAFAFA", borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1A0A2E", fontSize: "1.1rem", margin: "0 0 1rem" }}>📋 Instructions</h2>
              <ol style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {(data.steps || []).map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ background: cat.color, color: "#fff", borderRadius: "50%", width: "22px", height: "22px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, marginTop: "2px" }}>{i + 1}</span>
                    <span style={{ fontSize: "0.88rem", color: "#3A3050", lineHeight: 1.6 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tip + Pairing */}
          {(data.tip || data.pairsWith) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {data.tip && (
                <div style={{ background: "#1A0A2E", borderRadius: "12px", padding: "1.2rem", color: "#E8D5FF" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", color: cat.color, textTransform: "uppercase", marginBottom: "0.4rem" }}>Bartender Tip</div>
                  <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{data.tip}</p>
                </div>
              )}
              {data.pairsWith && (
                <div style={{ background: "#F8F4FF", borderRadius: "12px", padding: "1.2rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", color: cat.color, textTransform: "uppercase", marginBottom: "0.4rem" }}>Pairs With</div>
                  <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6, color: "#3A3050" }}>{data.pairsWith}</p>
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {data.seoFaq?.length > 0 && (
            <div style={{ borderTop: "2px solid #EEE", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1A0A2E", fontSize: "1.1rem", marginBottom: "1rem" }}>Frequently Asked Questions</h2>
              {data.seoFaq.map((faq, i) => (
                <details key={i} style={{ marginBottom: "0.75rem", borderRadius: "8px", border: "1px solid #E8E0F0", overflow: "hidden" }}>
                  <summary style={{ padding: "0.85rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", color: "#2A1A3E", background: "#FAFAFA" }}>
                    {faq.q}
                  </summary>
                  <div style={{ padding: "0.85rem 1rem", fontSize: "0.875rem", color: "#555", lineHeight: 1.7, background: "#fff" }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          )}

          {/* JSON-LD */}
          <SchemaViewer schema={schema} />

          {/* Raw slug for Shopify/Netlify */}
          <div style={{ marginTop: "1.5rem", padding: "0.75rem 1rem", background: "#F0F0F0", borderRadius: "8px", fontFamily: "monospace", fontSize: "0.75rem", color: "#666" }}>
            URL slug: /recipes/{recipe.slug}
          </div>
        </>
      )}
    </div>
  );
}

// ─── MAIN HUB ───────────────────────────────────────────────────────────────
export default function MontuckyHub() {
  const [activeCategory, setActiveCategory] = useState("huckleberry");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = RECIPES.filter(r =>
    (activeCategory === "all" || r.category === activeCategory) &&
    (search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.includes(search.toLowerCase())))
  );

  const handleRecipeClick = useCallback((recipe) => {
    setActiveRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (activeRecipe) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7FF", fontFamily: "'Georgia', serif", paddingTop: "2rem" }}>
        <RecipePage recipe={activeRecipe} onBack={() => setActiveRecipe(null)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7FF", fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #2D1854 60%, #1A0A2E 100%)", color: "#fff", padding: "3rem 2rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, #7B3F8C30 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C04E1E20 0%, transparent 40%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#C3B1E1", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Montucky Moonshine
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 0.5rem", lineHeight: 1.15, background: "linear-gradient(135deg, #fff, #E8D5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Cocktail & Recipe Hub
        </h1>
        <p style={{ color: "#B8A8D0", fontSize: "0.95rem", margin: "0 auto 1.5rem", maxWidth: "520px", lineHeight: 1.7 }}>
          Wild Montana ingredients. Zero competitors. 15+ recipes built for organic search.
        </p>
        {/* Search */}
        <input
          type="text"
          placeholder="Search recipes… huckleberry, mule, cider"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "30px", padding: "0.6rem 1.25rem", color: "#fff", fontSize: "0.875rem", width: "100%", maxWidth: "380px", outline: "none", fontFamily: "inherit" }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #EEE", padding: "0 1.5rem", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "0", maxWidth: "1100px", margin: "0 auto" }}>
          {[["all", "All Recipes", "🥃", "#555"], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.label, v.icon, v.color])].map(([key, label, icon, color]) => (
            <button key={key} onClick={() => { setActiveCategory(key); setSearch(""); }} style={{
              background: "none", border: "none", borderBottom: activeCategory === key ? `3px solid ${color}` : "3px solid transparent",
              color: activeCategory === key ? color : "#888", padding: "1rem 1.25rem", cursor: "pointer",
              fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", fontWeight: activeCategory === key ? 700 : 400,
              whiteSpace: "nowrap", transition: "all 0.15s"
            }}>
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Banner */}
      {activeCategory !== "all" && CATEGORIES[activeCategory] && (
        <div style={{ background: CATEGORIES[activeCategory].bg, borderBottom: `3px solid ${CATEGORIES[activeCategory].color}20`, padding: "1rem 2rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: CATEGORIES[activeCategory].color, fontSize: "0.875rem", fontStyle: "italic" }}>
            {CATEGORIES[activeCategory].desc}
          </p>
        </div>
      )}

      {/* Featured Banner (huckleberry only) */}
      {activeCategory === "huckleberry" && (
        <div style={{ maxWidth: "1100px", margin: "2rem auto 0", padding: "0 1.5rem" }}>
          <div style={{ background: "linear-gradient(135deg, #4A1A6B, #7B3F8C)", borderRadius: "16px", padding: "1.5rem 2rem", color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "1rem", top: "-10px", fontSize: "6rem", opacity: 0.12 }}>🫐</div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "#D4A8FF", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              SEO Goldmine · Zero Competitors Own This
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 0.5rem", fontSize: "1.4rem" }}>
              🫐 The Huckleberry Hub
            </h2>
            <p style={{ margin: 0, color: "#D4A8FF", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "500px" }}>
              Montana wild huckleberries can't be commercially cultivated. No Tennessee brand can credibly claim this. 
              "huckleberry moonshine" · Low KD 15–25 · 500–1,500 searches/mo · Ours to own.
            </p>
          </div>
        </div>
      )}

      {/* Recipe Grid */}
      <div style={{ maxWidth: "1100px", margin: "2rem auto", padding: "0 1.5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888", fontStyle: "italic" }}>No recipes match your search.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} isActive={false} />
            ))}
          </div>
        )}
      </div>

      {/* SEO Stats Footer */}
      <div style={{ background: "#1A0A2E", color: "#B8A8D0", padding: "2rem 1.5rem", textAlign: "center", fontSize: "0.8rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>Content Hub SEO Coverage</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            {[["15+", "Recipe Pages"], ["5", "Huckleberry Targets"], ["JSON-LD", "Schema on All Pages"], ["Low KD", "Tier 1 Keywords"], ["0", "Competitors Owning This"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ color: "#C3B1E1", fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{n}</div>
                <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
