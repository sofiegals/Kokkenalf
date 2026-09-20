import React,{useState}from'react';
import AppNext from './AppNext';
import PantryMatch from './PantryMatch';
import './PantryMatch.css';
export default function AppNextEntry(){const[open,setOpen]=useState(false);const[version,setVersion]=useState(0);const refresh=()=>setVersion(v=>v+1);return <><AppNext key={version}/><button className="ka-pantry-launch" onClick={()=>setOpen(true)}>🥕 Hvad har vi hjemme?</button>{open&&<div className="ka-pantry-overlay"><PantryMatch onAdded={refresh} onBack={()=>setOpen(false)}/></div>}</>}
