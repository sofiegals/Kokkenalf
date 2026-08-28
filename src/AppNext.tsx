import React, { useMemo, useState } from 'react';

type Category = 'Mejeri' | 'Grønt' | 'Protein' | 'Kolonial' | 'Brød & morgenmad' | 'Andet';
type Ingredient = { id: string; name: string; emoji: string; category: Category };
type Recipe = { id: number; title: string; time: number; tag: string; emoji: string; ingredients: string[]; steps: string[] };
type ShoppingItem = { name: string; emoji: string; category: Category; done: boolean };

const ingredients: Ingredient[] = [
  { id:'mælk', name:'Mælk', emoji:'🥛', category:'Mejeri' }, { id:'fløde', name:'Fløde', emoji:'🥛', category:'Mejeri' }, { id:'mozzarella', name:'Mozzarella', emoji:'🧀', category:'Mejeri' }, { id:'revet ost', name:'Revet ost', emoji:'🧀', category:'Mejeri' }, { id:'creme fraiche', name:'Creme fraiche', emoji:'🥣', category:'Mejeri' },
  { id:'tomat', name:'Tomat', emoji:'🍅', category:'Grønt' }, { id:'broccoli', name:'Broccoli', emoji:'🥦', category:'Grønt' }, { id:'gulerod', name:'Gulerod', emoji:'🥕', category:'Grønt' }, { id:'peberfrugt', name:'Peberfrugt', emoji:'🫑', category:'Grønt' }, { id:'løg', name:'Løg', emoji:'🧅', category:'Grønt' }, { id:'hvidløg', name:'Hvidløg', emoji:'🧄', category:'Grønt' }, { id:'kartofler', name:'Kartofler', emoji:'🥔', category:'Grønt' }, { id:'spinat', name:'Spinat', emoji:'🥬', category:'Grønt' }, { id:'majs', name:'Majs', emoji:'🌽', category:'Grønt' },
  { id:'kylling', name:'Kylling', emoji:'🍗', category:'Protein' }, { id:'hakket oksekød', name:'Hakket oksekød', emoji:'🥩', category:'Protein' }, { id:'laks', name:'Laks', emoji:'🐟', category:'Protein' }, { id:'æg', name:'Æg', emoji:'🥚', category:'Protein' }, { id:'kikærter', name:'Kikærter', emoji:'🫘', category:'Protein' }, { id:'halloumi', name:'Halloumi', emoji:'🧀', category:'Protein' },
  { id:'pasta', name:'Pasta', emoji:'🍝', category:'Kolonial' }, { id:'ris', name:'Ris', emoji:'🍚', category:'Kolonial' }, { id:'hakket tomat', name:'Hakket tomat', emoji:'🥫', category:'Kolonial' }, { id:'pesto', name:'Pesto', emoji:'🌿', category:'Kolonial' }, { id:'tortillas', name:'Tortillas', emoji:'🌯', category:'Kolonial' }, { id:'kokosmælk', name:'Kokosmælk', emoji:'🥥', category:'Kolonial' }, { id:'rød karry', name:'Rød karry', emoji:'🌶️', category:'Kolonial' },
  { id:'rugbrød', name:'Rugbrød', emoji:'🍞', category:'Brød & morgenmad' }, { id:'havregryn', name:'Havregryn', emoji:'🥣', category:'Brød & morgenmad' },
  { id:'citron', name:'Citron', emoji:'🍋', category:'Andet' }, { id:'olivenolie', name:'Olivenolie', emoji:'🫒', category:'Andet' }, { id:'sojasauce', name:'Sojasauce', emoji:'🥢', category:'Andet' },
];

