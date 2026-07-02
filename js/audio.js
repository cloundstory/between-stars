// ============================================================
//  Between Stars · js/audio.js — เสียงทั้งหมด (Web Audio ล้วน ไม่มีไฟล์นอก)
//  ambient pad + planet soundscape + spacecraft beeps — ย้ายจาก app.js (เฟส 2)
//  state อยู่ในโมดูล: main คุยผ่าน singleton `audio` เท่านั้น
// ============================================================

let getMission=()=>null;   // main ผูกให้อ่าน selectedMission แบบสด ๆ ผ่าน audio.bindMission()

// ============ AMBIENT AUDIO — เสียงอวกาศสังเคราะห์ (Web Audio, ไม่มีไฟล์นอก) ============
let audioCtx=null,ambient=null,soundOn=false;
const MAXVOL=0.9;let vol=0.55;
function makeImpulse(ctx,dur,decay){const rate=ctx.sampleRate,len=rate*dur|0,buf=ctx.createBuffer(2,len,rate);
  for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);}return buf;}
function makeNoise(ctx,dur){const rate=ctx.sampleRate,len=rate*dur|0,buf=ctx.createBuffer(1,len,rate),d=buf.getChannelData(0);
  let last=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;last=(last+0.02*w)/1.02;d[i]=last*3.2;}return buf;}
