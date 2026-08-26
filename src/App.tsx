import React, { useState } from 'react';

const recipes = [
  { id: 1, title: 'Cremet kyllingepasta', time: '25 min', tag: 'Familiefavorit', emoji: '🍝', effort: 'easy', mood: 'cozy', ingredients: ['kylling', 'pasta', 'fløde'] },
  { id: 2, title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟', effort: 'easy', mood: 'fresh', ingredients: ['laks', 'kartofler', 'broccoli'] },
  { id: 3, title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮', effort: 'easy', mood: 'fun', ingredients: ['kylling', 'tortillas', 'majs'] },
  { id: 4, title: 'Spaghetti bolognese', time: '35 min', tag: 'Klassiker', emoji: '🍝', effort: 'medium', mood: 'cozy', ingredients: ['pasta', 'hakket oksekød', 'tomat'] },
];

const ingredientLabels: Record<string, string> = {
  kylling: 'Kylling', pasta: 'Pasta', fløde: 'Fløde', laks: 'Laks', kartofler: 'Kartofler', broccoli: 'Broccoli',
  tortillas: 'Tortillas', majs: 'Majs', 'hakket oksekød': 'Hakket oksekød', tomat: 'Tomat',
};

const initialShopping = ['Kylling', 'Pasta', 'Fløde', 'Broccoli', 'Mælk', 'Bananer'];
const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const defaultMeals = ['Cremet kyllingepasta', 'Rugbrød + rester', 'Laks med kartofler', 'Tacos med kylling', 'Pizza', 'Burger', 'Familiefavorit'];

const pantryOptions = [
  { value: 'kylling', label: 'Kylling', emoji: '🍗' }, { value: 'pasta', label: 'Pasta', emoji: '🍝' }, { value: 'kartofler', label: 'Kartofler', emoji: '🥔' },
  { value: 'broccoli', label: 'Broccoli', emoji: '🥦' }, { value: 'fløde', label: 'Fløde', emoji: '🥛' }, { value: 'laks', label: 'Laks', emoji: '🐟' },
  { value: 'tortillas', label: 'Tortillas', emoji: '🌯' }, { value: 'tomat', label: 'Tomat', emoji: '🍅' }, { value: 'majs', label: 'Majs', emoji: '🌽' },
];

const helpOptions = {
  energy: [{ value: 'low', label: 'Jeg er helt flad', emoji: '🫶' }, { value: 'okay', label: 'Jeg har lidt overskud', emoji: '🙂' }, { value: 'good', label: 'Jeg har fint overskud', emoji: '✨' }],
  time: [{ value: 'quick', label: 'Helst 20 min eller mindre', emoji: '⚡' }, { value: 'normal', label: '20–35 min er fint', emoji: '⏱️' }, { value: 'slow', label: 'Jeg vil gerne hygge mig', emoji: '🍳' }],
  mood: [{ value: 'cozy', label: 'Noget trygt og hyggeligt', emoji: '🥰' }, { value: 'fresh', label: 'Noget let og friskt', emoji: '🌿' }, { value: 'fun', label: 'Noget børnene vil elske', emoji: '🎉' }],
};

type HelpChoice = { energy: string; time: string; mood: string; pantry: string[] };
type Plan = Record<string, string | null>;
type ShoppingItem = { name: string; done: boolean };
type NavItem = { key: string; icon: string; label: string; hint: string };

const navItems: NavItem[] = [
  { key: 'plan', icon: '📅', label: 'Madplan', hint: 'Hvad skal vi spise?' },
  { key: 'recipes', icon: '🍲', label: 'Opskrifter', hint: 'Find noget lækkert' },
  { key: 'shopping', icon: '🛒', label: 'Indkøb', hint: 'Det mangler vi' },
];

function Alf({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'alf-svg small' : 'alf-svg'} viewBox="0 0 120 140" aria-label="KøkkenAlf">
    <path d="M27 38 Q21 22 34 18 Q45 22 51 34" fill="#D98A5B" /><path d="M93 38 Q99 22 86 18 Q75 22 69 34" fill="#D98A5B" />
    <path d="M30 46 Q31 24 60 22 Q89 24 90 46 L86 78 Q81 103 60 108 Q39 103 34 78Z" fill="#F2C59E" />
    <path d="M35 47 Q39 20 60 16 Q81 20 85 47 Q72 39 60 41 Q48 39 35 47Z" fill="#E9B85F" />
    <path d="M44 57 Q48 53 52 57 M68 57 Q72 53 76 57" stroke="#33352F" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="62" r="3" fill="#33352F" /><circle cx="70" cy="62" r="3" fill="#33352F" />
    <path d="M53 76 Q60 82 67 76" stroke="#9A5B45" strokeWidth="3" strokeLinecap="round" fill="none" /><circle cx="60" cy="68" r="5" fill="#E6A77D" />
    <path d="M28 109 Q38 95 60 98 Q82 95 92 109 L101 132 L19 132Z" fill="#6D8C63" /><path d="M44 103 L50 128 M76 103 L70 128" stroke="#F5E5C8" strokeWidth="5" strokeLinecap="round" />
    <path d="M52 103 Q60 109 68 103 L66 129 L54 129Z" fill="#F4E2BF" /><path d="M48 119 L60 112 L72 119" stroke="#D18A51" strokeWidth="4" fill="none" /><circle cx="60" cy="116" r="3" fill="#D18A51" />
  </svg>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [shopping, setShopping] = useState<ShoppingItem[]>(initialShopping.map((name) => ({ name, done: false })));
  const [plan, setPlan] = useState<Plan>(Object.fromEntries(days.map((day, i) => [day, defaultMeals[i]])));
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[number] | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleShopping = (index: number) => setShopping((items) => items.map((item, i) => i === index ? { ...item, done: !item.done } : item));

  const addRecipeToDay = (recipe: typeof recipes[number], day: string) => {
    setPlan((current) => ({ ...current, [day]: recipe.title }));
    setShopping((current) => {
      const names = new Set(current.map((item) => item.name.toLowerCase()));
      const additions = recipe.ingredients.filter((item) => !names.has(item.toLowerCase())).map((item) => ({ name: ingredientLabels[item] || item, done: false }));
      return [...current, ...additions];
    });
    setSelectedRecipe(null);
    setPage('plan');
  };

  return <div className="app">
    <header className="topbar"><button className="brand" onClick={() => setPage('home')} aria-label="Gå til forsiden"><Alf small /><span><strong>KøkkenAlf</strong><small>Din lille hjælper i køkkenet</small></span></button>
      <nav className="topnav"><button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Hjem</button>{navItems.map((item) => <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => setPage(item.key)}><span>{item.icon}</span>{item.label}</button>)}</nav>
    </header>
    <main>
      {page === 'home' && <Home setPage={setPage} onHelp={() => setHelpOpen(true)} />}
      {page === 'plan' && <MealPlan plan={plan} onPickRecipe={() => setPage('recipes')} />}
      {page === 'recipes' && <Recipes onOpen={setSelectedRecipe} />}
      {page === 'shopping' && <Shopping shopping={shopping} toggleShopping={toggleShopping} />}
    </main>
    <footer>♡ KøkkenAlf · mindre stress, mere madglæde</footer>
    {helpOpen && <HelpMe onClose={() => setHelpOpen(false)} />}
    {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} onAdd={addRecipeToDay} />}
  </div>;
}

