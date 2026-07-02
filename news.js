// ============================================================
//  Between Stars · What's New / บันทึกการเดินทาง  (shared: index + app)
//  เพิ่มข่าวใหม่ = ใส่รายการไว้บนสุดของ NEWS (id ใหม่ → คนที่เคยอ่านเห็นจุดเตือนอีกครั้ง)
//  ใช้ในหน้าไหนก็ได้: <script src="news.js"></script>
//    + ลิงก์เปิด: onclick="openNews()"  (ใส่ <span data-news-label></span> ให้ตั้งชื่อตามภาษา)
//    + จุดเตือน:  <span data-news-dot></span>
// ============================================================
(function(){
  var LANG=(function(){try{var q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='th')return q;var s=localStorage.getItem('lang');if(s==='en'||s==='th')return s;}catch(e){}return (navigator.language||'').toLowerCase().indexOf('th')===0?'th':'en';})();
  var en=(LANG==='en');

  var NEWS=[
    {id:'2026-07-02', d:{th:'2 ก.ค. 2026',en:'2 Jul 2026'},
     th:{t:'วันเกิดบนดาวดวงอื่น · ระยะทางระหว่างเรา',d:'Chronos Lens ทำได้มากขึ้น — ดูว่าคุณอายุเท่าไหร่บนดาวอังคาร เพิ่มวันเกิดดาวลงปฏิทิน และวัดว่าระหว่างสองวันของเรา ฟ้าเคลื่อนไปแค่ไหน'},
     en:{t:'Planet birthdays · the space between us',d:'Chronos Lens grows — see your age on Mars, add planet birthdays to your calendar, and measure how far the sky has moved between two days that matter.'}},
    {id:'2026-06-26', d:{th:'26 มิ.ย. 2026',en:'26 Jun 2026'},
     th:{t:'คำฝากถึงกันได้แล้ว',d:'คำฝากที่คุณฝากไว้กับดวงดาว เริ่มลอยไปถึงคนอื่นจริง ๆ — ถ้ามีใครเขียนตอบ คุณจะได้เห็นมันใน SIGNAL ของคุณ'},
     en:{t:'Letters that reach others',d:'The คำฝาก you leave with the stars now drift to real people — and if someone writes back, you’ll find it in your SIGNAL.'}},
    {id:'2026-06-24', d:{th:'24 มิ.ย. 2026',en:'24 Jun 2026'},
     th:{t:'ทั้งเว็บมีภาษาอังกฤษแล้ว',d:'สลับ ไทย/อังกฤษ ได้จากปุ่มมุมขวาบน — ครบทุกหน้า ทั้งการสำรวจและการใคร่ครวญ'},
     en:{t:'The whole site is now bilingual',d:'Switch Thai / English from the top-right — every page, explore and contemplate alike.'}},
    {id:'2026-06-22', d:{th:'22 มิ.ย. 2026',en:'22 Jun 2026'},
     th:{t:'ดาวที่เกิดจากใจคุณ',d:'บันทึกห้วงใจต่อเนื่อง แล้วเฝ้าดูบางบันทึกก่อตัวเป็นดาวที่โคจรรอบดาวของคุณเอง'},
     en:{t:'Stars born from your heart',d:'Keep writing your Inner Space, and watch some entries form into stars that orbit your own.'}},
    {id:'2026-06-20', d:{th:'มิ.ย. 2026',en:'Jun 2026'},
     th:{t:'เสียงดาววันนี้ · ดวงในวันเกิด',d:'แตะดวงที่ใจถูกดึงไปหา รับคำใคร่ครวญประจำวัน · และเก็บภาพจักรวาลในวันเกิดคุณไว้แชร์'},
     en:{t:'Star Echo · the sky on your birthday',d:'Tap the star your heart is drawn to for a daily reflection · and capture the universe on your birthday to share.'}}
  ];

  function esc(s){return String(s).replace(/[&<>]/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;'})[c];});}
  var latest=NEWS.length?NEWS[0].id:'';
  function seen(){try{return localStorage.getItem('newsSeen')||'';}catch(e){return'';}}

  function injectOnce(){
    if(document.getElementById('bsNewsModal'))return;
    var css=''+
      '.bsnews-modal{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:24px}'+
      '.bsnews-modal.on{display:flex}'+
      '.bsnews-card{position:relative;width:100%;max-width:480px;max-height:86vh;overflow-y:auto;background:rgba(10,12,22,.98);border:1px solid rgba(243,201,122,.16);border-radius:18px;padding:34px 30px;font-family:"Noto Sans Thai","Space Grotesk",sans-serif}'+
      '.bsnews-x{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,.3);font-size:22px;cursor:pointer}'+
      '.bsnews-x:hover{color:#fff}'+
      '.bsnews-pre{font-family:"Space Grotesk",sans-serif;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:rgba(243,201,122,.5)}'+
      '.bsnews-title{font-size:26px;font-weight:300;color:#eef2fb;margin:8px 0 6px}'+
      '.bsnews-item{padding:16px 0;border-bottom:1px solid rgba(255,255,255,.07)}'+
      '.bsnews-item:last-child{border-bottom:none}'+
      '.bsnews-date{font-family:"Space Grotesk",sans-serif;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(243,201,122,.55)}'+
      '.bsnews-t{font-size:16px;font-weight:500;color:#eef2fb;margin:5px 0 4px}'+
      '.bsnews-d{font-size:13.5px;line-height:1.8;color:rgba(238,242,251,.62)}'+
      '[data-news-dot]{display:none;width:6px;height:6px;border-radius:50%;background:#f3c97a;margin-left:6px;vertical-align:middle;box-shadow:0 0 7px rgba(243,201,122,.7)}';
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var m=document.createElement('div');m.id='bsNewsModal';m.className='bsnews-modal';
    m.innerHTML='<div class="bsnews-card"><button class="bsnews-x" type="button" aria-label="close">×</button><div class="bsnews-pre"></div><div class="bsnews-title"></div><div class="bsnews-list"></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click',function(e){if(e.target===m)close();});
    m.querySelector('.bsnews-x').onclick=close;
  }
  function render(){
    var list=document.querySelector('#bsNewsModal .bsnews-list');if(!list)return;
    list.innerHTML=NEWS.map(function(n){var c=en?n.en:n.th;
      return '<div class="bsnews-item"><div class="bsnews-date">'+esc(en?n.d.en:n.d.th)+'</div><div class="bsnews-t">'+esc(c.t)+'</div><div class="bsnews-d">'+esc(c.d)+'</div></div>';
    }).join('');
    document.querySelector('#bsNewsModal .bsnews-pre').textContent=en?'Journey log':'บันทึกการเดินทาง';
    document.querySelector('#bsNewsModal .bsnews-title').textContent=en?'What’s new':'มีอะไรใหม่';
  }
  function updateDot(){var on=!!latest&&seen()!==latest;
    var dots=document.querySelectorAll('[data-news-dot]');for(var i=0;i<dots.length;i++)dots[i].style.display=on?'inline-block':'none';}
  function setLabels(){var els=document.querySelectorAll('[data-news-label]');for(var i=0;i<els.length;i++)els[i].textContent=en?'What’s new':'มีอะไรใหม่';}
  function close(){var m=document.getElementById('bsNewsModal');if(m)m.classList.remove('on');}

  window.openNews=function(){injectOnce();render();try{localStorage.setItem('newsSeen',latest);}catch(e){}updateDot();
    document.getElementById('bsNewsModal').classList.add('on');};

  function init(){injectOnce();setLabels();updateDot();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();
