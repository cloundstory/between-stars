/* warp.js — เอฟเฟกต์ "วาร์ปทะลุดวงดาว" ตอนเปลี่ยนหน้า (ใช้ร่วมกัน solar-system.html + space-history.html)
   คลิกลิงก์ภายใน → เร่งความเร็วดาวเป็นเส้น + แฟลช แล้วค่อยเปลี่ยนหน้า
   หน้าใหม่ที่โหลดมาจากวาร์ป → ดาวพุ่งชะลอตัวแล้วเฟดเผยหน้า */
(function(){
  var INTERNAL=/(^|\/)(solar-system|space-history)\.html(\?|#|$)/;

  function makeCanvas(){
    var c=document.getElementById('__warpfx');
    if(c) return c;
    c=document.createElement('canvas');c.id='__warpfx';
    c.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:2147483646;pointer-events:none;opacity:0;transition:opacity .3s ease';
    (document.body||document.documentElement).appendChild(c);
    return c;
  }

  function run(mode,done){
    var c=makeCanvas(),x=c.getContext('2d'),W,H,cx,cy,max;
    function rs(){W=c.width=innerWidth;H=c.height=innerHeight;cx=W/2;cy=H/2;max=Math.hypot(W,H)/2+50;}
    rs();addEventListener('resize',rs);
    var N=Math.min(340,Math.round(W*H/6000)),st=[],i;
    for(i=0;i<N;i++){var a=Math.random()*6.2832,r=Math.random()*max*0.7+8;st.push({a:a,r:r,pr:r});}
    c.style.opacity='1';
    if(mode==='in'){x.fillStyle='#04060d';x.fillRect(0,0,W,H);}
    var t0=performance.now(),dur=(mode==='out')?780:980;
    function frame(now){
      var e=Math.min(1,(now-t0)/dur);
      var k=(mode==='out')?(0.02+e*e*0.44):(0.36*(1-e)*(1-e)+0.012);
      x.fillStyle=(mode==='out')?('rgba(4,6,13,'+(0.16+0.10*e)+')'):('rgba(4,6,13,'+(0.14+0.20*(1-e))+')');
      x.fillRect(0,0,W,H);
      x.lineCap='round';
      for(var j=0;j<st.length;j++){var s=st[j];s.pr=s.r;s.r+=s.r*k+((mode==='out')?e*9:0);
        if(s.r>max){s.r=8;s.pr=8;}
        var ca=Math.cos(s.a),sa=Math.sin(s.a),al=Math.min(1,s.r/max*1.35);
        x.strokeStyle='rgba(212,228,255,'+al+')';
        x.lineWidth=Math.min(2.6,s.r/max*3+0.4);
        x.beginPath();x.moveTo(cx+ca*s.pr,cy+sa*s.pr);x.lineTo(cx+ca*s.r,cy+sa*s.r);x.stroke();
      }
      if(mode==='out'&&e>0.62){var w=(e-0.62)/0.38;x.fillStyle='rgba(245,233,212,'+(w*0.96)+')';x.fillRect(0,0,W,H);}
      if(e<1){requestAnimationFrame(frame);}
      else{removeEventListener('resize',rs);
        if(mode==='in'){c.style.opacity='0';setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c);},480);}
        if(done)done();
      }
    }
    requestAnimationFrame(frame);
  }

  function go(href){
    try{sessionStorage.setItem('__warp','1');}catch(e){}
    var navd=false,nav=function(){if(!navd){navd=true;location.href=href;}};
    run('out',nav);
    setTimeout(nav,1100); // safety เผื่อ rAF ไม่วิ่ง
  }

  addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest?e.target.closest('a[href]'):null;
    if(!a)return;
    if(a.target&&a.target!=='_self')return;
    var href=a.getAttribute('href')||'';
    if(INTERNAL.test(href)){e.preventDefault();go(href);}
  },true);

  function maybeWarpIn(){
    var f=false;try{f=sessionStorage.getItem('__warp')==='1';}catch(e){}
    if(f){try{sessionStorage.removeItem('__warp');}catch(e){}run('in');}
  }
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',maybeWarpIn);
  else maybeWarpIn();
})();
