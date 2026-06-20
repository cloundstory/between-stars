// ============================================================
//  Between Stars · Analytics  (first-party, no cookies, no SDK)
//  เก็บแบบนิรนามล้วน — ไม่มี third-party, ไม่เก็บข้อมูลส่วนตัว
//  pageview: หน้า, โดเมนต้นทาง, รหัสสุ่ม, ชนิดเครื่อง(หยาบ), ภาษา, ผู้เข้าใหม่ไหม
//  event:    ชื่อการกระทำเท่านั้น (ไม่มีเนื้อหาที่ผู้ใช้เขียน)
//  ** ไม่เก็บ: IP, query string, ขนาดจอ exact, และไม่ผูกกับ uid ที่ล็อกอิน **
//  ปล่อยค่าว่าง = ไม่ทำอะไร
// ============================================================
(function(){
  const SUPABASE_URL  = 'https://isiqrzcywrzwpynfgmam.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaXFyemN5d3J6d3B5bmZnbWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTA4MjQsImV4cCI6MjA5NzQyNjgyNH0.-kwWj13ScY_wTY8tfFVOoRe_hm1gpva-j301N_woQhs';
  if(!SUPABASE_URL || !SUPABASE_ANON) return;

  const HEADERS = {
    'apikey': SUPABASE_ANON,
    'Authorization': 'Bearer ' + SUPABASE_ANON,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
  function post(table, body){
    try{
      fetch(SUPABASE_URL + '/rest/v1/' + table, {
        method:'POST', headers:HEADERS, body:JSON.stringify(body), keepalive:true
      }).catch(()=>{});
    }catch(e){}
  }

  // รหัสผู้เข้าชมสุ่มนิรนาม + ตรวจว่าเป็นเครื่องที่เพิ่งมาครั้งแรกไหม (ไม่ใช่คุกกี้)
  let vid = null, isNew = false;
  try{
    vid = localStorage.getItem('bsVisitor');
    if(!vid){
      vid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (String(Date.now()) + Math.random());
      localStorage.setItem('bsVisitor', vid);
      isNew = true;   // เครื่องนี้ไม่เคยมีรหัสมาก่อน = ผู้เข้าชมใหม่
    }
  }catch(e){}

  // ชนิดเครื่องแบบหยาบ (กัน fingerprint — ไม่เก็บขนาดจอจริง)
  const vw = window.innerWidth || 0;
  const device = !vw ? '' : (vw <= 640 ? 'mobile' : (vw <= 1024 ? 'tablet' : 'desktop'));
  // ภาษาหลักของเบราว์เซอร์ (2 ตัวอักษร — entropy ต่ำ)
  let lang = '';
  try{ lang = ((navigator.language || '').toLowerCase().slice(0,2)) || ''; }catch(e){}

  const path = location.pathname || '/';   // เก็บเฉพาะ path — ไม่เอา query/hash (อาจมี token)
  let ref = '';
  try{ ref = document.referrer ? new URL(document.referrer).hostname : ''; }catch(e){}
  if(ref === location.hostname) ref = '';

  // ── Event API สาธารณะ: window.bsEvent('ชื่อ') — เก็บแค่ชื่อ ไม่มีเนื้อหา ──
  window.bsEvent = function(name, val){
    if(!name) return;
    post('events', {
      vid,
      name: String(name).slice(0, 40),
      path,
      val: (typeof val === 'number' && isFinite(val)) ? Math.round(val) : null
    });
  };

  // ── Pageview: กันนับซ้ำตอน refresh รัวๆ — นับหน้าเดิมครั้งเดียวต่อ session ──
  let counted = false;
  try{
    if(sessionStorage.getItem('bsSeen') !== path){ sessionStorage.setItem('bsSeen', path); counted = true; }
  }catch(e){ counted = true; }

  function sendPV(){ post('page_views', { path, ref, vid, device, lang, is_new: isNew }); }
  if(counted){
    if('requestIdleCallback' in window) requestIdleCallback(sendPV, { timeout:2500 });
    else setTimeout(sendPV, 1200);

    // ── เวลาที่อยู่บนหน้า: ส่งครั้งเดียวตอนออก/สลับแท็บ (เก็บแค่จำนวนวินาที) ──
    const t0 = Date.now();
    let dwellSent = false;
    const flushDwell = ()=>{
      if(dwellSent) return; dwellSent = true;
      const sec = Math.round((Date.now() - t0) / 1000);
      if(sec >= 2 && sec <= 3600) window.bsEvent('_dwell', sec);   // ตัดค่าผิดปกติทิ้ง
    };
    document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState === 'hidden') flushDwell(); });
    window.addEventListener('pagehide', flushDwell);
  }
})();
