// Ano no footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Efeito reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Parallax hero
const hero = document.querySelector('.hero');
if (hero){
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    hero.style.backgroundPosition = `center ${Math.min(0, -y*0.1)}px`;
  };
  document.addEventListener('scroll', onScroll, { passive:true });
}

// Ripple em botões
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    r.style.left = (e.clientX - rect.left - 90) + 'px';
    r.style.top  = (e.clientY - rect.top - 90) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

 // Contadores com prefixo/sufixo (ex: 400+, 48h)
 const counters = document.querySelectorAll('.num [data-count]');
 const ioCount = new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if (!entry.isIntersecting) return;
     const el = entry.target;
     const target = parseInt(el.dataset.count,10) || 0;
     const dur = parseInt(el.dataset.duration,10) || 1200;
     const prefix = el.dataset.prefix || "";
     const suffix = el.dataset.suffix || "";

     const start = performance.now();
     const from = 0;
     const tick = (t)=>{
       const p = Math.min(1, (t-start)/dur);
       const val = Math.floor(from + (target-from)*p);
       el.textContent = `${prefix}${val.toLocaleString('pt-BR')}${p>=1 ? suffix : ""}`;
       if (p<1) requestAnimationFrame(tick);
     };
     requestAnimationFrame(tick);
     ioCount.unobserve(el);
   });
 }, {threshold:.6});
 counters.forEach(el=>ioCount.observe(el));

// Form -> WhatsApp
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = new FormData(form);
  const nome = encodeURIComponent(data.get('nome')||'');
  const tel  = encodeURIComponent(data.get('telefone')||'');
  const serv = encodeURIComponent(data.get('servico')||'');
  const msg  = encodeURIComponent(data.get('mensagem')||'');
  const texto = `Olá, sou ${nome}. Telefone: ${tel}. Serviço: ${serv}. Mensagem: ${msg}`;
  window.open(`https://wa.me/5511985264625?text=${texto}`, '_blank', 'noopener,noreferrer');
});