function Home({ setPage, onHelp }: { setPage: (page: string) => void; onHelp: () => void }) {
  return <section className="hero"><div className="hero-copy"><div className="hello-row"><div className="alf-bubble"><Alf /></div><div><span className="eyebrow">Hej fra køkkenet 👋</span><p className="alf-says">“Jeg hjælper dig med at finde på noget nemt.”</p></div></div>
    <h1>Hvad skal vi finde på i køkkenet?</h1><p>KøkkenAlf hjælper dig med at gøre hverdagsmaden lidt lettere. Ingen løftede pegefingre – bare små idéer, der passer til jeres familie.</p>
    <div className="actions"><button className="primary" onClick={() => setPage('plan')}>📅 Se ugens madplan</button><button className="secondary" onClick={() => setPage('recipes')}>🍲 Find en opskrift</button></div></div>
    <div className="hero-card help-card"><div className="help-alf"><Alf /></div><div><span className="eyebrow">Når hjernen siger “ved ikke”</span><h2>Hjælp mig!</h2><p>Fortæl mig lidt om dagen – og hvad du allerede har – så finder vi et forslag sammen.</p><button className="ghost" onClick={onHelp}>✨ Lad Alf hjælpe</button></div></div>
    <div className="quick-nav">{navItems.map((item) => <button key={item.key} onClick={() => setPage(item.key)} className={`quick-card quick-${item.key}`}><span className="quick-icon">{item.icon}</span><span><strong>{item.label}</strong><small>{item.hint}</small></span><b>→</b></button>)}</div>
    <div className="section-head"><div><span className="eyebrow">Noget lækkert</span><h2>Ugens favoritter</h2></div><button onClick={() => setPage('recipes')}>Se alle →</button></div>
    <div className="recipe-grid">{recipes.slice(0, 3).map((r) => <RecipeCard recipe={r} key={r.id} />)}</div>
  </section>;
}