function buildAmbient(ctx){
  const master=ctx.createGain();master.gain.value=0;
  const comp=ctx.createDynamicsCompressor();comp.threshold.value=-10;comp.ratio.value=6;// ลิมิตเตอร์กันแตก
  master.connect(comp);comp.connect(ctx.destination);
  const conv=ctx.createConvolver();conv.buffer=makeImpulse(ctx,4,2.4);
  const wet=ctx.createGain();wet.gain.value=0.45;const dry=ctx.createGain();dry.gain.value=0.85;
  const bus=ctx.createGain();bus.connect(dry).connect(master);bus.connect(conv);conv.connect(wet).connect(master);
  const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1300;lp.Q.value=0.4;lp.connect(bus);
  // แพดคอร์ดช่วงกลาง (A2/E3/A3/C#4/E4) ลำโพงเล็กเล่นได้ชัด + หายใจช้า
  [110,164.81,220,277.18,329.63].forEach((f,i)=>{
    const o=ctx.createOscillator();o.type='sine';o.frequency.value=f;o.detune.value=Math.random()*8-4;
    const g=ctx.createGain();g.gain.value=0.16/(i*0.55+1);o.connect(g).connect(lp);o.start();
    const lfo=ctx.createOscillator();lfo.type='sine';lfo.frequency.value=0.03+Math.random()*0.05;
    const lg=ctx.createGain();lg.gain.value=0.05/(i*0.55+1);lfo.connect(lg).connect(g.gain);lfo.start();
  });
  // sub เบาๆ ให้อิ่ม
  const sub=ctx.createOscillator();sub.type='sine';sub.frequency.value=55;
  const sg=ctx.createGain();sg.gain.value=0.05;sub.connect(sg).connect(bus);sub.start();
  // กวาดฟิลเตอร์ช้า ๆ ให้มีลมหายใจ
  const flfo=ctx.createOscillator();flfo.type='sine';flfo.frequency.value=0.02;
  const flg=ctx.createGain();flg.gain.value=400;flfo.connect(flg).connect(lp.frequency);flfo.start();
  // ลมอวกาศเบา ๆ
  const noise=ctx.createBufferSource();noise.buffer=makeNoise(ctx,5);noise.loop=true;
  const nlp=ctx.createBiquadFilter();nlp.type='lowpass';nlp.frequency.value=900;
  const ng=ctx.createGain();ng.gain.value=0.02;noise.connect(nlp).connect(ng).connect(bus);noise.start();
  // planet soundscape input — connects through master for volume control
  const planetBus=ctx.createGain();planetBus.gain.value=0.38;planetBus.connect(master);
  return {master,planetBus,bus};
}
// ===== PLANET SOUNDSCAPE =====
let pSnd=null,pSndTimer=null;
function buildPlanetSound(ctx,en,out){
  const g=ctx.createGain();g.gain.value=0;g.connect(out);
  const nodes=[];let extraStop=null;
  function osc(f,type='sine',v=0.15,det=0){
    const o=ctx.createOscillator(),og=ctx.createGain();
    o.type=type;o.frequency.value=f;o.detune.value=det;og.gain.value=v;
    o.connect(og).connect(g);o.start();nodes.push(o);return{o,og};}
  function lfo(rate,amt,target){
    const l=ctx.createOscillator(),lg=ctx.createGain();
    l.frequency.value=rate;lg.gain.value=amt;l.connect(lg).connect(target);l.start();nodes.push(l);}
  function wind(freq=300,q=1.2,v=0.12){
    const s=ctx.createBufferSource(),b=ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate),d=b.getChannelData(0);
    let lv=0;for(let i=0;i<d.length;i++){const w=Math.random()*2-1;lv=(lv+0.005*w)/1.005;d[i]=lv*18;}
    s.buffer=b;s.loop=true;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=freq;f.Q.value=q;
    const ng=ctx.createGain();ng.gain.value=v;s.connect(f).connect(ng).connect(g);s.start();nodes.push(s);return f;}
  function dust(freq=900,q=5,v=0.05){
    const s=ctx.createBufferSource(),b=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*0.8;
    s.buffer=b;s.loop=true;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=freq;f.Q.value=q;
    const ng=ctx.createGain();ng.gain.value=v;s.connect(f).connect(ng).connect(g);s.start();nodes.push(s);return f;}
  function pulse(freq=440,wait=2.4,v=0.08,type='sine'){
    let alive=true;extraStop=()=>{alive=false;};
    (function tick(){if(!alive)return;const o=ctx.createOscillator(),pg=ctx.createGain(),t=ctx.currentTime;
      o.type=type;o.frequency.value=freq*(0.92+Math.random()*0.16);
      pg.gain.setValueAtTime(0,t);pg.gain.linearRampToValueAtTime(v,t+0.02);pg.gain.setTargetAtTime(0,t+0.06,0.24);
      o.connect(pg).connect(g);o.start(t);o.stop(t+1.4);nodes.push(o);
      if(alive)setTimeout(tick,(wait+Math.random()*wait)*1000);})();
  }
  switch(en){
    case 'The Sun':{// solar wind drone + slow corona pulse
      const{og}=osc(45,'sine',0.5);lfo(0.055,18,og.gain);
      osc(90,'sawtooth',0.08);osc(180,'triangle',0.07,8);dust(520,1.1,0.035);
      break;}
    case 'Mercury':{// sparse metallic pings — near silence
      osc(1100,'sine',0.04);osc(1650,'sine',0.025);
      let alive=true;extraStop=()=>{alive=false;};
      (function ping(){if(!alive)return;
        const p=ctx.createOscillator(),pg=ctx.createGain();
        p.frequency.value=900+Math.random()*1200;pg.gain.setValueAtTime(0.1,ctx.currentTime);
        pg.gain.setTargetAtTime(0,ctx.currentTime+0.01,0.22);
        p.connect(pg).connect(g);p.start();nodes.push(p);
        setTimeout(()=>{try{p.stop();}catch(e){}},1200);
        if(alive)setTimeout(ping,2000+Math.random()*3500);})();
      break;}
    case 'Venus':{// dense suffocating dissonance
      [185,188.5,196,277,370].forEach((f,i)=>osc(f,'sawtooth',0.075/(i*0.35+1),i*6));
      const vf=wind(760,0.8,0.11);lfo(0.05,180,vf.frequency);
      const{og}=osc(92,'sine',0.13);lfo(0.035,10,og.gain);
      break;}
    case 'Earth':{// Schumann resonance 7.83Hz + warm major chord
      osc(110,'sine',0.18);osc(146.8,'sine',0.12);osc(220,'triangle',0.07);
      const{og}=osc(55,'sine',0.12);lfo(0.0356,18,og.gain);// 7.83/220
      dust(1250,2.6,0.018);
      break;}
    case 'Mars':{// thin eerie wind
      const wf=wind(310,0.55,0.2);lfo(0.14,150,wf.frequency);
      dust(1800,7,0.035);osc(185,'sine',0.035);pulse(620,3.6,0.035,'triangle');
      break;}
    case 'Jupiter':{// magnetosphere rumble + Voyager whistlers
      const{og}=osc(32,'sine',0.42);lfo(0.23,12,og.gain);
      osc(64,'square',0.08);osc(128,'triangle',0.07);
      const{o:wo}=osc(520,'sine',0.06);lfo(1.8,430,wo.frequency);
      pulse(980,4.8,0.045,'sine');
      break;}
    case 'Saturn':{// ring harmonic series
      [73.4,110,146.8,220,293.6,440,660].forEach((f,i)=>osc(f,'sine',0.12/(i*0.42+1)));
      const{og}=osc(36.7,'sine',0.12);lfo(0.08,5,og.gain);
      pulse(1320,2.8,0.035,'sine');
      break;}
    case 'Uranus':{// icy irregular — tilted magnetic axis
      [[392,0.045],[523,0.05],[659,0.04],[987,0.025]].forEach(([f,v])=>{
        const{og}=osc(f,'sine',v);lfo(0.35+Math.random()*0.25,0.028,og.gain);});
      const{o}=osc(262,'triangle',0.055);lfo(0.11,35,o.frequency);pulse(1760,5.2,0.028,'sine');
      break;}
    case 'Neptune':{// wind rush 2100 km/h
      const nf=wind(120,0.5,0.34);lfo(0.09,95,nf.frequency);
      const{og}=osc(48,'sine',0.1);lfo(0.18,28,og.gain);dust(420,1.2,0.05);
      break;}
    case 'Pluto':{// near silence, cold sparse
      osc(1046,'sine',0.018);osc(1568,'sine',0.012);
      const{og}=osc(523,'sine',0.025);lfo(0.025,0.018,og.gain);pulse(2092,6.5,0.025,'sine');
      break;}
  }
  g.gain.setTargetAtTime(0.5,ctx.currentTime,1.6);
  const stop=()=>{if(extraStop)extraStop();g.gain.setTargetAtTime(0,ctx.currentTime,0.7);
    pSndTimer=setTimeout(()=>nodes.forEach(n=>{try{n.stop();}catch(e){}}),3000);};
  return{g,stop};
}
function startPlanetSound(en){
  if(!audioCtx||!ambient||!soundOn)return;
  if(pSndTimer){clearTimeout(pSndTimer);pSndTimer=null;}
  if(pSnd)pSnd.stop();
  pSnd=buildPlanetSound(audioCtx,en,ambient.planetBus);
}
function stopPlanetSound(){
  if(!pSnd)return;pSnd.stop();pSnd=null;
}
// ===== END PLANET SOUNDSCAPE =====

