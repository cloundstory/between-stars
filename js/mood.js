// ============================================================
//  Between Stars · js/mood.js — ชั้นข้อมูลห้วงใจ (store + คำถาม + สี/ป้ายอารมณ์)
//  data ล้วนไม่มี DOM — UI ของ mood journal ยังอยู่ใน app.js
// ============================================================
import {LANG} from './i18n.js';
import {MOOD_QBANK,MOOD_QBANK_EN} from '../data/memory-stars.js';

const MOOD_KEY='moodJournal';
export const MOODS=[
  {k:'radiant',  label:'สว่าง',     en:'Radiant',  c:'#f3c97a'},
  {k:'calm',     label:'สงบ',       en:'Calm',     c:'#8fb8e8'},
  {k:'hopeful',  label:'เปี่ยมหวัง', en:'Hopeful',  c:'#7fd6b8'},
  {k:'faded',    label:'เลือนราง',   en:'Faded',    c:'#b3a4e6'},
  {k:'heavy',    label:'หม่น',       en:'Heavy',    c:'#7d8aa3'},
  {k:'turbulent',label:'คุกรุ่น',    en:'Restless', c:'#e0895a'},
];
export const moodColor=k=>{const m=MOODS.find(x=>x.k===k);return m?m.c:'#888';};
export const moodLabel=k=>{const m=MOODS.find(x=>x.k===k);return m?(LANG==='en'?m.en:m.label):'';};
// EN journaling prompts — transcreated for feeling, not machine-translated (gentle, second person, present)
const QBANK=()=>LANG==='en'?MOOD_QBANK_EN:MOOD_QBANK;
export function moodLocalStr(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
export function pickMoodQ(k,avoid){const a=QBANK()[k]||[];if(!a.length)return '';
  if(a.length<2||!avoid)return a[Math.floor(Math.random()*a.length)];
  let q;do{q=a[Math.floor(Math.random()*a.length)];}while(q===avoid);return q;}
export function readMood(){try{return JSON.parse(localStorage.getItem(MOOD_KEY)||'{}');}catch(e){return{};}}
export function writeMood(o){try{localStorage.setItem(MOOD_KEY,JSON.stringify(o));}catch(e){}}
export function moodStreak(){const j=readMood();let n=0,d=new Date();while(j[moodLocalStr(d)]){n++;d.setDate(d.getDate()-1);}return n;}
export function moodRecent(n){const j=readMood();return Object.keys(j).sort().slice(-n).map(k=>j[k]);}