const recipes: Recipe[] = [
  { id:1, title:'Cremet kyllingepasta', time:25, tag:'Familiefavorit', emoji:'🍝', ingredients:['kylling','pasta','fløde','løg','revet ost'], steps:['Kog pastaen efter pakken.','Steg kylling og løg på en pande.','Tilsæt fløde og revet ost, og lad saucen samle sig.','Vend pastaen i saucen og servér.'] },
  { id:2, title:'Laks med kartofler', time:30, tag:'Nem', emoji:'🐟', ingredients:['laks','kartofler','broccoli','citron'], steps:['Kog kartoflerne møre.','Bag laksen i ovnen med citron.','Damp broccoli kort.','Servér det hele sammen.'] },
  { id:3, title:'Tacos med kylling', time:20, tag:'Børnene elsker', emoji:'🌮', ingredients:['kylling','tortillas','majs','tomat','revet ost'], steps:['Steg kylling i små stykker.','Varm tortillas.','Skær tomat og gør majs klar.','Lad alle samle deres egne tacos.'] },
  { id:4, title:'Spaghetti bolognese', time:35, tag:'Klassiker', emoji:'🍝', ingredients:['hakket oksekød','pasta','hakket tomat','løg','gulerod'], steps:['Steg kød, løg og revet gulerod.','Tilsæt hakket tomat.','Lad saucen simre.','Kog pasta og servér.'] },
  { id:5, title:'Pesto-pasta med mozzarella', time:15, tag:'Supernem', emoji:'🌿', ingredients:['pasta','pesto','mozzarella','tomat','spinat'], steps:['Kog pastaen.','Vend med pesto.','Tilsæt tomat, spinat og mozzarella.','Servér med lidt olivenolie.'] },
  { id:6, title:'Kylling i rød karry', time:25, tag:'Lidt anderledes', emoji:'🍛', ingredients:['kylling','ris','kokosmælk','rød karry','peberfrugt'], steps:['Kog risene.','Steg kylling og peberfrugt.','Tilsæt karry og kokosmælk.','Lad retten simre og servér med ris.'] },
  { id:7, title:'Halloumi-bowl', time:20, tag:'Grøn favorit', emoji:'🥗', ingredients:['halloumi','ris','broccoli','majs','tomat'], steps:['Kog ris.','Steg halloumi gylden.','Damp broccoli.','Saml bowl med grønt og majs.'] },
  { id:8, title:'Tomatpasta med spinat', time:20, tag:'Billig & nem', emoji:'🍅', ingredients:['pasta','hakket tomat','spinat','løg','hvidløg'], steps:['Kog pasta.','Steg løg og hvidløg.','Tilsæt tomat og spinat.','Vend pastaen i saucen.'] },
  { id:9, title:'Tortilla-pizza', time:15, tag:'Børnevenlig', emoji:'🍕', ingredients:['tortillas','hakket tomat','mozzarella','peberfrugt','majs'], steps:['Læg tortillas på en bageplade.','Smør med tomat.','Fordel ost og grønt.','Bag til osten er gylden.'] },
  { id:10, title:'Æggekage med grønt', time:20, tag:'Hurtig', emoji:'🍳', ingredients:['æg','mælk','kartofler','spinat','tomat'], steps:['Pisk æg og mælk.','Steg kartofler og grønt.','Hæld æggemassen over.','Lad den sætte sig og servér.'] },
  { id:11, title:'Kikærte-curry', time:25, tag:'Uden kød', emoji:'🥥', ingredients:['kikærter','ris','kokosmælk','rød karry','spinat'], steps:['Kog ris.','Varm karry og kokosmælk.','Tilsæt kikærter og spinat.','Lad det simre og servér med ris.'] },
  { id:12, title:'Laks med pesto og kartofler', time:25, tag:'Nem hverdagsmad', emoji:'🐟', ingredients:['laks','kartofler','pesto','broccoli','citron'], steps:['Kog kartofler.','Bag laks med pesto og citron.','Damp broccoli.','Servér sammen.'] },
];

const byId = Object.fromEntries(ingredients.map(i => [i.id, i]));
const categories: Category[] = ['Mejeri','Grønt','Protein','Kolonial','Brød & morgenmad','Andet'];
const days = ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'];
const defaultPlan: Record<string,string|null> = { Mandag:'Cremet kyllingepasta', Tirsdag:'Rugbrød + rester', Onsdag:'Laks med kartofler', Torsdag:'Tacos med kylling', Fredag:'Pizza', Lørdag:'Burger', Søndag:'Familiefavorit' };

function Alf() { return <div className="alf-mark">👩‍🍳</div>; }
function Button({ children, onClick, kind='primary' }: { children:React.ReactNode; onClick?:()=>void; kind?:'primary'|'secondary'|'soft' }) { return <button className={`ka-btn ${kind}`} onClick={onClick}>{children}</button>; }

