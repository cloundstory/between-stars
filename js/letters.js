// ============================================================
//  Between Stars · js/letters.js — ชั้นข้อมูลคำฝาก (local store + cloud)
//  ไม่มี DOM/3D ในไฟล์นี้ — ผลข้างเคียงฝั่ง UI คุยผ่าน hooks จาก initLetters()
//  (การ render โมดัล/ดาวตกยังอยู่ใน app.js ตามเดิม)
// ============================================================
import {LANG} from './i18n.js';
import {SEED_LETTERS,SEED_LETTERS_EN} from '../data/contemplate.js';
import {genId,setDailyLimit} from './util.js';

let hooks={getSignal:()=>null,spawnDrift:()=>{},onStatsChange:()=>{},onCloudChange:()=>{}};
export function initLetters(h){hooks={...hooks,...h};}

const LKEY='spaceLetters';
export function readLocal(){try{return JSON.parse(localStorage.getItem(LKEY)||'[]');}catch(e){return[];}}
export function writeLocal(a){try{localStorage.setItem(LKEY,JSON.stringify(a.slice(-300)));}catch(e){}}
// ---- social คำฝาก: cloud cache (null = ยังไม่โหลด → ใช้ local/seed เดิม; graceful ถ้า backend ไม่พร้อม) ----
let _cloudLetters=null,_cloudMine=null;
function _mapCloudLetter(r){return {id:'c'+r.id,cid:r.id,text:r.text,sig:r.sig,t:r.ts?Date.parse(r.ts):0,pub:true,replies:r.replies||[],cloud:true};}
export async function refreshCloudLetters(){
  if(!(window.BSync&&window.BSync.configured&&window.BSync.letters))return;
  try{
    const pub=await window.BSync.letters.fetchPublic();if(Array.isArray(pub))_cloudLetters=pub.map(_mapCloudLetter);
    const mine=await window.BSync.letters.fetchMine(hooks.getSignal());if(Array.isArray(mine))_cloudMine=mine.map(_mapCloudLetter);
    hooks.onCloudChange();
  }catch(e){}
}
export function cloudMine(){return _cloudMine;}
const DISP_STATS='dispatchStats';
export const DISPATCH_PUB_KEY='dispatchDate_pub';
export const DISPATCH_PRIV_KEY='dispatchDate_priv';
export function getDispatchStats(){try{return JSON.parse(localStorage.getItem(DISP_STATS)||'{"priv":0}');}catch(e){return{priv:0};}}
function incPrivCount(){const s=getDispatchStats();s.priv=(s.priv||0)+1;localStorage.setItem(DISP_STATS,JSON.stringify(s));}
export function castLetter(text,pub){
  if(!pub){setDailyLimit(DISPATCH_PRIV_KEY);incPrivCount();hooks.onStatsChange();if(window.bsEvent)bsEvent('release');return;} // ปล่อยวาง — ไม่ spawnDrift (ใช้ ritual ดูดเข้าหลุมดำแทน)
  setDailyLimit(DISPATCH_PUB_KEY);
  const a=readLocal(),cid=genId();
  a.push({id:cid,text,t:Date.now(),pub:true,sig:hooks.getSignal(),replies:[],pinned:false});
  writeLocal(a);hooks.spawnDrift();hooks.onStatsChange();if(window.bsEvent)bsEvent('letter_cast');
  // ส่งขึ้น cloud ให้คนอื่นเจอ (graceful: ถ้าไม่พร้อม คำฝากยังอยู่ local)
  if(window.BSync&&window.BSync.configured&&window.BSync.letters)
    window.BSync.letters.post({cid,text:text.slice(0,200),sig:hooks.getSignal()}).then(()=>refreshCloudLetters());
}
export function letterPool(){
  const mySig=hooks.getSignal();
  const seeds=(LANG==='en'?SEED_LETTERS_EN:SEED_LETTERS).map((text,i)=>({id:'seed_'+i,text,t:0,pub:true,sig:null,replies:[]}));
  // ถ้ามี cloud (cross-user) → discover คำฝากจริงของคนอื่น; ไม่งั้น fallback local
  const src=(_cloudLetters!==null)?_cloudLetters:readLocal();
  const avail=src.filter(l=>l.pub&&l.sig!==mySig&&(!l.replies||l.replies.length===0));
  return seeds.concat(avail);
}
export function checkDispatchDecay(){
  const now=Date.now(),D3=3*864e5,D7=7*864e5,a=readLocal();
  const filtered=a.filter(l=>{
    if(!l.pub||!l.id)return true;
    if(l.pinned)return true;
    if(l.replies&&l.replies.length>0)return(now-l.replies[0].t)<D3;
    return(now-l.t)<D7;
  });
  if(filtered.length<a.length)writeLocal(filtered);
}
let lastFoundId=null;
export function pickLetter(){
  const p=letterPool();if(!p.length)return null;
  // คำฝากจริงมีน้อยแต่มีค่าที่สุด — อย่าให้ seed 30 ฉบับกลบ (เดิมสุ่มรวม ≈ เจอจริงแค่ ~6%)
  // ยิ่งมีคำฝากจริงมาก seed ยิ่งจาง: จริง 1 ฉบับ → เจอจริง ~65%, 5+ ฉบับ → ~85% (เพดาน)
  const isSeed=l=>String(l.id).startsWith('seed_');
  const real=p.filter(l=>!isSeed(l)),seeds=p.filter(isSeed);
  const pReal=Math.min(0.85,0.6+0.05*real.length);
  const src=(real.length&&(!seeds.length||Math.random()<pReal))?real:seeds;
  let pick;do{pick=src[Math.floor(Math.random()*src.length)];}while(src.length>1&&pick.id===lastFoundId);
  lastFoundId=pick.id;return pick;
}

export function getUnseenRepliedIds(){
  const mySig=hooks.getSignal();
  const seen=new Set(JSON.parse(localStorage.getItem('seenReplies')||'[]'));
  return readLocal().filter(l=>l.pub&&l.sig===mySig&&l.replies&&l.replies.length>0&&!seen.has(l.id)).map(l=>l.id);
}
export function markRepliesSeenStore(){
  const mySig=hooks.getSignal();
  const allRepliedIds=readLocal().filter(l=>l.pub&&l.sig===mySig&&l.replies&&l.replies.length>0).map(l=>l.id);
  try{localStorage.setItem('seenReplies',JSON.stringify(allRepliedIds.slice(-200)));}catch(e){}
}