function RecipeCard({ recipe }: { recipe: typeof recipes[number] }) {
  return <article className="recipe-card"><div className="recipe-emoji">{recipe.emoji}</div><span>{recipe.tag}</span><h3>{recipe.title}</h3><small>⏱ {recipe.time}</small></article>;
}

function Recipes({ onOpen }: { onOpen: (recipe: typeof recipes[number]) => void }) {
  return <section className="page"><span className="eyebrow">🍲 Madglæde</span><h1>Opskrifter</h1><p className="lead">Tryk på en opskrift for at se ingredienser og lægge den i madplanen.</p><div className="recipe-grid large">{recipes.map((r) => <button className="recipe-card recipe-button" onClick={() => onOpen(r)} key={r.id}><div className="recipe-emoji">{r.emoji}</div><span>{r.tag}</span><h3>{r.title}</h3><small>⏱ {r.time} · Se opskrift →</small></button>)}</div></section>;
}

function RecipeModal({ recipe, onClose, onAdd }: { recipe: typeof recipes[number]; onClose: () => void; onAdd: (recipe: typeof recipes[number], day: string) => void }) {
  const [day, setDay] = useState('Mandag');
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="help-modal recipe-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-title"><button className="modal-close" onClick={onClose} aria-label="Luk">×</button>
    <div className="recipe-emoji big">{recipe.emoji}</div><span className="eyebrow">{recipe.tag}</span><h2 id="recipe-title">{recipe.title}</h2><p>⏱ {recipe.time}</p><h3>Det skal du bruge</h3><div className="ingredient-list">{recipe.ingredients.map((item) => <div key={item}>✓ {ingredientLabels[item] || item}</div>)}</div>
    <label className="day-picker">Læg i madplanen <select value={day} onChange={(e) => setDay(e.target.value)}>{days.map((d) => <option key={d}>{d}</option>)}</select></label>
    <p className="help-hint">Når du lægger retten i madplanen, kommer ingredienserne automatisk på indkøbslisten.</p><button className="primary full" onClick={() => onAdd(recipe, day)}>📅 Læg i {day} + lav indkøbsliste</button>
  </section></div>;
}

function MealPlan({ plan, onPickRecipe }: { plan: Plan; onPickRecipe: () => void }) {
  return <section className="page"><span className="eyebrow">📅 Planlægning</span><h1>Ugens madplan</h1><p className="lead">En enkel plan – og plads til at ændre mening.</p><div className="plan-grid">{days.map((day) => <article className="day" key={day}><span>{day}</span><strong>{plan[day] || 'Ikke planlagt endnu'}</strong><small>🍽 Aftensmad</small></article>)}</div><button className="primary" onClick={onPickRecipe}>＋ Vælg en opskrift til en dag</button></section>;
}

function Shopping({ shopping, toggleShopping }: { shopping: ShoppingItem[]; toggleShopping: (index: number) => void }) {
  return <section className="page narrow"><span className="eyebrow">🛒 På tur i butikken</span><h1>Indkøbsliste</h1><p className="lead">Ingredienser fra din madplan kommer automatisk her. Tryk på en vare, når den er i kurven.</p><div className="shopping">{shopping.map((item, i) => <button key={`${item.name}-${i}`} className={item.done ? 'checked' : ''} onClick={() => toggleShopping(i)}><span>{item.done ? '✓' : '○'}</span>{item.name}</button>)}</div></section>;
}