export default function AppNext() {
  const [page,setPage] = useState('home');
  const [plan,setPlan] = useState(defaultPlan);
  const [shopping,setShopping] = useState<ShoppingItem[]>([
    ['mælk','Mejeri'],['kylling','Protein'],['pasta','Kolonial'],['broccoli','Grønt'],['bananer','Andet']
  ].map(([id,category]) => ({ name:id==='bananer'?'Bananer':byId[id]?.name || id, emoji:byId[id]?.emoji || '🍌', category:category as Category, done:false })));
  const [recipe,setRecipe] = useState<Recipe|null>(null);
  const [selectedCategory,setSelectedCategory] = useState<Category|null>(null);
  const [selectedIngredient,setSelectedIngredient] = useState<string|null>(null);
  const [manual,setManual] = useState('');

  const filteredRecipes = useMemo(() => recipes.filter(r => !selectedIngredient || r.ingredients.includes(selectedIngredient)), [selectedIngredient]);
  const addRecipe = (r:Recipe, day:string) => {
    setPlan(p=>({...p,[day]:r.title}));
    setShopping(items => { const names=new Set(items.map(i=>i.name.toLowerCase())); const extra=r.ingredients.filter(id=>!names.has(byId[id].name.toLowerCase())).map(id=>({name:byId[id].name,emoji:byId[id].emoji,category:byId[id].category,done:false})); return [...items,...extra]; });
    setRecipe(null); setPage('plan');
  };
  const toggleItem=(index:number)=>setShopping(items=>items.map((x,i)=>i===index?{...x,done:!x.done}:x));
  const addManual=()=>{ const value=manual.trim(); if(!value)return; setShopping(s=>[...s,{name:value,emoji:'🛒',category:'Andet',done:false}]); setManual(''); };

  return <div className="ka-app">
    <header className="ka-header"><button className="ka-brand" onClick={()=>setPage('home')}><Alf/><span><b>KøkkenAlf</b><small>Din lille hjælper i køkkenet</small></span></button><nav>{[['home','Hjem'],['plan','📅 Madplan'],['recipes','🍲 Opskrifter'],['shopping','🛒 Indkøb']].map(([key,label])=><button key={key} className={page===key?'active':''} onClick={()=>setPage(key)}>{label}</button>)}</nav></header>
    <main>
      {page==='home' && <Home go={setPage} openRecipe={setRecipe}/>} 
      {page==='recipes' && <Recipes recipes={filteredRecipes} category={selectedCategory} setCategory={setSelectedCategory} ingredient={selectedIngredient} setIngredient={setSelectedIngredient} open={setRecipe}/>} 
      {page==='plan' && <MealPlan plan={plan} openRecipes={()=>setPage('recipes')} openRecipe={setRecipe} recipes={recipes}/>} 
      {page==='shopping' && <Shopping shopping={shopping} toggle={toggleItem} manual={manual} setManual={setManual} addManual={addManual}/>} 
    </main>
    <footer>♡ KøkkenAlf · mindre stress, mere madglæde</footer>
    {recipe && <RecipeModal recipe={recipe} close={()=>setRecipe(null)} add={addRecipe}/>} 
  </div>;
}

function Home({go,openRecipe}:{go:(p:string)=>void;openRecipe:(r:Recipe)=>void}) { return <section className="ka-home"><div className="ka-hero"><div><span className="ka-eyebrow">🍴 Hverdagsmad uden hovedpine</span><h1>Hvad skal vi finde på i køkkenet?</h1><p>KøkkenAlf hjælper med opskrifter, madplan og indkøb – samlet ét sted.</p><div className="ka-actions"><Button onClick={()=>go('plan')}>📅 Se madplan</Button><Button kind="secondary" onClick={()=>go('recipes')}>🍲 Find opskrift</Button></div></div><div className="ka-hero-card"><div className="ka-alf-big">👩‍🍳</div><b>Flere muligheder på vej! ✨</b><p>Vælg råvarer efter kategori og find retter, der passer til det, du allerede har.</p><Button kind="soft" onClick={()=>go('recipes')}>Se ingredienser →</Button></div></div><div className="ka-section-title"><span><i>⭐</i> Ugens favoritter</span><button onClick={()=>go('recipes')}>Se alle →</button></div><div className="ka-grid">{recipes.slice(0,4).map(r=><button className="ka-recipe-card" key={r.id} onClick={()=>openRecipe(r)}><div className="ka-recipe-img">{r.emoji}</div><small>{r.tag}</small><h3>{r.title}</h3><span>⏱ {r.time} min</span></button>)}</div></section>; }

