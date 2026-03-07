import { useState, useEffect } from "react";

const ALL_RECIPES = [
  {
    id: 1, name: "Chicken Fajita Bowl", cuisine: "Mexican", type: "favorite",
    calories: 560, protein: 44, carbs: 34, fat: 15, time: 30, spice: "medium",
    proteins: ["chicken"],
    ingredients: [
      { name: "Chicken breast", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Bell peppers (red & yellow)", amount: "2 large", section: "Produce" },
      { name: "Lime", amount: "2", section: "Produce" },
      { name: "Greek yogurt (plain, 2%)", amount: "3 tbsp", section: "Dairy" },
      { name: "Corn tortillas", amount: "2", section: "Bread & Bakery" },
      { name: "Shredded cabbage", amount: "1 cup", section: "Produce" },
    ],
    steps: ["Slice chicken into strips. Season with cumin, paprika, chili powder, garlic.", "Cook in very hot pan 4 min per side until charred edges.", "Add peppers last 4 min so they stay slightly crisp.", "Serve over rice with lime squeeze, cabbage, and Greek yogurt."],
    tags: ["high-protein", "favorite", "meal-prep-friendly"],
  },
  {
    id: 2, name: "Soy-Glazed Ground Beef Bowl", cuisine: "Asian", type: "favorite",
    calories: 580, protein: 42, carbs: 30, fat: 20, time: 25, spice: "mild",
    proteins: ["beef"],
    ingredients: [
      { name: "Ground beef (90/10 lean)", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Broccoli florets", amount: "2 cups", section: "Produce" },
      { name: "Green onions", amount: "4 stalks", section: "Produce" },
      { name: "Sesame seeds", amount: "2 tsp", section: "Pantry" },
      { name: "Fresh ginger", amount: "1 tbsp", section: "Produce" },
      { name: "Honey", amount: "1 tbsp", section: "Pantry", staple: true },
    ],
    steps: ["Brown beef in pan over high heat. Drain excess fat.", "Add ginger, 3 tbsp soy sauce, honey. Reduce 2 min.", "Push beef aside, add broccoli with splash of water. Cover 3 min.", "Serve over rice, top with green onions and sesame seeds."],
    tags: ["high-protein", "favorite", "quick"],
  },
  {
    id: 3, name: "Marinated Chicken Thighs & Roasted Veggies", cuisine: "Italian", type: "favorite",
    calories: 540, protein: 45, carbs: 20, fat: 26, time: 40, spice: "mild",
    proteins: ["chicken"],
    ingredients: [
      { name: "Bone-in chicken thighs (skin-on)", amount: "2 large (~10 oz)", section: "Meat & Seafood" },
      { name: "Zucchini", amount: "2 medium", section: "Produce" },
      { name: "Cherry tomatoes", amount: "1.5 cups", section: "Produce" },
      { name: "Red onion", amount: "1 medium", section: "Produce" },
      { name: "Lemon", amount: "2", section: "Produce" },
    ],
    steps: ["Marinate chicken in lemon, garlic, oregano, olive oil — 30 min minimum.", "Sear skin-side down in oven-safe pan 5 min until golden.", "Flip, add veggies around chicken. Roast 425°F for 30 min.", "Rest 5 min. Squeeze fresh lemon before serving."],
    tags: ["low-carb", "favorite", "meal-prep-friendly"],
  },
  {
    id: 4, name: "Ground Turkey Taco Bowl", cuisine: "Mexican", type: "favorite",
    calories: 550, protein: 43, carbs: 32, fat: 16, time: 25, spice: "medium",
    proteins: ["turkey"],
    ingredients: [
      { name: "Ground turkey (93% lean)", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Black beans (canned)", amount: "3/4 cup", section: "Canned & Dry Goods" },
      { name: "Fresh salsa", amount: "1/3 cup", section: "Produce" },
      { name: "Shredded cabbage", amount: "1.5 cups", section: "Produce" },
      { name: "Avocado", amount: "1/2", section: "Produce" },
      { name: "Lime", amount: "2", section: "Produce" },
    ],
    steps: ["Cook turkey with taco spices (cumin, chili powder, garlic, paprika).", "Add black beans last 2 min to warm through.", "Build bowl: cabbage base, turkey & beans, salsa on top.", "Finish with avocado and heavy squeeze of lime."],
    tags: ["high-protein", "favorite"],
  },
  {
    id: 5, name: "Teriyaki Chicken Thighs & Broccoli", cuisine: "Asian", type: "favorite",
    calories: 545, protein: 44, carbs: 28, fat: 18, time: 35, spice: "none",
    proteins: ["chicken"],
    ingredients: [
      { name: "Boneless chicken thighs", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Broccoli florets", amount: "2.5 cups", section: "Produce" },
      { name: "Low-sodium teriyaki sauce", amount: "4 tbsp", section: "Condiments", specialty: true },
      { name: "Sesame seeds", amount: "1 tsp", section: "Pantry" },
      { name: "Green onions", amount: "3 stalks", section: "Produce" },
    ],
    steps: ["Air fry broccoli at 400°F for 12 min, shaking halfway.", "Cook chicken thighs in pan 5 min per side. Add teriyaki sauce last 2 min, let it caramelize.", "Slice chicken. Serve over rice with broccoli alongside.", "Top with sesame seeds and green onions."],
    tags: ["high-protein", "favorite", "meal-prep-friendly"],
  },
  {
    id: 6, name: "Pork Tenderloin with Roasted Sweet Potato", cuisine: "Italian", type: "new",
    calories: 560, protein: 40, carbs: 40, fat: 14, time: 40, spice: "mild",
    proteins: ["pork"],
    ingredients: [
      { name: "Pork tenderloin", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Sweet potatoes", amount: "1 large", section: "Produce" },
      { name: "Asparagus", amount: "1 bunch", section: "Produce" },
      { name: "Dijon mustard", amount: "2 tbsp", section: "Condiments" },
      { name: "Fresh rosemary", amount: "2 sprigs", section: "Produce" },
      { name: "Lemon", amount: "1", section: "Produce" },
    ],
    steps: ["Rub tenderloin with Dijon, garlic, rosemary, salt & pepper.", "Sear all sides 2 min each in oven-safe pan.", "Add cubed sweet potato and asparagus around pork.", "Roast 400°F 22–25 min until 145°F internal. Rest 5 min before slicing."],
    tags: ["balanced", "new", "meal-prep-friendly"],
  },
  {
    id: 7, name: "Baked Salmon with Garlic Green Beans", cuisine: "Asian", type: "new",
    calories: 530, protein: 42, carbs: 18, fat: 28, time: 25, spice: "mild",
    proteins: ["fish"],
    ingredients: [
      { name: "Salmon fillet (skin-on)", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Green beans", amount: "2 cups", section: "Produce" },
      { name: "Garlic cloves", amount: "4", section: "Produce" },
      { name: "Lemon", amount: "1", section: "Produce" },
      { name: "Sesame oil", amount: "1 tsp", section: "Condiments", specialty: true },
    ],
    steps: ["Pat salmon dry. Brush with soy sauce, sesame oil, minced garlic.", "Bake skin-side down at 400°F for 14–16 min.", "Sauté green beans in pan with garlic and soy sauce, 6 min.", "Serve salmon over rice with green beans and a lemon wedge."],
    tags: ["high-protein", "new", "low-carb"],
  },
  {
    id: 8, name: "Italian Beef & Pasta Bolognese", cuisine: "Italian", type: "new",
    calories: 620, protein: 40, carbs: 52, fat: 18, time: 40, spice: "none",
    proteins: ["beef"],
    ingredients: [
      { name: "Ground beef (90/10)", amount: "7 oz", section: "Meat & Seafood" },
      { name: "Whole wheat penne", amount: "2.5 oz dry", section: "Pantry" },
      { name: "Crushed tomatoes (canned)", amount: "1 cup", section: "Canned & Dry Goods" },
      { name: "Carrots", amount: "1 medium", section: "Produce" },
      { name: "Celery", amount: "2 stalks", section: "Produce" },
      { name: "Parmesan (grated)", amount: "1 tbsp", section: "Dairy" },
    ],
    steps: ["Finely dice carrot and celery. Sauté in olive oil 5 min.", "Add beef, brown over high heat. Drain fat.", "Add crushed tomatoes, oregano, splash of broth. Simmer 20 min.", "Cook pasta al dente, toss with sauce. Top with parmesan."],
    tags: ["hearty", "new", "italian-classic"],
  },
  {
    id: 9, name: "Chicken Burrito Bowl", cuisine: "Mexican", type: "new",
    calories: 570, protein: 46, carbs: 38, fat: 14, time: 30, spice: "medium",
    proteins: ["chicken"],
    ingredients: [
      { name: "Chicken breast", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Pinto beans (canned)", amount: "3/4 cup", section: "Canned & Dry Goods" },
      { name: "Corn (frozen or canned)", amount: "1/2 cup", section: "Frozen" },
      { name: "Roma tomatoes", amount: "2", section: "Produce" },
      { name: "Jalapeño", amount: "1 small", section: "Produce" },
      { name: "Lime", amount: "2", section: "Produce" },
      { name: "Fresh cilantro", amount: "small bunch", section: "Produce" },
    ],
    steps: ["Cook chicken in instant pot with broth, cumin, chili powder — 12 min high pressure.", "Shred chicken. Warm pinto beans and corn in pan.", "Dice tomatoes and jalapeño for quick pico.", "Build bowl: rice, chicken, beans, corn, pico, lime, cilantro."],
    tags: ["high-protein", "new", "meal-prep-friendly"],
  },
  {
    id: 10, name: "Asian Pork & Bok Choy Stir-Fry", cuisine: "Asian", type: "new",
    calories: 540, protein: 40, carbs: 30, fat: 20, time: 30, spice: "medium",
    proteins: ["pork"],
    ingredients: [
      { name: "Pork tenderloin (thinly sliced)", amount: "8 oz", section: "Meat & Seafood" },
      { name: "Baby bok choy", amount: "3 heads", section: "Produce" },
      { name: "Shiitake mushrooms", amount: "1 cup", section: "Produce" },
      { name: "Fresh ginger", amount: "1 tbsp", section: "Produce" },
      { name: "Garlic cloves", amount: "4", section: "Produce" },
      { name: "Oyster sauce", amount: "2 tbsp", section: "Condiments", specialty: true },
      { name: "Sesame oil", amount: "1 tsp", section: "Condiments", specialty: true },
    ],
    steps: ["Freeze pork 15 min for easier slicing — thin strips cook fast.", "Heat wok until smoking. Add pork, stir-fry 3 min. Remove.", "Add ginger, garlic, mushrooms, bok choy. Stir-fry 4 min.", "Return pork, add oyster sauce + soy sauce. Toss 1 min. Finish with sesame oil over rice."],
    tags: ["high-protein", "new", "quick"],
  },
  {
    id: 11, name: "Baked Chicken Breast with Roasted Potatoes", cuisine: "Italian", type: "new",
    calories: 555, protein: 48, carbs: 38, fat: 14, time: 40, spice: "mild",
    proteins: ["chicken"],
    ingredients: [
      { name: "Chicken breast (large)", amount: "9 oz", section: "Meat & Seafood" },
      { name: "Baby potatoes", amount: "1.5 cups", section: "Produce" },
      { name: "Cherry tomatoes", amount: "1 cup", section: "Produce" },
      { name: "Baby spinach", amount: "2 cups", section: "Produce" },
      { name: "Lemon", amount: "1", section: "Produce" },
      { name: "Fresh basil", amount: "small bunch", section: "Produce" },
    ],
    steps: ["Season chicken with Italian herbs, garlic, lemon zest.", "Halve potatoes, toss in olive oil + rosemary. Roast 425°F for 15 min.", "Add chicken and tomatoes to sheet pan. Roast 20 more min.", "Wilt spinach with residual heat. Serve topped with fresh basil."],
    tags: ["high-protein", "new", "sheet-pan"],
  },
];

const SECTIONS_ORDER = ["Produce", "Meat & Seafood", "Dairy", "Bread & Bakery", "Canned & Dry Goods", "Condiments", "Pantry", "Frozen"];
const SECTION_ICON = { "Produce": "🥦", "Meat & Seafood": "🥩", "Dairy": "🥛", "Bread & Bakery": "🍞", "Canned & Dry Goods": "🥫", "Condiments": "🧴", "Pantry": "🫙", "Frozen": "❄️" };
const CUISINE_COLORS = {
  Mexican: { bg: "#FFF3E0", emoji: "🌮" },
  Asian: { bg: "#E8F5E9", emoji: "🍜" },
  Italian: { bg: "#FCE4EC", emoji: "🍝" },
  American: { bg: "#F3E5F5", emoji: "🥩" },
};
const DAYS = ["Mon–Wed Lunch", "Mon–Wed Dinner", "Thu–Sat Lunch", "Thu–Sat Dinner"];

const SPICE_RANK = { none: 0, mild: 1, medium: 2, hot: 3 };

function filterRecipes(profile) {
  const avoidProteins = Object.entries(profile.proteins || {}).filter(([, v]) => !v).map(([k]) => k);
  const maxSpice = SPICE_RANK[profile.spice] ?? 2;
  return ALL_RECIPES.filter(r => {
    if (r.proteins.some(p => avoidProteins.includes(p))) return false;
    if ((SPICE_RANK[r.spice] ?? 0) > maxSpice) return false;
    return true;
  });
}

function generateWeeklyPlan(profile) {
  const pool = filterRecipes(profile);
  const favorites = pool.filter(r => r.type === "favorite");
  const newOnes = pool.filter(r => r.type === "new");
  const favCount = Math.min(favorites.length, Math.floor(Math.random() * 2) + 1);
  const selected = [
    ...[...favorites].sort(() => Math.random() - 0.5).slice(0, favCount),
    ...[...newOnes].sort(() => Math.random() - 0.5).slice(0, 4 - favCount),
  ].sort(() => Math.random() - 0.5);
  return selected.slice(0, 4);
}

function buildGroceryList(meals) {
  const grouped = {};
  SECTIONS_ORDER.forEach(s => { grouped[s] = []; });
  meals.forEach(meal => {
    meal.ingredients.forEach(ing => {
      if (ing.staple) return;
      const s = ing.section || "Pantry";
      if (!grouped[s]) grouped[s] = [];
      if (!grouped[s].find(i => i.name === ing.name)) grouped[s].push({ ...ing, recipe: meal.name });
    });
  });
  return grouped;
}

// ── ONBOARDING ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "goal", title: "What's your main goal?", type: "single",
    options: [
      { value: "lose_weight", label: "Lose Weight", emoji: "🔥" },
      { value: "maintain", label: "Maintain Weight", emoji: "⚖️" },
      { value: "build_muscle", label: "Build Muscle", emoji: "💪" },
      { value: "eat_healthy", label: "Eat Healthier", emoji: "🥗" },
    ],
  },
  {
    id: "cuisines", title: "Which cuisines do you love?", subtitle: "Select all that apply", type: "multi",
    options: [
      { value: "Mexican", label: "Mexican", emoji: "🌮" },
      { value: "Asian", label: "Asian", emoji: "🍜" },
      { value: "Italian", label: "Italian", emoji: "🍝" },
      { value: "American", label: "American", emoji: "🍔" },
    ],
  },
  {
    id: "proteins", title: "Which proteins do you enjoy?", subtitle: "Select all that apply", type: "protein",
    options: [
      { value: "chicken", label: "Chicken", emoji: "🍗" },
      { value: "beef", label: "Beef", emoji: "🥩" },
      { value: "pork", label: "Pork", emoji: "🐷" },
      { value: "turkey", label: "Ground Turkey", emoji: "🦃" },
      { value: "fish", label: "Fish (no shellfish)", emoji: "🐟" },
      { value: "eggs", label: "Eggs", emoji: "🥚" },
    ],
  },
  {
    id: "spice", title: "How spicy do you like it?", type: "single",
    options: [
      { value: "none", label: "No Spice", emoji: "🧊" },
      { value: "mild", label: "Mild", emoji: "🌿" },
      { value: "medium", label: "Medium", emoji: "🌶️" },
      { value: "hot", label: "Hot", emoji: "🔥" },
    ],
  },
  {
    id: "calories", title: "Calorie target per meal?", type: "single",
    options: [
      { value: "under400", label: "Under 400 kcal", emoji: "🪶" },
      { value: "400_600", label: "400–600 kcal", emoji: "✅" },
      { value: "600_800", label: "600–800 kcal", emoji: "💪" },
      { value: "800plus", label: "800+ kcal", emoji: "🏋️" },
    ],
  },
  {
    id: "schedule", title: "What's your prep schedule?", type: "single",
    options: [
      { value: "sunday_full", label: "Sunday — same meals Mon–Sat", emoji: "📅" },
      { value: "sunday_wed", label: "Sunday + Wednesday split", emoji: "🗓️" },
      { value: "flexible", label: "Flexible / varies", emoji: "🔄" },
    ],
  },
];

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(-1); // -1 = name screen
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});

  const current = STEPS[step];

  function advance(updated) {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else onComplete({ ...updated, name });
  }

  function select(val) {
    if (!current) return;
    if (current.type === "single") {
      const updated = { ...answers, [current.id]: val };
      setAnswers(updated);
      setTimeout(() => advance(updated), 220);
    } else {
      const prev = answers[current.id] || [];
      setAnswers(a => ({ ...a, [current.id]: prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val] }));
    }
  }

  function isSelected(val) {
    const a = answers[current?.id];
    if (!a) return false;
    return current.type === "multi" || current.type === "protein" ? a.includes(val) : a === val;
  }

  const canNext = current && (current.type === "single" ? !!answers[current.id] : (answers[current.id]?.length > 0));

  // Name screen
  if (step === -1) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={{ fontSize: 42, textAlign: "center", marginBottom: 10 }}>🥦</div>
          <h1 style={S.bigTitle}>Sunday Prep Planner</h1>
          <p style={S.sub}>Personalized weekly meal plans + smart grocery lists tailored to you.</p>
          <input
            value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && name.trim() && setStep(0)}
            placeholder="Your first name…" style={S.input} autoFocus
          />
          <button onClick={() => name.trim() && setStep(0)} disabled={!name.trim()}
            style={{ ...S.btn, opacity: name.trim() ? 1 : 0.4 }}>
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Progress bar */}
        <div style={{ display: "flex", gap: 5, marginBottom: 26 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "#a78bfa" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
          ))}
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, color: "#a78bfa", textTransform: "uppercase", marginBottom: 7 }}>
          Step {step + 1} of {STEPS.length}
        </div>
        <h2 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 700, fontFamily: "Georgia, serif", color: "#f0ece3" }}>{current.title}</h2>
        {current.subtitle && <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(240,236,227,0.45)", fontFamily: "sans-serif" }}>{current.subtitle}</p>}

        <div style={{ display: "grid", gridTemplateColumns: current.options.length > 3 ? "1fr 1fr" : "1fr", gap: 9, marginTop: 16 }}>
          {current.options.map(opt => (
            <button key={opt.value} onClick={() => select(opt.value)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "11px 13px",
              borderRadius: 10, cursor: "pointer", color: "#f0ece3", fontFamily: "sans-serif",
              fontSize: 13, fontWeight: 500, textAlign: "left", transition: "all 0.15s",
              background: isSelected(opt.value) ? "rgba(167,139,250,0.22)" : "rgba(255,255,255,0.05)",
              border: isSelected(opt.value) ? "1.5px solid #a78bfa" : "1.5px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{ fontSize: 18 }}>{opt.emoji}</span>
              <span>{opt.label}</span>
              {isSelected(opt.value) && <span style={{ marginLeft: "auto", color: "#a78bfa" }}>✓</span>}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 10 }}>
          <button onClick={() => setStep(s => s - 1)} style={S.ghostBtn}>← Back</button>
          {(current.type === "multi" || current.type === "protein") && (
            <button onClick={() => advance(answers)} disabled={!canNext}
              style={{ ...S.btn, width: "auto", padding: "9px 20px", opacity: canNext ? 1 : 0.4 }}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [weekPlan, setWeekPlan] = useState([]);
  const [groceryList, setGroceryList] = useState({});
  const [activeTab, setActiveTab] = useState("plan");
  const [expanded, setExpanded] = useState(null);
  const [checked, setChecked] = useState({});
  const [generating, setGenerating] = useState(false);

  function handleProfile(p) {
    setProfile(p);
    runGenerate(p);
  }

  function runGenerate(p) {
    setGenerating(true);
    setExpanded(null);
    setTimeout(() => {
      const plan = generateWeeklyPlan(p || profile);
      setWeekPlan(plan);
      setGroceryList(buildGroceryList(plan));
      setChecked({});
      setGenerating(false);
    }, 500);
  }

  if (!profile) return <Onboarding onComplete={handleProfile} />;

  const totalCal = weekPlan.reduce((s, m) => s + m.calories, 0);
  const totalPro = weekPlan.reduce((s, m) => s + m.protein, 0);
  const totalItems = Object.values(groceryList).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)", color: "#f0ece3", fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa", fontFamily: "sans-serif", marginBottom: 3 }}>Sunday Prep Planner</div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, background: "linear-gradient(90deg, #f0ece3, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {profile.name}'s Weekly Plan
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          {weekPlan.length > 0 && (
            <div style={{ display: "flex", gap: 14 }}>
              <Stat label="Avg Cal" value={Math.round(totalCal / 4)} unit="kcal" />
              <Stat label="Avg Protein" value={Math.round(totalPro / 4)} unit="g" />
              <Stat label="Daily Cal" value={Math.round(totalCal / 2)} unit="kcal" />
            </div>
          )}
          <button onClick={() => runGenerate()} disabled={generating} style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)", border: "none", borderRadius: 8, color: "#fff", padding: "8px 16px", cursor: generating ? "not-allowed" : "pointer", fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, opacity: generating ? 0.6 : 1 }}>
            {generating ? "⏳ Generating…" : "🎲 New Week"}
          </button>
          <button onClick={() => setProfile(null)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, color: "rgba(240,236,227,0.5)", padding: "7px 13px", cursor: "pointer", fontSize: 11, fontFamily: "sans-serif" }}>
            👤 Switch Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {[["plan", "📅 This Week"], ["grocery", `🛒 Grocery List${totalItems > 0 ? ` (${checkedCount}/${totalItems})` : ""}`]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #a78bfa" : "2px solid transparent", color: activeTab === tab ? "#a78bfa" : "rgba(240,236,227,0.4)", padding: "12px 16px", cursor: "pointer", fontFamily: "sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "22px 24px", maxWidth: 820, margin: "0 auto" }}>
        {/* PLAN */}
        {activeTab === "plan" && (
          generating ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(240,236,227,0.3)" }}>Crafting your perfect week…</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {weekPlan.map((meal, i) => {
                const cc = CUISINE_COLORS[meal.cuisine] || CUISINE_COLORS.American;
                const open = expanded === meal.id;
                return (
                  <div key={meal.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 13, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "15px 17px", cursor: "pointer" }} onClick={() => setExpanded(open ? null : meal.id)}>
                      <div style={{ background: cc.bg, borderRadius: 9, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{cc.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: "rgba(240,236,227,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>{DAYS[i]}</span>
                          {meal.type === "favorite" && <span style={{ fontSize: 9, background: "rgba(167,139,250,0.2)", color: "#a78bfa", borderRadius: 4, padding: "1px 6px", fontFamily: "sans-serif" }}>★ FAVE</span>}
                          {meal.type === "new" && <span style={{ fontSize: 9, background: "rgba(52,211,153,0.15)", color: "#34d399", borderRadius: 4, padding: "1px 6px", fontFamily: "sans-serif" }}>✦ NEW</span>}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 1 }}>{meal.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(240,236,227,0.4)", fontFamily: "sans-serif" }}>{meal.cuisine} · {meal.time} min</div>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                        <MB label="cal" value={meal.calories} color="#f59e0b" />
                        <MB label="protein" value={`${meal.protein}g`} color="#34d399" />
                        <MB label="carbs" value={`${meal.carbs}g`} color="#60a5fa" />
                      </div>
                      <div style={{ color: "rgba(240,236,227,0.22)", fontSize: 11, marginLeft: 4 }}>{open ? "▲" : "▼"}</div>
                    </div>

                    {open && (
                      <div style={{ padding: "0 17px 17px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
                          <div>
                            <div style={SL}>Ingredients</div>
                            {meal.ingredients.map((ing, j) => (
                              <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
                                <span style={{ color: ing.staple ? "rgba(240,236,227,0.28)" : "inherit" }}>
                                  {ing.staple ? "✓ " : ""}{ing.name}
                                  {ing.specialty && <span style={{ color: "#f59e0b", fontSize: 9, marginLeft: 4 }}>★ specialty</span>}
                                </span>
                                <span style={{ color: "rgba(240,236,227,0.4)", fontSize: 11 }}>{ing.amount}</span>
                              </div>
                            ))}
                            <div style={{ fontSize: 9, color: "rgba(240,236,227,0.22)", marginTop: 5, fontFamily: "sans-serif" }}>✓ = pantry staple, excluded from grocery list</div>
                          </div>
                          <div>
                            <div style={SL}>Directions</div>
                            {meal.steps.map((step, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                                <div style={{ background: "rgba(167,139,250,0.18)", color: "#a78bfa", borderRadius: "50%", width: 19, height: 19, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, fontFamily: "sans-serif", fontWeight: 800 }}>{j + 1}</div>
                                <div style={{ fontSize: 12, lineHeight: 1.55, color: "rgba(240,236,227,0.78)" }}>{step}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* GROCERY */}
        {activeTab === "grocery" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(240,236,227,0.4)", fontFamily: "sans-serif" }}>
                4 meals · <span style={{ color: "#34d399" }}>Sunday prep</span> · Pantry staples excluded
              </div>
              <button onClick={() => setChecked({})} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "rgba(240,236,227,0.4)", padding: "5px 11px", cursor: "pointer", fontSize: 10, fontFamily: "sans-serif" }}>Clear All</button>
            </div>
            {SECTIONS_ORDER.map(section => {
              const items = groceryList[section] || [];
              if (!items.length) return null;
              return (
                <div key={section} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#a78bfa", marginBottom: 7, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                    {SECTION_ICON[section]} {section}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 9, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    {items.map((item, i) => {
                      const key = `${section}-${item.name}`;
                      const on = checked[key];
                      return (
                        <div key={i} onClick={() => setChecked(c => ({ ...c, [key]: !c[key] }))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer", background: on ? "rgba(52,211,153,0.05)" : "transparent", transition: "background 0.15s" }}>
                          <div style={{ width: 16, height: 16, borderRadius: 3, border: on ? "none" : "1.5px solid rgba(255,255,255,0.18)", background: on ? "#34d399" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                            {on && <span style={{ color: "#0f0c29", fontSize: 9, fontWeight: 900 }}>✓</span>}
                          </div>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 13, textDecoration: on ? "line-through" : "none", color: on ? "rgba(240,236,227,0.22)" : "inherit" }}>{item.name}</span>
                            {item.specialty && <span style={{ fontSize: 9, color: "#f59e0b", marginLeft: 5, fontFamily: "sans-serif" }}>★ specialty item</span>}
                          </div>
                          <span style={{ fontSize: 11, color: "rgba(240,236,227,0.35)", fontFamily: "sans-serif" }}>{item.amount}</span>
                          <span style={{ fontSize: 9, color: "rgba(240,236,227,0.2)", fontFamily: "sans-serif", maxWidth: 85, textAlign: "right", lineHeight: 1.3 }}>{item.recipe}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0f0c29,#1a1a2e,#16213e)", padding: 20 },
  card: { width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "34px 30px", color: "#f0ece3" },
  bigTitle: { margin: "0 0 8px", fontSize: 25, fontWeight: 700, textAlign: "center", fontFamily: "Georgia,serif", background: "linear-gradient(90deg,#f0ece3,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { textAlign: "center", color: "rgba(240,236,227,0.45)", fontSize: 13, margin: "0 0 26px", fontFamily: "sans-serif", lineHeight: 1.5 },
  input: { width: "100%", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 9, padding: "11px 15px", color: "#f0ece3", fontSize: 15, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box", marginBottom: 13 },
  btn: { width: "100%", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", border: "none", borderRadius: 9, color: "#fff", padding: "12px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif" },
  ghostBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, color: "rgba(240,236,227,0.5)", padding: "8px 14px", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif" },
};
const SL = { fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8, fontFamily: "sans-serif" };

function Stat({ label, value, unit }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#a78bfa" }}>{value}<span style={{ fontSize: 9, color: "rgba(240,236,227,0.35)", marginLeft: 2, fontFamily: "sans-serif" }}>{unit}</span></div>
      <div style={{ fontSize: 8, color: "rgba(240,236,227,0.35)", fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}
function MB({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 9, color: "rgba(240,236,227,0.3)", fontFamily: "sans-serif" }}>{label}</div>
    </div>
  );
}
