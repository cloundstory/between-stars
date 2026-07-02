// ============================================================
//  Between Stars · js/cosmic-dates.js — เลขของกาลเวลาบนฟ้า
//  วันเกิดบนดาวดวงอื่น (planet birthdays + .ics) และ "ระหว่างเรา" (สองวัน)
//  logic + วาดการ์ดแชร์ล้วน ๆ — ปุ่ม/โมดัลอยู่ใน app.js
// ============================================================
import {LANG,L} from './i18n.js';
import {PLANETS} from '../data/bodies.js';

// คาบโคจรจริง (sidereal, วันโลก)
const PERIODS={Mercury:87.969,Venus:224.701,Mars:686.980,Jupiter:4332.589,
  Saturn:10759.22,Uranus:30688.5,Neptune:60182,Pluto:90560};
const DAY=864e5;
const SITE='between-stars.vercel.app';

function planetInfo(en){
  const p=PLANETS.find(x=>x.en===en)||{};
  return {en,th:(p.name||en),color:p.color||'#f3c97a'};
}
export function fmtDate(d){
  return d.toLocaleDateString(LANG==='en'?'en-GB':'th-TH-u-ca-gregory-nu-latn',
    {day:'numeric',month:'long',year:'numeric'});
}
const fmt1=n=>n.toLocaleString(LANG==='en'?'en-US':'th-TH',{maximumFractionDigits:1});
const fmt0=n=>Math.round(n).toLocaleString(LANG==='en'?'en-US':'th-TH');

// ── อายุบนแต่ละดาว + วันเกิดดาวครั้งถัดไป ──
export function planetAges(birth,now=new Date()){
  const days=(now.getTime()-birth.getTime())/DAY;
  if(days<0)return [];
  return Object.keys(PERIODS).map(en=>{
    const P=PERIODS[en],age=days/P,nextN=Math.floor(age)+1;
    const daysUntil=nextN*P-days;
    return {...planetInfo(en),period:P,age,nextN,daysUntil,
      nextDate:new Date(now.getTime()+daysUntil*DAY),
      earthYearsPerYear:P/365.256};
  });
}
// milestone ที่ใกล้ที่สุด (ไว้ขึ้นการ์ด) — วันนี้พอดีนับก่อนเสมอ
export function nearestMilestone(ages){
  if(!ages.length)return null;
  const today=ages.find(a=>a.daysUntil<1||a.daysUntil>a.period-1);
  return today||[...ages].sort((a,b)=>a.daysUntil-b.daysUntil)[0];
}

// ── ระหว่างสองวัน ──
export function betweenStats(d1,d2){
  const a=Math.min(d1.getTime(),d2.getTime()),b=Math.max(d1.getTime(),d2.getTime());
  const days=(b-a)/DAY;
  return {days,
    earthOrbits:days/365.256,
    fullMoons:days/29.53059,
    mercuryOrbits:days/PERIODS.Mercury,
    saturnDeg:360*days/PERIODS.Saturn,
    lightYears:days/365.25,
    from:new Date(a),to:new Date(b)};
}

// ── .ics: วันเกิดดาวครั้งถัดไปของทุกดวง (เปิดไฟล์เดียว ลงปฏิทินทั้งชุด) ──
export function buildBirthdayICS(birth,ages){
  const pad=n=>String(n).padStart(2,'0');
  // วันที่ท้องถิ่นของผู้ใช้ — all-day event ต้องตรงกับวันบนปฏิทินเขา ไม่ใช่ UTC (เหลื่อมได้ 1 วัน)
  const dstr=d=>d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate());
  const stamp=dstr(new Date())+'T000000Z';
  const link='https://'+SITE+'/solar-system.html?chronos=1&d='+birth.toISOString().slice(0,10);
  const ev=a=>[
    'BEGIN:VEVENT',
    'UID:bs-'+a.en.toLowerCase()+'-'+a.nextN+'-'+dstr(a.nextDate)+'@'+SITE,
    'DTSTAMP:'+stamp,
    'DTSTART;VALUE=DATE:'+dstr(a.nextDate),
    'SUMMARY:'+L('🎂 My '+ordinal(a.nextN)+' birthday on '+a.en+' · Between Stars',
                 '🎂 วันเกิดปีที่ '+a.nextN+' ของฉันบน'+a.th+' · ห้วงดาว'),
    'DESCRIPTION:'+L('One '+a.en+' year = '+fmt1(a.earthYearsPerYear)+' Earth years. See the sky of your day: ',
                     '1 ปี'+a.th+' = '+fmt1(a.earthYearsPerYear)+' ปีโลก · ดูฟ้าของวันคุณ: ')+link,
    'END:VEVENT'].join('\r\n');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Between Stars//Planet Birthdays//TH',
    ...ages.map(ev),'END:VCALENDAR'].join('\r\n');
}
function ordinal(n){const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}

