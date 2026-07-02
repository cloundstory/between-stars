// ============================================================
//  Between Stars · js/i18n.js — ภาษา (TH หลักใน HTML, EN เสริมทับ)
//  export: LANG (th|en), L(en,th), applyUILang() — ย้ายจาก app.js (เฟส 2)
// ============================================================
import {UI_EN} from '../data/i18n-ui.js';

// ── language (TH primary in HTML; EN additive). Hoisted to top so early code can read LANG without TDZ. ──
export const LANG=(()=>{try{const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='th'){localStorage.setItem('lang',q);return q;} // persist ?lang so sub-page links (credits/privacy) inherit it
  const s=localStorage.getItem('lang');if(s==='en'||s==='th')return s;}catch(e){}
  return (navigator.language||'').toLowerCase().startsWith('th')?'th':'en';})();
export function applyUILang(){
  if(LANG!=='en')return; // TH = HTML stays as authored → zero regression for Thai users
  document.querySelectorAll('[data-i18n]').forEach(el=>{const v=UI_EN[el.dataset.i18n];if(v!=null)el.textContent=v;});
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const v=UI_EN[el.dataset.i18nPh];if(v!=null)el.placeholder=v;});
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{const v=UI_EN[el.dataset.i18nTitle];if(v!=null)el.title=v;});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{const v=UI_EN[el.dataset.i18nHtml];if(v!=null)el.innerHTML=v;}); // only for our own EN strings, never user input
}
// shorthand for JS-built strings: pick EN or TH by current LANG
export const L=(en,th)=>LANG==='en'?en:th;
// EN document metadata (tab title, description, <html lang>, OG) — helps bookmarks, screen readers,
// and JS-aware preview tools. NOTE: static crawlers fetching ?lang=en still see the Thai OG (no SSR).
(function(){if(LANG!=='en')return;try{
  document.documentElement.lang='en';
  document.title='The Solar System · Between Stars';
  const desc='An interactive Solar System — planets moving with today’s real positions. Find eclipses and follow Voyager into the deep between stars.';
  const set=(sel,val)=>{const m=document.querySelector(sel);if(m)m.setAttribute('content',val);};
  set('meta[name="description"]',desc);
  set('meta[property="og:title"]','The Solar System · Between Stars');
  set('meta[property="og:description"]','Planets moving with today’s real positions · follow Voyager into the deep between stars');
  set('meta[property="og:site_name"]','Between Stars · ห้วงดาว');
  set('meta[property="og:locale"]','en_US');
  set('meta[property="og:url"]','https://between-stars.vercel.app/solar-system.html?lang=en');
}catch(e){}})();
