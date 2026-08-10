import React, { useState } from 'react';

const recipes = [
  { id: 1, title: 'Cremet kyllingepasta', time: '25 min', tag: 'Familiefavorit', emoji: '🍝', effort: 'easy', mood: 'cozy' },
  { id: 2, title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟', effort: 'easy', mood: 'fresh' },
  { id: 3, title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮', effort: 'easy', mood: 'fun' },
  { id: 4, title: 'Spaghetti bolognese', time: '35 min', tag: 'Klassiker', emoji: '🍝', effort: 'medium', mood: 'cozy' },
];

const initialShopping = ['Kylling', 'Pasta', 'Fløde', 'Broccoli', 'Mælk', 'Bananer'];

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

type HelpChoice = { energy: string; time: string; mood: string };

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
          <span className="alf">🧙‍♂️</span>
          <span><strong>KøkkenAlf</strong><small>Din lille hjælper i køkkenet</small></span>
        </button>
        <nav>
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Forside</button>
          <button className={page === 'plan' ? 'active' : ''} onClick={() => setPage('plan')}>Madplan</button>
          <button className={page === 'recipes' ? 'active' : ''} onClick={() => setPage('recipes')}>Opskrifter</button>
          <button className={page === 'shopping' ? 'active' : ''} onClick={() => setPage('shopping')}>Indkøbsliste</button>
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
        <span className="eyebrow">Hej 👋</span>
        <h1>Hvad skal vi finde på i køkkenet?</h1>
        <p>KøkkenAlf hjælper dig med at gøre hverdagsmaden lidt lettere. Ingen løftede pegefingre – bare små idéer, der passer til jeres familie.</p>
        <div className="actions">
          <button className="primary" onClick={() => setPage('plan')}>📅 Se ugens madplan</button>
          <button className="secondary" onClick={() => setPage('recipes')}>🍲 Find en opskrift</button>
        </div>
      </div>
      <div className="hero-card">
        <div className="card-icon">✨</div>
        <h2>Hjælp mig!</h2>
        <p>Ved du ikke, hvad I skal spise? Fortæl KøkkenAlf lidt om dagen, så finder vi et forslag.</p>
        <button className="ghost" onClick={onHelp}>Lad os prøve</button>
      </div>

      <div className="section-head"><div><span className="eyebrow">Lige nu</span><h2>Ugens favoritter</h2></div><button onClick={() => setPage('recipes')}>Se alle →</button></div>
      <div className="recipe-grid">
        {recipes.slice(0, 3).map((r) => <RecipeCard recipe={r} key={r.id} />)}
      </div>
    </section>
  );
}

function RecipeCard({ recipe }: { recipe: typeof recipes[number] }) {
  return <article className="recipe-card"><div className="recipe-emoji">{recipe.emoji}</div><span>{recipe.tag}</span><h3>{recipe.title}</h3><small>⏱ {recipe.time}</small></article>;
}

function MealPlan() {
  const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
  const meals = ['Cremet kyllingepasta', 'Rugbrød + rester', 'Laks med kartofler', 'Tacos med kylling', 'Pizza', 'Burger', 'Familiefavorit'];
  return <section className="page"><span className="eyebrow">Planlægning</span><h1>Ugens madplan</h1><p className="lead">En enkel plan – og plads til at ændre mening.</p><div className="plan-grid">{days.map((day, i) => <article className="day" key={day}><span>{day}</span><strong>{meals[i]}</strong><small>🍽 Aftensmad</small></article>)}</div></section>;
}

function Recipes() {
  return <section className="page"><span className="eyebrow">Madglæde</span><h1>Opskrifter</h1><p className="lead">Nem hverdagsmad, som hele familien kan være med på.</p><div className="recipe-grid large">{recipes.map((r) => <RecipeCard recipe={r} key={r.id} />)}</div></section>;
}

