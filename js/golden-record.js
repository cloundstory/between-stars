// ============================================================
//  Between Stars · js/golden-record.js — ชั้นข้อมูล Golden Record
//  pool ข้อความ + ผนึกข้อความ (sealGR) + สัญญาณประจำวันจากยาน (craftDailyMessage)
//  DOM ของ overlay/โมดัลยังอยู่ใน app.js
// ============================================================
import {LANG,L} from './i18n.js';
import {GR_SEEDS,GR_SEEDS_EN} from '../data/contemplate.js';
import {todayStr} from './util.js';

const GR_KEY='goldenRecord',GR_POOL='grPool',CRAFT_MSG_KEY='craftMsgDate';

export function readGRPool(){try{return JSON.parse(localStorage.getItem(GR_POOL)||'[]');}catch(e){return[];}}
export function writeGRPool(a){try{localStorage.setItem(GR_POOL,JSON.stringify(a));}catch(e){}}
export function hasWrittenGR(){const d=localStorage.getItem(GR_KEY);return d?JSON.parse(d):null;}
export function markGRWritten(date,ownId,text){localStorage.setItem(GR_KEY,JSON.stringify({date,ownId,text}));}

export function sealGR(text){
  const pool=readGRPool();
  const ownId=Date.now().toString(36)+Math.random().toString(36).slice(2,4);
  const ownText=text.slice(0,200);
  pool.push({id:ownId,text:ownText,t:Date.now()});
  if(pool.length>200)pool.splice(0,pool.length-200);
  writeGRPool(pool);
  markGRWritten(new Date().toISOString(),ownId,ownText);
  if(window.bsEvent)bsEvent('golden_save');
  if(window.BSync&&window.BSync.push)window.BSync.push();
}

// ============ CRAFT PHILO CLICK → DEEP SPACE MESSAGE ============
function getCraftMessage(){
  const ownId=(hasWrittenGR()||{}).ownId;
  const pool=readGRPool().filter(m=>m.text&&m.id!==ownId);
  if(pool.length>0&&Math.random()<0.55){
    const pick=pool[Math.floor(Math.random()*pool.length)];
    return{text:pick.text,attr:L('A signal from the Golden Record · sender unknown','สัญญาณจาก Golden Record · ผู้ส่งไม่ทราบชื่อ'),fromPool:true};
  }
  const seedPool=LANG==='en'?GR_SEEDS_EN:GR_SEEDS,seed=seedPool[Math.floor(Math.random()*seedPool.length)];
  return{text:seed,attr:L('A signal from the deep · Voyager Interstellar Mission','สัญญาณจากห้วงลึก · Voyager Interstellar Mission'),fromPool:false};
}

export function craftDailyMessage(){
  let cached=null;
  try{cached=JSON.parse(localStorage.getItem(CRAFT_MSG_KEY)||'null');}catch(e){}
  if(!cached||cached.date!==todayStr()){
    const msg=getCraftMessage();
    cached={date:todayStr(),text:msg.text,attr:msg.attr};
    localStorage.setItem(CRAFT_MSG_KEY,JSON.stringify(cached));
  }
  return cached;
}