function HelpMe({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1); const [choices, setChoices] = useState<HelpChoice>({ energy: '', time: '', mood: '', pantry: [] }); const choose = (key: keyof Omit<HelpChoice, 'pantry'>, value: string) => { setChoices((c) => ({ ...c, [key]: value })); setStep((s) => s + 1); }; const togglePantry = (value: string) => setChoices((c) => ({ ...c, pantry: c.pantry.includes(value) ? c.pantry.filter((i) => i !== value) : [...c.pantry, value] })); const recommendation = getRecommendation(choices);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="help-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose}>×</button>{step < 5 ? <><div className="modal-alf"><Alf small /></div><span className="eyebrow">KøkkenAlf spørger</span><div className="progress"><span style={{ width: `${(step / 4) * 100}%` }} /></div>{step === 1 && <HelpStep title="Hvor meget energi har du i dag?" options={helpOptions.energy} onChoose={(v) => choose('energy', v)} />}{step === 2 && <HelpStep title="Hvor meget tid har du lyst til at bruge?" options={helpOptions.time} onChoose={(v) => choose('time', v)} />}{step === 3 && <HelpStep title="Hvad lyder bedst?" options={helpOptions.mood} onChoose={(v) => choose('mood', v)} />}{step === 4 && <PantryStep selected={choices.pantry} onToggle={togglePantry} onContinue={() => setStep(5)} />}</> : <div className="help-result"><div className="result-alf"><Alf /></div><span className="eyebrow">Mit forslag til jer</span><h2>{recommendation.title}</h2><p>{recommendation.text}</p>{recommendation.used.length > 0 && <div className="result-used">✨ Du har allerede: {recommendation.used.join(', ')}</div>}<div className="result-meta"><span>⏱ {recommendation.time}</span><span>{recommendation.tag}</span></div><div className="actions"><button className="primary" onClick={onClose}>Det gør vi!</button><button className="secondary" onClick={() => { setChoices({ energy: '', time: '', mood: '', pantry: [] }); setStep(1); }}>Prøv igen</button></div></div>}</section></div>;
}

function HelpStep({ title, options, onChoose }: { title: string; options: { value: string; label: string; emoji: string }[]; onChoose: (value: string) => void }) { return <div className="help-step"><h2>{title}</h2><div className="help-options">{options.map((o) => <button key={o.value} onClick={() => onChoose(o.value)}><span>{o.emoji}</span><strong>{o.label}</strong></button>)}</div></div>; }
function PantryStep({ selected, onToggle, onContinue }: { selected: string[]; onToggle: (v: string) => void; onContinue: () => void }) { return <div className="help-step"><h2>Hvad har du allerede hjemme?</h2><p className="help-hint">Vælg bare det, du har lyst til at bruge.</p><div className="pantry-grid">{pantryOptions.map((o) => <button key={o.value} className={selected.includes(o.value) ? 'selected' : ''} onClick={() => onToggle(o.value)}><span>{o.emoji}</span><strong>{o.label}</strong>{selected.includes(o.value) && <b>✓</b>}</button>)}</div><button className="primary pantry-continue" onClick={onContinue}>Find mit forslag →</button></div>; }

function getRecommendation({ energy, time, mood, pantry }: HelpChoice) {
  const ranked = recipes.map((recipe) => { const matching = recipe.ingredients.filter((i) => pantry.includes(i)); let score = matching.length * 5; if (recipe.mood === mood) score += 4; if (energy === 'low' && recipe.effort === 'easy') score += 5; if (time === 'quick' && recipe.time === '20 min') score += 5; if (time === 'normal' && ['25 min', '30 min'].includes(recipe.time)) score += 4; if (time === 'slow' && recipe.time === '35 min') score += 5; if (mood === 'fun' && recipe.tag === 'Børnene elsker') score += 5; return { recipe, matching, score }; }).sort((a, b) => b.score - a.score);
  const best = ranked[0]; const usedLabels = best.matching.map((i) => ingredientLabels[i] || i); let reason = 'Jeg har valgt noget, der passer til det, du fortalte mig.'; if (best.matching.length) reason = `Du kan allerede bruge ${usedLabels.join(' og ')} – så er der lidt mindre at handle ind.`; else if (energy === 'low') reason = 'Du sagde, at energien er lav, så jeg har valgt en nem løsning med mindst muligt bøvl.'; else if (time === 'quick') reason = 'Du bad om noget hurtigt, så jeg har holdt mig til en rigtig hurtig hverdagsret.'; else if (mood === 'fun') reason = 'Du havde lyst til noget sjovt, så jeg fandt en ret, der plejer at være et hit hos børnene.';
  return { ...best.recipe, used: usedLabels, text: `${best.recipe.title} passer godt til i dag. ${reason}` };
}
