import React, { useState } from 'react';

const recipes = [
  { id: 1, title: 'Cremet kyllingepasta', time: '25 min', tag: 'Familiefavorit', emoji: '🍝', effort: 'easy', mood: 'cozy', ingredients: ['kylling', 'pasta', 'fløde'] },
  { id: 2, title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟', effort: 'easy', mood: 'fresh', ingredients: ['laks', 'kartofler', 'broccoli'] },
  { id: 3, title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮', effort: 'easy', mood: 'fun', ingredients: ['kylling', 'tortillas', 'majs'] },
  { id: 4, title: 'Spaghetti bolognese', time: '35 min', tag: 'Klassiker', emoji: '🍝', effort: 'medium', mood: 'cozy', ingredients: ['pasta', 'hakket oksekød', 'tomat'] },
];

const initialShopping = ['Kylling', 'Pasta', 'Fløde', 'Broccoli', 'Mælk', 'Bananer'];

const pantryOptions = [
  { value: 'kylling', label: 'Kylling', emoji: '🍗' },
  { value: 'pasta', label: 'Pasta', emoji: '🍝' },
  { value: 'kartofler', label: 'Kartofler', emoji: '🥔' },
  { value: 'broccoli', label: 'Broccoli', emoji: '🥦' },
  { value: 'fløde', label: 'Fløde', emoji: '🥛' },
  { value: 'laks', label: 'Laks', emoji: '🐟' },
  { value: 'tortillas', label: 'Tortillas', emoji: '🌯' },
  { value: 'tomat', label: 'Tomat', emoji: '🍅' },
];

const helpOptions = {
  energy: [
    { value: 'low', label: 'Jeg har ikke meget energi', emoji: '🫶' },
    { value: 'okay', label: 'Jeg har lidt overskud', emoji: '🙂' },
    { value: 'good', label: 'Jeg har fint overskud', emoji: '✨' },
  ],
  time: [
    { value: 'quick', label: 'Helst under 20 min', emoji: '⚡' },
    { value: 'normal', label: '20–35 min er fint', emoji: '⏱️' },
    { value: 'slow', label: 'Jeg vil gerne hygge mig med det', emoji: '🍳' },
  ],
  mood: [
    { value: 'cozy', label: 'Noget trygt og hyggeligt', emoji: '🥰' },
    { value: 'fresh', label: 'Noget let og friskt', emoji: '🌿' },
    { value: 'fun', label: 'Noget sjovt for børnene', emoji: '🎉' },
  ],
};

type HelpChoice = { energy: string; time: string; mood: string; pantry: string[] };

type NavItem = { key: string; icon: string; label: string; hint: string };
const navItems: NavItem[] = [
  { key: 'plan', icon: '📅', label: 'Madplan', hint: 'Hvad skal vi spise?' },
  { key: 'recipes', icon: '🍲', label: 'Opskrifter', hint: 'Find noget lækkert' },
  { key: 'shopping', icon: '🛒', label: 'Indkøb', hint: 'Det mangler vi' },
];

function Alf({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? 'alf-svg small' : 'alf-svg'} viewBox="0 0 120 140" aria-label="KøkkenAlf">
      <path d="M27 38 Q21 22 34 18 Q45 22 51 34" fill="#D98A5B" />
      <path d="M93 38 Q99 22 86 18 Q75 22 69 34" fill="#D98A5B" />
      <path d="M30 46 Q31 24 60 22 Q89 24 90 46 L86 78 Q81 103 60 108 Q39 103 34 78Z" fill="#F2C59E" />
      <path d="M35 47 Q39 20 60 16 Q81 20 85 47 Q72 39 60 41 Q48 39 35 47Z" fill="#E9B85F" />
      <path d="M44 57 Q48 53 52 57 M68 57 Q72 53 76 57" stroke="#33352F" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="62" r="3" fill="#33352F" /><circle cx="70" cy="62" r="3" fill="#33352F" />
      <path d="M53 76 Q60 82 67 76" stroke="#9A5B45" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="68" r="5" fill="#E6A77D" />
      <path d="M28 109 Q38 95 60 98 Q82 95 92 109 L101 132 L19 132Z" fill="#6D8C63" />
      <path d="M44 103 L50 128 M76 103 L70 128" stroke="#F5E5C8" strokeWidth="5" strokeLinecap="round" />
      <path d="M52 103 Q60 109 68 103 L66 129 L54 129Z" fill="#F4E2BF" />
      <path d="M48 119 L60 112 L72 119" stroke="#D18A51" strokeWidth="4" fill="none" />
      <circle cx="60" cy="116" r="3" fill="#D18A51" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [shopping, setShopping] = useState(initialShopping.map((name) => ({ name, done: false })));
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleShopping = (index: number) => {
    setShopping((items) => items.map((item, i) => i === index ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')} aria-label="Gå til forsiden">
          <Alf small />
          <span><strong>KøkkenAlf</strong><small>Din lille hjælper i køkkenet</small></span>
        </button>
        <nav className="topnav">
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Hjem</button>
          {navItems.map((item) => <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => setPage(item.key)}><span>{item.icon}</span>{item.label}</button>)}
        </nav>
      </header>

      <main>
        {page === 'home' && <Home setPage={setPage} onHelp={() => setHelpOpen(true)} />}
        {page === 'plan' && <MealPlan />}
        {page === 'recipes' && <Recipes />}
        {page === 'shopping' && <Shopping shopping={shopping} toggleShopping={toggleShopping} />}
      </main>

      <footer>♡ KøkkenAlf · mindre stress, mere madglæde</footer>
      {helpOpen && <HelpMe onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

function Home({ setPage, onHelp }: { setPage: (page: string) => void; onHelp: () => void }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hello-row"><div className="alf-bubble"><Alf /></div><div><span className="eyebrow">Hej fra køkkenet 👋</span><p className="alf-says">“Jeg hjælper dig med at finde på noget nemt.”</p></div></div>
        <h1>Hvad skal vi finde på i køkkenet?</h1>
        <p>KøkkenAlf hjælper dig med at gøre hverdagsmaden lidt lettere. Ingen løftede pegefingre – bare små idéer, der passer til jeres familie.</p>
        <div className="actions"><button className="primary" onClick={() => setPage('plan')}>📅 Se ugens madplan</button><button className="secondary" onClick={() => setPage('recipes')}>🍲 Find en opskrift</button></div>
      </div>

      <div className="hero-card help-card">
        <div className="help-alf"><Alf /></div>
        <div><span className="eyebrow">Når hjernen siger “ved ikke”</span><h2>Hjælp mig!</h2><p>Fortæl mig lidt om dagen – og hvad du allerede har – så finder vi et forslag sammen.</p><button className="ghost" onClick={onHelp}>✨ Lad Alf hjælpe</button></div>
      </div>

      <div className="quick-nav">
        {navItems.map((item) => <button key={item.key} onClick={() => setPage(item.key)} className={`quick-card quick-${item.key}`}><span className="quick-icon">{item.icon}</span><span><strong>{item.label}</strong><small>{item.hint}</small></span><b>→</b></button>)}
      </div>

      <div className="section-head"><div><span className="eyebrow">Noget lækkert</span><h2>Ugens favoritter</h2></div><button onClick={() => setPage('recipes')}>Se alle →</button></div>
      <div className="recipe-grid">{recipes.slice(0, 3).map((r) => <RecipeCard recipe={r} key={r.id} />)}</div>
    </section>
  );
}

function RecipeCard({ recipe }: { recipe: typeof recipes[number] }) {
  return <article className="recipe-card"><div className="recipe-emoji">{recipe.emoji}</div><span>{recipe.tag}</span><h3>{recipe.title}</h3><small>⏱ {recipe.time}</small></article>;
}

function MealPlan() {
  const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
  const meals = ['Cremet kyllingepasta', 'Rugbrød + rester', 'Laks med kartofler', 'Tacos med kylling', 'Pizza', 'Burger', 'Familiefavorit'];
  return <section className="page"><span className="eyebrow">📅 Planlægning</span><h1>Ugens madplan</h1><p className="lead">En enkel plan – og plads til at ændre mening.</p><div className="plan-grid">{days.map((day, i) => <article className="day" key={day}><span>{day}</span><strong>{meals[i]}</strong><small>🍽 Aftensmad</small></article>)}</div></section>;
}

function Recipes() {
  return <section className="page"><span className="eyebrow">🍲 Madglæde</span><h1>Opskrifter</h1><p className="lead">Nem hverdagsmad, som hele familien kan være med på.</p><div className="recipe-grid large">{recipes.map((r) => <RecipeCard recipe={r} key={r.id} />)}</div></section>;
}

function Shopping({ shopping, toggleShopping }: { shopping: { name: string; done: boolean }[]; toggleShopping: (index: number) => void }) {
  return <section className="page narrow"><span className="eyebrow">🛒 På tur i butikken</span><h1>Indkøbsliste</h1><p className="lead">Tryk på en vare, når den er i kurven.</p><div className="shopping">{shopping.map((item, i) => <button key={item.name} className={item.done ? 'checked' : ''} onClick={() => toggleShopping(i)}><span>{item.done ? '✓' : '○'}</span>{item.name}</button>)}</div><button className="secondary full" onClick={() => alert('Her kan vi senere tilføje varer ✨')}>＋ Tilføj vare</button></section>;
}

function HelpMe({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<HelpChoice>({ energy: '', time: '', mood: '', pantry: [] });
  const choose = (key: keyof Omit<HelpChoice, 'pantry'>, value: string) => { setChoices((current) => ({ ...current, [key]: value })); setStep((current) => current + 1); };
  const togglePantry = (value: string) => setChoices((current) => ({ ...current, pantry: current.pantry.includes(value) ? current.pantry.filter((item) => item !== value) : [...current.pantry, value] }));
  const recommendation = getRecommendation(choices);

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title"><button className="modal-close" onClick={onClose} aria-label="Luk">×</button>{step < 5 ? <><div className="modal-alf"><Alf small /></div><span className="eyebrow">KøkkenAlf spørger</span><div className="progress"><span style={{ width: `${(step / 4) * 100}%` }} /></div>{step === 1 && <HelpStep title="Hvor meget energi har du i dag?" options={helpOptions.energy} onChoose={(value) => choose('energy', value)} />}{step === 2 && <HelpStep title="Hvor meget tid har du lyst til at bruge?" options={helpOptions.time} onChoose={(value) => choose('time', value)} />}{step === 3 && <HelpStep title="Hvad lyder bedst?" options={helpOptions.mood} onChoose={(value) => choose('mood', value)} />}{step === 4 && <PantryStep selected={choices.pantry} onToggle={togglePantry} onContinue={() => setStep(5)} />}</> : <div className="help-result"><div className="result-alf"><Alf /></div><span className="eyebrow">Mit forslag til jer</span><h2 id="help-title">{recommendation.title}</h2><p>{recommendation.text}</p>{recommendation.used.length > 0 && <div className="result-used">✨ Du har allerede: {recommendation.used.join(', ')}</div>}<div className="result-meta"><span>⏱ {recommendation.time}</span><span>{recommendation.tag}</span></div><div className="actions"><button className="primary" onClick={onClose}>Det gør vi!</button><button className="secondary" onClick={() => { setChoices({ energy: '', time: '', mood: '', pantry: [] }); setStep(1); }}>Prøv igen</button></div></div>}</section></div>;
}

function HelpStep({ title, options, onChoose }: { title: string; options: { value: string; label: string; emoji: string }[]; onChoose: (value: string) => void }) {
  return <div className="help-step"><h2 id="help-title">{title}</h2><div className="help-options">{options.map((option) => <button key={option.value} onClick={() => onChoose(option.value)}><span>{option.emoji}</span><strong>{option.label}</strong></button>)}</div></div>;
}

function PantryStep({ selected, onToggle, onContinue }: { selected: string[]; onToggle: (value: string) => void; onContinue: () => void }) {
  return <div className="help-step"><h2 id="help-title">Hvad har du allerede hjemme?</h2><p className="help-hint">Vælg bare det, du har lyst til at bruge. Du behøver ikke vælge noget.</p><div className="pantry-grid">{pantryOptions.map((option) => <button key={option.value} className={selected.includes(option.value) ? 'selected' : ''} onClick={() => onToggle(option.value)} aria-pressed={selected.includes(option.value)}><span>{option.emoji}</span><strong>{option.label}</strong>{selected.includes(option.value) && <b>✓</b>}</button>)}</div><button className="primary pantry-continue" onClick={onContinue}>Find mit forslag →</button></div>;
}

function getRecommendation({ energy, time, mood, pantry }: HelpChoice) {
  const ranked = recipes.map((recipe) => { const matching = recipe.ingredients.filter((ingredient) => pantry.includes(ingredient)); let score = matching.length * 3; if (recipe.mood === mood) score += 3; if (time === 'quick' && recipe.time === '20 min') score += 3; if (time === 'normal' && recipe.time !== '20 min') score += 2; if (time === 'slow' && recipe.time === '35 min') score += 3; if (energy === 'low' && recipe.effort === 'easy') score += 2; return { recipe, matching, score }; }).sort((a, b) => b.score - a.score);
  const best = ranked[0]; const usedLabels = best.matching.map((item) => pantryOptions.find((option) => option.value === item)?.label || item); let text = `${best.recipe.title} passer godt til i dag. `; if (best.matching.length > 0) text += `Og du kan allerede bruge ${usedLabels.join(' og ')} fra det, du har hjemme.`; else text += 'KøkkenAlf har valgt en enkel løsning, så du ikke skal tænke for meget over aftensmaden.'; return { ...best.recipe, text, used: usedLabels };
}
