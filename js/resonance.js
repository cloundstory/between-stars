// ============================================================
//  Between Stars · js/resonance.js — บอร์ดเสียงสะท้อน (local) + ตัวตน Signal
//  store + กติกา (storm prune, cap, like ครั้งเดียว, report) — DOM อยู่ใน app.js
//  getSignal/getSignalFull อยู่ที่นี่เพราะตัวตนเกิดจากระบบ resonance
// ============================================================

export const RKEY='resonanceBoard',SIGKEY='resonanceSignal',STORMKEY='resonanceStorm',RLIKES='resonanceLikes',RREPORTS='resonanceReports';
export const RES_CAP=30,RES_KEEP=10,RES_STORM_DAYS=7;
export const STAR_NAMES=['Vega','Sirius','Rigel','Betelgeuse','Arcturus','Capella','Altair','Aldebaran',
  'Antares','Spica','Pollux','Fomalhaut','Deneb','Regulus','Castor','Procyon',
  'Mimosa','Acrux','Hadar','Canopus','Achernar','Adhara','Bellatrix','Elnath','Alnitak'];

export function getSignal(){let s=localStorage.getItem(SIGKEY);if(!s){const n=STAR_NAMES[Math.floor(Math.random()*STAR_NAMES.length)];const hr=String(Math.floor(Math.random()*8900)+100).padStart(4,'0');s=n+' · HR '+hr;localStorage.setItem(SIGKEY,s);}return s;}
export function readBoard(){try{return JSON.parse(localStorage.getItem(RKEY)||'{}');}catch(e){return{};}}
export function writeBoard(b){try{localStorage.setItem(RKEY,JSON.stringify(b));}catch(e){}}
export function readLikes(){try{return new Set(JSON.parse(localStorage.getItem(RLIKES)||'[]'));}catch(e){return new Set();}}
export function readReports(){try{return new Set(JSON.parse(localStorage.getItem(RREPORTS)||'[]'));}catch(e){return new Set();}}
export function saveLikes(s){try{localStorage.setItem(RLIKES,JSON.stringify([...s]));}catch(e){}}
export function saveReports(s){try{localStorage.setItem(RREPORTS,JSON.stringify([...s]));}catch(e){}}

export function checkStorm(){
  const last=+(localStorage.getItem(STORMKEY)||0),now=Date.now();
  if(now-last<RES_STORM_DAYS*864e5)return;
  const b=readBoard();
  Object.keys(b).forEach(en=>{if(b[en].length>RES_KEEP)b[en]=[...b[en]].sort((a,c)=>(c.likes||0)-(a.likes||0)).slice(0,RES_KEEP);});
  writeBoard(b);localStorage.setItem(STORMKEY,String(now));
}

export function postResonance(en,text){
  const b=readBoard();if(!b[en])b[en]=[];
  const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);
  b[en].unshift({id,text,sig:getSignal(),t:Date.now(),likes:0});
  if(b[en].length>RES_CAP)b[en]=b[en].slice(0,RES_CAP);
  writeBoard(b);
}
export function likeResonance(en,id){
  const b=readBoard(),likes=readLikes();if(likes.has(id))return false;
  const item=b[en]?.find(r=>r.id===id);if(!item)return false;
  item.likes=(item.likes||0)+1;writeBoard(b);likes.add(id);saveLikes(likes);return true;
}
export function reportResonance(id){const r=readReports();r.add(id);saveReports(r);}

export function getSignalFull(){
  let s=localStorage.getItem(SIGKEY);
  if(!s){const n=STAR_NAMES[Math.floor(Math.random()*STAR_NAMES.length)];const hr=String(Math.floor(Math.random()*8900)+100).padStart(4,'0');s=n+' · HR '+hr;localStorage.setItem(SIGKEY,s);}
  if(!localStorage.getItem('sigCreated'))localStorage.setItem('sigCreated',String(Date.now()));
  return s;
}
