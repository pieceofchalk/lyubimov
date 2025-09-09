import { I18N } from './i18n.js';
const qs=(s,e=document)=>e.querySelector(s), qsa=(s,e=document)=>[...e.querySelectorAll(s)];
function setLang(lang){ if(!I18N[lang]) lang='es'; localStorage.setItem('lang',lang); document.documentElement.lang=lang;
  qsa('[data-i18n]').forEach(n=>{ let v=I18N[lang]; for(const p of n.dataset.i18n.split('.')){ v=v?.[p]; } if(typeof v==='string') n.textContent=v; });
  const file=(location.pathname.split('/').pop()||'index.html'); const M=I18N[lang].meta; document.title = (file==='services.html'?M.titleServices:file==='contact.html'?M.titleContact:M.titleHome);
  const meta=qs('meta[name=description]'); if(meta) meta.setAttribute('content', M.desc);
  qsa('nav a[data-page]').forEach(a=>a.classList.toggle('current', a.dataset.page===file));
  qsa('.lang a').forEach(a=>a.classList.toggle('active', a.dataset.lang===lang));
}
function initLang(){ setLang(localStorage.getItem('lang')||'es'); qsa('.lang a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); setLang(a.dataset.lang)})); }
function initCookieBar(){ if(localStorage.getItem('cookieConsent')) return; const b=document.createElement('div'); b.style.cssText='position:fixed;left:0;right:0;bottom:0;padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:space-between;background:rgba(0,0,0,.85);color:#fff;z-index:9999';
  const t=document.createElement('div'); t.dataset.i18n='cookieBar.text'; const a=document.createElement('div');
  const ok=document.createElement('button'); ok.className='btn'; ok.dataset.i18n='cookieBar.accept';
  const no=document.createElement('button'); no.className='btn secondary'; no.style.color='#fff'; no.style.borderColor='#fff'; no.dataset.i18n='cookieBar.reject';
  a.append(ok,no); b.append(t,a); document.body.append(b);
  const save=v=>{localStorage.setItem('cookieConsent',v); b.remove();};
  ok.addEventListener('click',()=>save('accepted')); no.addEventListener('click',()=>save('rejected'));
  const lang=localStorage.getItem('lang')||'es'; [t,ok,no].forEach(n=>{ let v=I18N[lang]; for(const p of n.dataset.i18n.split('.')) v=v?.[p]; if(typeof v==='string') n.textContent=v; });
}
function initContactForm(){ const form=document.getElementById('contact-form'); if(!form) return; 
  form.addEventListener('submit',e=>{ e.preventDefault(); const name=form.name.value, email=form.email.value, message=form.message.value;
    const subject=`Consulta de ${name}`; const body=`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    const mailtoLink=`mailto:mitya.lyubimov@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try to open mailto, if it fails show fallback
    try { location.href=mailtoLink; } catch(e) { showMailtoFallback(mailtoLink); }
    
    // Show fallback after 2 seconds if user is still on page (indicates mailto didn't work)
    setTimeout(()=>{ if(document.getElementById('contact-form')) showMailtoFallback(mailtoLink); }, 2000);
  }); }

function showMailtoFallback(mailtoLink){ const fallback=document.getElementById('mailto-fallback');
  if(fallback){ fallback.style.display='block'; document.getElementById('mailto-link').href=mailtoLink; } }
document.addEventListener('DOMContentLoaded', ()=>{ initLang(); initCookieBar(); initContactForm(); });
