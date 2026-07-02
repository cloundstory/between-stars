// ============================================================
//  Between Stars · js/util.js — helper กลางที่หลายฟีเจอร์ใช้ร่วมกัน
// ============================================================
export function genId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
export function todayStr(){return new Date().toISOString().slice(0,10);}
export function checkDailyLimit(key){return localStorage.getItem(key)===todayStr();}
export function setDailyLimit(key){localStorage.setItem(key,todayStr());}
export function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
