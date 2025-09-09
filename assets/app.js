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
// Fallback with FULL service descriptions
if(!window.I18N) {
  window.I18N = {"es":{"meta":{"titleHome":"Dmitry Lyubimov — Servicios tecnológicos","titleServices":"Servicios — Dmitry Lyubimov","titleContact":"Contacto — Dmitry Lyubimov","titleAbout":"Sobre mí — Dmitry Lyubimov","desc":"Soluciones tecnológicas claras y mantenibles para pequeñas empresas y profesionales."},"nav":{"home":"Inicio","about":"Sobre mí","services":"Servicios","contact":"Contacto"},"hero":{"title":"Soluciones tecnológicas claras y mantenibles","subtitle":"Webs sencillas, herramientas bien configuradas y datos que ayudan a decidir.","ctaServices":"Ver servicios","ctaContact":"Contactar"},"services":{"title":"Servicios","intro":"Ayudo a pequeñas empresas y profesionales a disponer de tecnología simple, fiable y útil para el negocio.","basic":{"title":"Servicios básicos para empresas locales"},"cards":[{"title":"Creación de página web básica","text":"Sitio informativo sencillo con estructura clara, diseño adaptable a móvil y contenidos editables."},{"title":"Configuración de correo y oficina en la nube","text":"Alta y puesta a punto de cuentas, dominios y almacenamiento. Formación básica para el equipo."},{"title":"Consultoría tecnológica y datos (avanzado)","text":"Diseño de procesos de información, integración entre sistemas y automatizaciones orientadas a negocio."},{"title":"Mantenimiento técnico mensual","text":"Actualizaciones, copias de seguridad, revisión de seguridad y soporte continuo."},{"title":"Informes de gestión","text":"Tableros e informes claros (ventas, reservas, proyectos) para decidir con datos fiables."},{"title":"Plataformas de datos y procesos","text":"Organización de la información de la empresa para que sea fiable, actualizada e integrada."}],"advanced":{"title":"Servicios avanzados de consultoría y datos","intro":"Para empresas que requieren soluciones complejas de datos, infraestructura cloud y procesos automatizados a nivel empresarial.","cards":[{"title":"Consultoría y arquitectura de plataformas de datos","text":"Diseño e implementación de Data Warehouses y Data Lakes. Modelado de datos orientado a negocio (star schema, data vault). Estrategias de snapshotting, calidad de datos, gobierno de datos."},{"title":"Procesamiento de datos y automatización","text":"Creación de pipelines de datos escalables (ingesta, transformación, carga). Orquestación de procesos con Airflow/Dagster. Integración de múltiples fuentes (APIs de marketing, sistemas internos, IoT)."}]}},"contact":{"title":"Contacto","p1":"Escríbeme y responderé en 1–2 días laborables.","name":"Nombre","email":"Correo electrónico","message":"Mensaje","send":"Enviar","gdpr":"Al enviar, aceptas nuestra Política de privacidad.","alt":"O contacta directamente:","success":"¡Mensaje enviado con éxito! Te responderé en 1-2 días laborables.","error":"Error al enviar el mensaje. Intenta nuevamente o contacta directamente."},"footer":{"copyright":"© 2025 Dmitry Lyubimov — Barcelona","privacy":"Política de privacidad","legal":"Aviso legal","cookies":"Política de cookies","linkedin":"LinkedIn"},"cookieBar":{"text":"Este sitio utiliza solo cookies técnicas para recordar tu idioma. Puedes aceptar o rechazar.","accept":"Aceptar","reject":"Rechazar"}}};
}

document.addEventListener('DOMContentLoaded', ()=>{ initLang(); initCookieBar(); initContactForm(); });
