// I18N will be loaded from i18n.js as window.I18N
const qs=(s,e=document)=>e.querySelector(s), qsa=(s,e=document)=>[...e.querySelectorAll(s)];
function setLang(lang){ if(!window.I18N || !window.I18N[lang]) lang='es'; if(!window.I18N) return; localStorage.setItem('lang',lang); document.documentElement.lang=lang;
  qsa('[data-i18n]').forEach(n=>{ let v=window.I18N[lang]; for(const p of n.dataset.i18n.split('.')){ v=v?.[p]; } if(typeof v==='string') n.textContent=v; });
  const file=(location.pathname.split('/').pop()||'index.html'); const M=window.I18N[lang].meta; if(M) document.title = (file==='services.html'?M.titleServices:file==='contact.html'?M.titleContact:file==='about.html'?M.titleAbout:M.titleHome);
  const meta=qs('meta[name=description]'); if(meta && M.desc) meta.setAttribute('content', M.desc);
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
  const lang=localStorage.getItem('lang')||'es'; if(window.I18N) [t,ok,no].forEach(n=>{ let v=window.I18N[lang]; for(const p of n.dataset.i18n.split('.')) v=v?.[p]; if(typeof v==='string') n.textContent=v; });
}
function initContactForm(){ const form=document.getElementById('contact-form'); if(!form) return; 
  
  // Check for success/error in URL params
  const urlParams=new URLSearchParams(window.location.search);
  if(urlParams.get('sent')==='true') showFormMessage('success');
  if(urlParams.get('error')==='true') showFormMessage('error');
  
  // Handle form submission
  form.addEventListener('submit',async e=>{
    const btn=form.querySelector('button[type="submit"]'); const originalText=btn.textContent;
    btn.disabled=true; btn.textContent='Enviando...';
    
    // Form will submit normally to Web3Forms
    // Success/error will be handled by redirect or by checking response
  }); }

function showFormMessage(type){ 
  const successEl=document.getElementById('form-success'); 
  const errorEl=document.getElementById('form-error');
  if(type==='success' && successEl) { successEl.style.display='block'; }
  if(type==='error' && errorEl) { errorEl.style.display='block'; } }
// Fallback if i18n fails to load
if(!window.I18N) {
  console.warn('I18N not loaded, adding fallback texts');
  window.I18N = {"es":{"services":{"basic":{"title":"Servicios básicos"},"advanced":{"title":"Servicios avanzados"},"cards":[{"title":"Web básica","text":"Sitio informativo sencillo"},{"title":"Email y nube","text":"Configuración de correo"},{"title":"Consultoría","text":"Datos y automatización"},{"title":"Mantenimiento","text":"Soporte técnico"},{"title":"Informes","text":"Dashboards y reportes"},{"title":"Plataformas","text":"Organización de datos"}],"advanced":{"cards":[{"title":"Arquitectura de datos","text":"Data Lakes y Warehouses"},{"title":"Pipelines","text":"Procesamiento escalable"}]}},"contact":{"title":"Contacto","name":"Nombre","email":"Email","message":"Mensaje","send":"Enviar"}}};
}

document.addEventListener('DOMContentLoaded', ()=>{ initLang(); initCookieBar(); initContactForm(); });