function Recipes({recipes:rs,category,setCategory,ingredient,setIngredient,open}:{recipes:Recipe[];category:Category|null;setCategory:(c:Category|null)=>void;ingredient:string|null;setIngredient:(s:string|null)=>void;open:(r:Recipe)=>void}) { const catIngredients=ingredients.filter(i=>!category||i.category===category); return <section className="ka-page"><span className="ka-eyebrow">🍲 Madglæde</span><h1>Opskrifter</h1><p className="ka-lead">Nu med mange flere råvarer – vælg en kategori og find retter ud fra det, du har hjemme.</p><div className="ka-categories">{categories.map(c=><button className={category===c?'chosen':''} key={c} onClick={()=>{setCategory(category===c?null:c);setIngredient(null)}}>{c}</button>)}</div>{category&&<div className="ka-ingredients"><div className="ka-subhead"><b>{category}</b><button onClick={()=>setIngredient(null)}>Alle</button></div><div className="ka-ing-grid">{catIngredients.map(i=><button className={ingredient===i.id?'chosen':''} key={i.id} onClick={()=>setIngredient(ingredient===i.id?null:i.id)}><span>{i.emoji}</span>{i.name}</button>)}</div></div>}<div className="ka-results-head"><b>{ingredient?`Opskrifter med ${byId[ingredient].name}`:'Alle opskrifter'}</b><span>{rs.length} forslag</span></div><div className="ka-grid">{rs.map(r=><button className="ka-recipe-card" key={r.id} onClick={()=>open(r)}><div className="ka-recipe-img">{r.emoji}</div><small>{r.tag}</small><h3>{r.title}</h3><span>⏱ {r.time} min · Se opskrift →</span></button>)}</div>{rs.length===0&&<div className="ka-empty">Der er ikke et forslag endnu – prøv en anden råvare 💛</div>}</section>; }

function RecipeModal({recipe,close,add}:{recipe:Recipe;close:()=>void;add:(r:Recipe,d:string)=>void}) { const [day,setDay]=useState('Mandag'); return <div className="ka-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><section className="ka-modal"><button className="ka-close" onClick={close}>×</button><div className="ka-modal-emoji">{recipe.emoji}</div><span className="ka-eyebrow">{recipe.tag}</span><h2>{recipe.title}</h2><p>⏱ {recipe.time} minutter</p><h3>Ingredienser</h3><div className="ka-modal-ingredients">{recipe.ingredients.map(id=><span key={id}>{byId[id].emoji} {byId[id].name}</span>)}</div><h3>Sådan gør du</h3><ol className="ka-steps">{recipe.steps.map(s=><li key={s}>{s}</li>)}</ol><div className="ka-add-plan"><label>Vælg dag<select value={day} onChange={e=>setDay(e.target.value)}>{days.map(d=><option key={d}>{d}</option>)}</select></label><Button onClick={()=>add(recipe,day)}>📅 Læg i {day} + indkøbsliste</Button></div></section></div>; }

function MealPlan({plan,openRecipes,openRecipe,recipes:rs}:{plan:Record<string,string|null>;openRecipes:()=>void;openRecipe:(r:Recipe)=>void;recipes:Recipe[]}) { return <section className="ka-page"><span className="ka-eyebrow">📅 Planlægning</span><h1>Ugens madplan</h1><p className="ka-lead">Tryk på en dag for hurtigt at vælge en anden ret.</p><div className="ka-plan-grid">{days.map(day=>{const r=rs.find(x=>x.title===plan[day]);return <article className="ka-day" key={day}><small>{day}</small><button onClick={()=>r?openRecipe(r):openRecipes()}><strong>{plan[day]||'Ikke planlagt endnu'}</strong><span>{r?'Se opskrift →':'＋ Vælg ret'}</span></button></article>})}</div><Button onClick={openRecipes}>＋ Find en opskrift til en dag</Button></section>; }

function Shopping({shopping,toggle,manual,setManual,addManual}:{shopping:ShoppingItem[];toggle:(i:number)=>void;manual:string;setManual:(s:string)=>void;addManual:()=>void}) { return <section className="ka-page ka-shopping-page"><span className="ka-eyebrow">🛒 På tur i butikken</span><h1>Indkøbsliste</h1><p className="ka-lead">Retter fra madplanen lægger automatisk ingredienser her.</p><div className="ka-add-item"><input value={manual} onChange={e=>setManual(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addManual()} placeholder="Tilføj fx bananer..."/><Button onClick={addManual}>＋ Tilføj</Button></div>{categories.filter(c=>shopping.some(i=>i.category===c)).map(c=><div className="ka-shop-group" key={c}><h3>{c}</h3>{shopping.map((item,i)=>item.category===c&&<button key={`${item.name}-${i}`} className={item.done?'done':''} onClick={()=>toggle(i)}><span>{item.done?'✓':'○'}</span><b>{item.emoji}</b>{item.name}</button>)}</div>)}</section>; }