// ════════ การ์ดแชร์ (1080×1350 — ภาษาภาพเดียวกับการ์ด capture/light-echo) ════════
function cardBase(){
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;
  const x=c.getContext('2d');
  const bg=x.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#080c1a');bg.addColorStop(0.5,'#04060d');bg.addColorStop(1,'#02030a');
  x.fillStyle=bg;x.fillRect(0,0,W,H);
  let seed=42;const rng=()=>{seed=(seed*1664525+1013904223)&0xffffffff;return(seed>>>0)/4294967296;};
  for(let i=0;i<420;i++){x.beginPath();x.arc(rng()*W,rng()*H,rng()*1.8+0.2,0,6.28);
    x.fillStyle=`rgba(215,225,255,${rng()*0.5+0.08})`;x.fill();}
  return {c,x,W,H,rng};
}
function brand(x,W,H){
  x.textAlign='center';
  x.fillStyle='rgba(243,201,122,0.72)';x.font='600 20px "Space Grotesk",sans-serif';x.letterSpacing='0.25em';
  x.fillText('✦  BETWEEN STARS  ·  ห้วงดาว',W/2,78);x.letterSpacing='0px';
  x.strokeStyle='rgba(243,201,122,0.20)';x.lineWidth=1;
  x.beginPath();x.moveTo(W/2-80,100);x.lineTo(W/2+80,100);x.stroke();
  x.fillStyle='rgba(243,201,122,0.58)';x.font='500 19px "Space Grotesk",sans-serif';x.letterSpacing='0.06em';
  x.fillText(SITE,W/2,H-64);x.letterSpacing='0px';
}
function hexRGB(h){const m=h.replace('#','');return [0,2,4].map(i=>parseInt(m.slice(i,i+2),16));}
function orb(x,px,py,r,color,glow){
  const [R,G,B]=hexRGB(color);
  const gl=x.createRadialGradient(px,py,0,px,py,glow);
  gl.addColorStop(0,`rgba(${R},${G},${B},0.85)`);gl.addColorStop(0.25,`rgba(${R},${G},${B},0.28)`);
  gl.addColorStop(1,`rgba(${R},${G},${B},0)`);
  x.fillStyle=gl;x.beginPath();x.arc(px,py,glow,0,6.28);x.fill();
  const body=x.createRadialGradient(px-r*0.35,py-r*0.35,r*0.1,px,py,r);
  body.addColorStop(0,'rgba(255,255,255,0.92)');body.addColorStop(0.25,`rgb(${R},${G},${B})`);
  body.addColorStop(1,`rgba(${Math.round(R*0.4)},${Math.round(G*0.4)},${Math.round(B*0.45)},1)`);
  x.fillStyle=body;x.beginPath();x.arc(px,py,r,0,6.28);x.fill();
}

// ── การ์ดวันเกิดดาว ──
export function buildBirthdayCard(m,birth){
  const {c,x,W,H}=cardBase();
  const [R,G,B]=hexRGB(m.color);
  const neb=x.createRadialGradient(W*0.5,H*0.30,0,W*0.5,H*0.30,W*0.75);
  neb.addColorStop(0,`rgba(${R},${G},${B},0.16)`);neb.addColorStop(1,'rgba(0,0,0,0)');
  x.fillStyle=neb;x.fillRect(0,0,W,H);
  orb(x,W/2,H*0.315,120,m.color,340);
  if(m.en==='Saturn'){ // วงแหวน — เอียงเบา ๆ
    x.save();x.translate(W/2,H*0.315);x.rotate(-0.3);x.scale(1,0.32);
    x.strokeStyle='rgba(230,215,180,0.75)';x.lineWidth=16;
    x.beginPath();x.arc(0,0,185,0,6.28);x.stroke();
    x.strokeStyle='rgba(230,215,180,0.30)';x.lineWidth=30;
    x.beginPath();x.arc(0,0,222,0,6.28);x.stroke();x.restore();
  }
  brand(x,W,H);
  x.textAlign='center';
  x.fillStyle='rgba(243,201,122,0.62)';x.font='500 24px "Space Grotesk",sans-serif';x.letterSpacing='0.3em';
  x.fillText(L('PLANET BIRTHDAY','PLANET BIRTHDAY · วันเกิดดาว'),W/2,H*0.565);x.letterSpacing='0px';

  const isToday=m.daysUntil<1||m.daysUntil>m.period-1;
  x.fillStyle='rgba(238,242,251,0.55)';x.font='300 30px "Noto Sans Thai",sans-serif';
  x.fillText(isToday?L('Today I turn','วันนี้ฉันอายุครบ')
    :L('In '+fmt0(m.daysUntil)+' days I will turn','อีก '+fmt0(m.daysUntil)+' วัน ฉันจะครบ'),W/2,H*0.622);
  x.fillStyle='#fff';x.shadowColor=`rgba(${R},${G},${B},0.45)`;x.shadowBlur=40;
  x.font='300 96px "Noto Sans Thai",sans-serif';
  x.fillText(L(m.nextN+(isToday?'':' '),String(m.nextN)+' ขวบ'),W/2,H*0.622+108);
  x.shadowBlur=0;
  x.fillStyle=`rgb(${Math.min(255,R+60)},${Math.min(255,G+60)},${Math.min(255,B+60)})`;
  x.font='300 52px "Noto Sans Thai",sans-serif';
  x.fillText(L('on '+m.en,'บน'+m.th),W/2,H*0.622+176);

  x.fillStyle='rgba(238,242,251,0.45)';x.font='300 26px "Noto Sans Thai",sans-serif';
  x.fillText(L('that is '+fmtDate(m.nextDate)+' on Earth','ตรงกับวันที่ '+fmtDate(m.nextDate)+' บนโลก'),W/2,H*0.622+238);
  x.fillStyle='rgba(243,201,122,0.55)';x.font='300 23px "Noto Sans Thai",sans-serif';
  const yr=m.period<365?L('one '+m.en+' year = '+Math.round(m.period)+' Earth days','1 ปี'+m.th+' = '+Math.round(m.period)+' วันโลก')
    :L('one '+m.en+' year = '+fmt1(m.earthYearsPerYear)+' Earth years','1 ปี'+m.th+' = '+fmt1(m.earthYearsPerYear)+' ปีโลก');
  x.fillText(yr,W/2,H*0.622+286);
  return c;
}

