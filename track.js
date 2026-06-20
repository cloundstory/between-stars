// ============================================================
//  Between Stars · Pageview Counter  (first-party, no cookies, no SDK)
//  นับยอดเข้าชมเองผ่าน Supabase REST — ไม่มี third-party, ไม่เก็บข้อมูลส่วนตัว
//  เก็บแค่: หน้าที่เปิด (pathname), โดเมนที่ส่งต่อมา, รหัสสุ่มนิรนาม
//  ปล่อยค่าว่าง = ไม่ทำอะไร (เว็บทำงานปกติ)
// ============================================================
(function(){
  const SUPABASE_URL  = 'https://isiqrzcywrzwpynfgmam.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaXFyemN5d3J6d3B5bmZnbWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTA4MjQsImV4cCI6MjA5NzQyNjgyNH0.-kwWj13ScY_wTY8tfFVOoRe_hm1gpva-j301N_woQhs';
  if(!SUPABASE_URL || !SUPABASE_ANON) return;

  // รหัสผู้เข้าชมแบบสุ่มนิรนาม — ใช้นับ "เครื่องที่ไม่ซ้ำ" โดยไม่ผูกกับตัวตน (ไม่ใช่คุกกี้)
  let vid;
  try{
    vid = localStorage.getItem('bsVisitor');
    if(!vid){ vid = (crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random()); localStorage.setItem('bsVisitor', vid); }
  }catch(e){ vid = null; }

  // กันนับซ้ำตอน refresh รัวๆ ในแท็บเดียว: นับหน้าเดิมแค่ครั้งเดียวต่อ session
  const path = location.pathname || '/';
  try{
    const seen = sessionStorage.getItem('bsSeen');
    if(seen === path) return;       // หน้านี้เพิ่งนับไปใน session นี้แล้ว
    sessionStorage.setItem('bsSeen', path);
  }catch(e){}

  // โดเมนต้นทางที่ส่งต่อมา (เก็บแค่ host ไม่เก็บ path/พารามิเตอร์ เพื่อเลี่ยงข้อมูลอ่อนไหว)
  let ref = '';
  try{ ref = document.referrer ? new URL(document.referrer).hostname : ''; }catch(e){}
  if(ref === location.hostname) ref = '';   // เดินภายในเว็บเราเอง ไม่นับเป็นที่มา

  const send = ()=>{
    try{
      fetch(SUPABASE_URL + '/rest/v1/page_views', {
        method:'POST',
        headers:{
          'apikey': SUPABASE_ANON,
          'Authorization': 'Bearer ' + SUPABASE_ANON,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ path, ref, vid }),
        keepalive: true            // ส่งให้จบแม้ผู้ใช้ปิดหน้าเร็ว
      }).catch(()=>{});
    }catch(e){}
  };

  // ยิงตอน idle เพื่อไม่แย่งทรัพยากรช่วงโหลดหน้า
  if('requestIdleCallback' in window) requestIdleCallback(send, { timeout:2500 });
  else setTimeout(send, 1200);
})();
