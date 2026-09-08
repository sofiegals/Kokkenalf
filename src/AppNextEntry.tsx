import React,{useState}from'react';
import AppNext from './AppNext';
import PantryMatch from './PantryMatch';
import './PantryMatch.css';
export default function AppNextEntry(){const[open,setOpen]=useState(false);return <><AppNext/><button className="ka-pantry-launch" onClick={()=>setOpen(true)}>🥕 Hvad har vi hjemme?</button>{open&&<div className="ka-pantry-overlay"><PantryMatch onBack={()=>setOpen(false)}/></div>}</>}