// ===== SPACECRAFT TELEMETRY BEEPS — เสียงบี๊บยานสำรวจส่งสัญญาณกลับโลก =====
let beepOn=false,beepTimer=null;
function craftPing(t0,freq,vmul){ // บี๊บหนึ่งครั้ง: square ผ่าน bandpass ให้กลิ่นวิทยุ + หางสะท้อนจาก reverb bus
  const o=audioCtx.createOscillator();o.type='square';o.frequency.value=freq;
  const bp=audioCtx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=freq;bp.Q.value=6;
  const g=audioCtx.createGain();g.gain.value=0;
  o.connect(bp).connect(g);g.connect(ambient.bus);   // ผ่าน bus → ได้ reverb อวกาศ + คุม volume/mute ตาม master
  g.gain.setValueAtTime(0,t0);
  g.gain.linearRampToValueAtTime(0.16*vmul,t0+0.006); // attack คม
  g.gain.setTargetAtTime(0,t0+0.045,0.03);            // decay สั้น = "บี๊บ"
  o.start(t0);o.stop(t0+0.25);
}
function craftBeep(){
  if(!beepOn)return;
  const m=getMission();
  if(audioCtx&&ambient&&soundOn&&m){
    const craftVisible=m.marker&&m.marker.visible;
    const t=audioCtx.currentTime,base=1180+Math.random()*160;
    craftPing(t,base,craftVisible?1:0.55);                 // บี๊บ
    if(Math.random()<0.6)craftPing(t+0.17,base*1.5,craftVisible?0.85:0.45); // บี๊บ-บี๊บ (บางครั้งสองพยางค์)
  }
  beepTimer=setTimeout(craftBeep,3200+Math.random()*3200); // เว้นจังหวะไม่สม่ำเสมอ ให้เหมือนสัญญาณจริง
}
function startCraftBeeps(){if(beepOn)return;beepOn=true;craftBeep();}
function stopCraftBeeps(){beepOn=false;if(beepTimer){clearTimeout(beepTimer);beepTimer=null;}}
// ===== END SPACECRAFT BEEPS =====
function fadeAudio(v){if(!ambient)return;const t=audioCtx.currentTime;
  ambient.master.gain.cancelScheduledValues(t);ambient.master.gain.setTargetAtTime(v,t,0.8);}

// ── API เดียวที่ main ใช้ ──
export const audio={
  get ctx(){return audioCtx;},
  get on(){return soundOn;}, set on(v){soundOn=!!v;},
  get vol(){return vol;},    set vol(v){vol=v;},
  MAXVOL,
  // สร้าง context+ambient ครั้งแรก (unlock: เล่น buffer เงียบปลดล็อก iOS) — คืน null ถ้าสร้างไม่ได้
  ensureCtx(opts){
    if(!audioCtx){try{audioCtx=new (window.AudioContext||window.webkitAudioContext)();ambient=buildAmbient(audioCtx);
      if(opts&&opts.unlock){try{const b=audioCtx.createBuffer(1,1,22050),s=audioCtx.createBufferSource();s.buffer=b;s.connect(audioCtx.destination);s.start(0);}catch(e){}}
    }catch(e){return null;}}
    return audioCtx;},
  fade:fadeAudio,
  startPlanetSound,stopPlanetSound,startCraftBeeps,stopCraftBeeps,
  bindMission(fn){getMission=fn;},
  debug(){return {state:audioCtx&&audioCtx.state,soundOn,vol,master:ambient?ambient.master.gain.value:null};},
};