// ── การ์ดระหว่างเรา ──
export function buildBetweenCard(s){
  const {c,x,W,H}=cardBase();
  const neb=x.createRadialGradient(W*0.5,H*0.28,0,W*0.5,H*0.28,W*0.8);
  neb.addColorStop(0,'rgba(45,65,140,0.22)');neb.addColorStop(1,'rgba(0,0,0,0)');
  x.fillStyle=neb;x.fillRect(0,0,W,H);
  // สองดวง + เส้นเชื่อม
  const ax=W*0.26,ay=H*0.34,bx=W*0.74,by=H*0.22;
  x.save();x.strokeStyle='rgba(243,201,122,0.35)';x.lineWidth=1.6;x.setLineDash([3,10]);
  x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();x.setLineDash([]);x.restore();
  [[ax,ay],[bx,by]].forEach(([px,py],i)=>{ // วงโคจรบาง ๆ รอบแต่ละดวง
    x.save();x.translate(px,py);x.scale(1,0.45);
    x.strokeStyle='rgba(238,242,251,0.16)';x.lineWidth=1.2;
    x.beginPath();x.arc(0,0,86+i*10,0,6.28);x.stroke();x.restore();
  });
  orb(x,ax,ay,34,'#7ac5ff',130);
  orb(x,bx,by,34,'#f3c97a',130);
  brand(x,W,H);
  x.textAlign='center';
  x.fillStyle='rgba(243,201,122,0.62)';x.font='500 24px "Space Grotesk",sans-serif';x.letterSpacing='0.3em';
  x.fillText(L('BETWEEN US','BETWEEN US · ระหว่างเรา'),W/2,H*0.505);x.letterSpacing='0px';
  x.fillStyle='rgba(238,242,251,0.5)';x.font='300 27px "Noto Sans Thai",sans-serif';
  x.fillText(fmtDate(s.from)+'  ↔  '+fmtDate(s.to),W/2,H*0.505+52);

  x.fillStyle='#fff';x.shadowColor='rgba(122,197,255,0.4)';x.shadowBlur=36;
  const big=L('Earth carried us '+fmt1(s.earthOrbits)+' orbits','โลกพาเราโคจรมาแล้ว '+fmt1(s.earthOrbits)+' รอบ');
  let fs=62;x.font='300 '+fs+'px "Noto Sans Thai",sans-serif';
  while(fs>34&&x.measureText(big).width>W-140){fs-=2;x.font='300 '+fs+'px "Noto Sans Thai",sans-serif';}
  x.fillText(big,W/2,H*0.505+142);
  x.shadowBlur=0;

  const rows=[
    ['🌕',L(fmt0(s.fullMoons)+' full moons rose','พระจันทร์เต็มดวงขึ้น '+fmt0(s.fullMoons)+' ครั้ง')],
    ['☿',L('Mercury circled the Sun '+fmt0(s.mercuryOrbits)+' times','ดาวพุธโคจรรอบดวงอาทิตย์ '+fmt0(s.mercuryOrbits)+' รอบ')],
    ['♄',L('Saturn drifted '+fmt1(s.saturnDeg)+'° across the sky','ดาวเสาร์เคลื่อนไป '+fmt1(s.saturnDeg)+'° บนฟ้า')],
    ['✦',L('light traveled '+fmt1(s.lightYears)+' light-years','แสงเดินทางไปไกล '+fmt1(s.lightYears)+' ปีแสง')],
  ];
  x.font='300 30px "Noto Sans Thai",sans-serif';
  rows.forEach((r,i)=>{
    const y=H*0.505+218+i*56;
    x.fillStyle='rgba(243,201,122,0.8)';x.fillText(r[0],W/2-x.measureText(r[1]).width/2-34,y);
    x.fillStyle='rgba(238,242,251,0.72)';x.fillText(r[1],W/2,y);
  });
  x.fillStyle='rgba(238,242,251,0.4)';x.font='italic 300 26px "Noto Sans Thai",sans-serif';
  x.fillText(L('and the light from day one is still traveling','และแสงจากวันแรก ก็ยังเดินทางอยู่จนวันนี้'),W/2,H*0.505+218+4*56+30);
  return c;
}
