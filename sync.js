// ============================================================
//  Between Stars · Cloud Sync  (Phase 1 — ซิงก์ข้อมูลส่วนตัวข้ามเครื่อง)
//  วิธีเปิดใช้: วางค่า 2 ตัวจาก Supabase (Settings → API) ด้านล่าง
//  ถ้าปล่อยว่าง = เว็บทำงานปกติแบบ local-only (ปลอดภัย deploy ได้เลย)
// ============================================================
const SUPABASE_URL  = 'https://isiqrzcywrzwpynfgmam.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaXFyemN5d3J6d3B5bmZnbWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTA4MjQsImV4cCI6MjA5NzQyNjgyNH0.-kwWj13ScY_wTY8tfFVOoRe_hm1gpva-j301N_woQhs';

// localStorage keys ที่ซิงก์ (Phase 1 = ข้อมูลส่วนตัวล้วน ไม่มีของคนอื่น)
const SYNC_KEYS = ['moodJournal','resonanceSignal','sigCreated','goldenRecord','craftMsgDate',
  'memoryStarOrbit','memoryStarArchive','memoryStarCandidate','memoryStarNames'];

// API กลาง — โค้ดหลักเรียกผ่าน window.BSync (มี fallback no-op ถ้ายังไม่ตั้งค่า)
window.BSync = {
  configured:false, ready:false, session:null,
  email(){ return this.session ? this.session.user.email : null; },
  async sendLink(){ return {error:{message:'sync ยังไม่ถูกตั้งค่า'}}; },
  async logout(){},
  push(){},
};

if (SUPABASE_URL && SUPABASE_ANON) boot();

async function boot(){
  let sb;
  try{
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    sb = createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true, flowType:'pkce' }
    });
  }catch(e){ console.warn('[sync] โหลด SDK ไม่สำเร็จ', e); return; }

  let pushTimer=null, uid=null;
  const api = window.BSync;
  api.configured = true;

  api.sendLink = (email)=> sb.auth.signInWithOtp({ email, options:{ emailRedirectTo: location.origin + location.pathname } });
  api.logout   = async ()=>{ try{ await sb.auth.signOut(); }catch(e){} };
  api.push     = ()=>{ if(!uid) return; clearTimeout(pushTimer); pushTimer=setTimeout(()=>doPush(sb,uid), 1500); };

  function setSession(s){
    api.session=s; uid = s ? s.user.id : null;
    try{ if(s) localStorage.setItem('sigEmail', s.user.email); else localStorage.removeItem('sigEmail'); }catch(e){}
    window.dispatchEvent(new CustomEvent('bsync:auth',{ detail:{ session:s } }));
  }

  try{
    const { data:{ session } } = await sb.auth.getSession();
    setSession(session);
    api.ready=true; window.dispatchEvent(new Event('bsync:ready'));
    if(session) await pullMerge(sb, session.user.id);
  }catch(e){ console.warn('[sync] init', e); api.ready=true; }

  sb.auth.onAuthStateChange(async (ev, s)=>{
    const wasId = uid;
    setSession(s);
    if(s && s.user.id!==wasId && (ev==='SIGNED_IN'||ev==='INITIAL_SESSION'||ev==='TOKEN_REFRESHED')){
      await pullMerge(sb, s.user.id);
    }
  });
}

// ---------- merge helpers ----------
function parseJSON(s,f){ try{ return s!=null?JSON.parse(s):f; }catch(e){ return f; } }
function localBlob(){ const o={}; for(const k of SYNC_KEYS){ const v=localStorage.getItem(k); if(v!=null) o[k]=v; } return o; }

// mood journal: รวมตามวันที่ — entry ที่ timestamp ใหม่กว่าชนะ (ไม่หายทั้งสองฝั่ง)
function mergeMood(a,b){
  const out={...(a||{})}, B=b||{};
  for(const d in B){ const cur=out[d], nw=B[d];
    if(!cur || (((nw&&nw.t)||0) >= ((cur&&cur.t)||0))) out[d]=nw; }
  return out;
}
// golden record: เลือกฉบับที่วันที่ใหม่กว่า
function newerGR(localStr, remoteStr){
  const L=parseJSON(localStr,null), R=parseJSON(remoteStr,null);
  if(!L) return remoteStr; if(!R) return localStr;
  return ((Date.parse(R.date)||0) > (Date.parse(L.date)||0)) ? remoteStr : localStr;
}
function mergeBlobs(local, remote){
  const out={...local};
  // ตัวตน (Signal): ใช้ของ cloud เป็นหลัก เพื่อคงตัวตนเดียวกันทุกเครื่อง
  for(const k of ['resonanceSignal','sigCreated']) if(remote[k]!=null) out[k]=remote[k];
  // mood journal
  if(local.moodJournal || remote.moodJournal)
    out.moodJournal = JSON.stringify(mergeMood(parseJSON(local.moodJournal,{}), parseJSON(remote.moodJournal,{})));
  // golden record (+ craftMsgDate ตามฉบับที่ชนะ)
  if(local.goldenRecord || remote.goldenRecord){
    out.goldenRecord = newerGR(local.goldenRecord, remote.goldenRecord);
    if(out.goldenRecord===remote.goldenRecord && remote.craftMsgDate!=null) out.craftMsgDate=remote.craftMsgDate;
  }
  // ชื่อดาว: รวมจากทั้งสองเครื่อง (union) — ชื่อที่ตั้งไว้ไม่หาย, ของ local ชนะถ้าซ้ำคีย์
  if(local.memoryStarNames || remote.memoryStarNames)
    out.memoryStarNames = JSON.stringify({...parseJSON(remote.memoryStarNames,{}), ...parseJSON(local.memoryStarNames,{})});
  // เติม key ที่มีเฉพาะฝั่ง cloud
  for(const k of SYNC_KEYS) if(out[k]==null && remote[k]!=null) out[k]=remote[k];
  return out;
}

async function pullMerge(sb, uid){
  try{
    const { data, error } = await sb.from('profiles').select('data').eq('id', uid).maybeSingle();
    if(error){ console.warn('[sync] pull', error.message); return; }
    const remote = (data && data.data) || {};
    const merged = mergeBlobs(localBlob(), remote);
    for(const k of SYNC_KEYS){ if(merged[k]!=null){ try{ localStorage.setItem(k, merged[k]); }catch(e){} } }
    await sb.from('profiles').upsert({ id:uid, data:merged, updated_at:new Date().toISOString() });
    window.dispatchEvent(new Event('bsync:pulled'));
  }catch(e){ console.warn('[sync] pullMerge', e); }
}
async function doPush(sb, uid){
  try{ await sb.from('profiles').upsert({ id:uid, data:localBlob(), updated_at:new Date().toISOString() }); }
  catch(e){ console.warn('[sync] push', e); }
}
