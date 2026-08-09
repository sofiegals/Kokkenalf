import React, { useState } from 'react';

const recipes = [
  { id: 1, title: 'Cremet kyllingepasta', time: '25 min', tag: 'Familiefavorit', emoji: '🍝' },
  { id: 2, title: 'Laks med kartofler', time: '30 min', tag: 'Nem', emoji: '🐟' },
  { id: 3, title: 'Tacos med kylling', time: '20 min', tag: 'Børnene elsker', emoji: '🌮' },
];

const initialShopping = ['Kylling', 'Pasta', 'Fløde', 'Broccoli', 'Mælk', 'Bananer'];

export default function App() {
  const [page, setPage] = useState('home');
  const [shopping, setShopping] = useState(initialShopping.map((name) => ({ name, done: false })));

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
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'plan' && <MealPlan />}
        {page === 'recipes' && <Recipes />}
        {page === 'shopping' && <Shopping shopping={shopping} toggleShopping={toggleShopping} />}
      </main>

      <footer>♡ KøkkenAlf · mindre stress, mere madglæde</footer>
    </div>
  );
}

function Home({ setPage }: { setPage: (page: string) => void }) {
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
        <button className="ghost" onClick={() => alert('Hjælp mig kommer i næste version ✨')}>Lad os prøve</button>
      </div>

      <div className="section-head"><div><span className="eyebrow">Lige nu</span><h2>Ugens favoritter</h2></div><button onClick={() => setPage('recipes')}>Se alle →</button></div>
      <div className="recipe-grid">
        {recipes.map((r) => <article className="recipe-card" key={r.id}><div className="recipe-emoji">{r.emoji}</div><span>{r.tag}</span><h3>{r.title}</h3><small>⏱ {r.time}</small></article>)}
      </div>
    </section>
  );
}

function MealPlan() {
  const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
  const meals = ['Cremet kyllingepasta', 'Rugbrød + rester', 'Laks med kartofler', 'Tacos med kylling', 'Pizza', 'Burger', 'Familiefavorit'];
  return <section className="page"><span className="eyebrow">Planlægning</span><h1>Ugens madplan</h1><p className="lead">En enkel plan – og plads til at ændre mening.</p><div className="plan-grid">{days.map((day, i) => <article className="day" key={day}><span>{day}</span><strong>{meals[i]}</strong><small>🍽 Aftensmad</small></article>)}</div></section>;
}

function Recipes() {
  return <section className="page"><span className="eyebrow">Madglæde</span><h1>Opskrifter</h1><p className="lead">Nem hverdagsmad, som hele familien kan være med på.</p><div className="recipe-grid large">{recipes.concat([{ id: 4, title: 'Spaghetti bolognese', time: '35 min', tag: 'Klassiker', emoji: '🍝' }]).map((r) => <article className="recipe-card" key={r.id}><div className="recipe-emoji">{r.emoji}</div><span>{r.tag}</span><h3>{r.title}</h3><small>⏱ {r.time}</small></article>)}</div></section>;
}

function Shopping({ shopping, toggleShopping }: { shopping: { name: string; done: boolean }[]; toggleShopping: (index: number) => void }) {
  return <section className="page narrow"><span className="eyebrow">På tur i butikken</span><h1>Indkøbsliste</h1><p className="lead">Tryk på en vare, når den er i kurven.</p><div className="shopping">{shopping.map((item, i) => <button key={item.name} className={item.done ? 'checked' : ''} onClick={() => toggleShopping(i)}><span>{item.done ? '✓' : '○'}</span>{item.name}</button>)}</div><button className="secondary full" onClick={() => alert('Her kan vi senere tilføje varer ✨')}>＋ Tilføj vare</button></section>;
}