function Shopping({ shopping, toggleShopping }: { shopping: { name: string; done: boolean }[]; toggleShopping: (index: number) => void }) {
  return <section className="page narrow"><span className="eyebrow">På tur i butikken</span><h1>Indkøbsliste</h1><p className="lead">Tryk på en vare, når den er i kurven.</p><div className="shopping">{shopping.map((item, i) => <button key={item.name} className={item.done ? 'checked' : ''} onClick={() => toggleShopping(i)}><span>{item.done ? '✓' : '○'}</span>{item.name}</button>)}</div><button className="secondary full" onClick={() => alert('Her kan vi senere tilføje varer ✨')}>＋ Tilføj vare</button></section>;
}

function HelpMe({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<HelpChoice>({ energy: '', time: '', mood: '' });

  const choose = (key: keyof HelpChoice, value: string) => {
    setChoices((current) => ({ ...current, [key]: value }));
    setStep((current) => current + 1);
  };

  const recommendation = getRecommendation(choices);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <button className="modal-close" onClick={onClose} aria-label="Luk">×</button>
        {step < 4 ? (
          <>
            <span className="eyebrow">KøkkenAlf spørger</span>
            <div className="progress"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
            {step === 1 && <HelpStep title="Hvor meget energi har du i dag?" options={helpOptions.energy} onChoose={(value) => choose('energy', value)} />}
            {step === 2 && <HelpStep title="Hvor meget tid har du lyst til at bruge?" options={helpOptions.time} onChoose={(value) => choose('time', value)} />}
            {step === 3 && <HelpStep title="Hvad lyder bedst?" options={helpOptions.mood} onChoose={(value) => choose('mood', value)} />}
          </>
        ) : (
          <div className="help-result">
            <span className="result-emoji">{recommendation.emoji}</span>
            <span className="eyebrow">Mit forslag til jer</span>
            <h2 id="help-title">{recommendation.title}</h2>
            <p>{recommendation.text}</p>
            <div className="result-meta"><span>⏱ {recommendation.time}</span><span>{recommendation.tag}</span></div>
            <div className="actions">
              <button className="primary" onClick={onClose}>Det gør vi!</button>
              <button className="secondary" onClick={() => { setChoices({ energy: '', time: '', mood: '' }); setStep(1); }}>Prøv igen</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function HelpStep({ title, options, onChoose }: { title: string; options: { value: string; label: string; emoji: string }[]; onChoose: (value: string) => void }) {
  return <div className="help-step"><h2 id="help-title">{title}</h2><div className="help-options">{options.map((option) => <button key={option.value} onClick={() => onChoose(option.value)}><span>{option.emoji}</span><strong>{option.label}</strong></button>)}</div></div>;
}

function getRecommendation({ energy, time, mood }: HelpChoice) {
  if (energy === 'low' || time === 'quick') {
    if (mood === 'fun') return { title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮', text: 'Lad os holde det nemt og hyggeligt. Tacos kan sættes på bordet, så alle selv vælger fyld.' };
    return { title: 'Cremet kyllingepasta', time: '25 min', tag: 'Familiefavorit', emoji: '🍝', text: 'En tryg hverdagsret med få trin. KøkkenAlf synes, I skal gøre det så nemt for jer selv som muligt.' };
  }
  if (mood === 'fresh') return { title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟', text: 'Noget let og friskt, uden at det bliver besværligt. Perfekt til en dag med lidt mere overskud.' };
  if (mood === 'fun') return { title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮', text: 'Lidt farver, lidt snask og masser af valgfrihed. En god ret, når maden gerne må være lidt sjov.' };
  if (time === 'slow' || energy === 'good') return { title: 'Spaghetti bolognese', time: '35 min', tag: 'Klassiker', emoji: '🍝', text: 'I dag må maden gerne tage lidt tid. Lav en stor portion og gem gerne lidt til en anden dag.' };
  return { title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟', text: 'En enkel og rolig løsning til aftensmaden. Ikke for meget planlægning – bare mad på bordet.' };
}
