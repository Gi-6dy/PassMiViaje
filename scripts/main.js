// Minimal JS: menú móvil, tema, carousel
(function(){
  const $ = (sel) => document.querySelector(sel);
  const byAll = (sel) => Array.from(document.querySelectorAll(sel));

  // Year stamps
  const yEls = byAll('#y');
  yEls.forEach(el => el.textContent = new Date().getFullYear());

  // Mobile menu
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const hidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!hidden));
    });
  }

  // Theme toggle
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', mode);
    if (themeIcon) themeIcon.textContent = mode === 'dark' ? '☀️' : '🌙';
  };
  const preferred = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferred);
  themeToggle?.addEventListener('click', () => {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  });

  // Carousel
  const track = $('#carouselTrack');
  const imgs = track ? track.querySelectorAll('img') : [];
  const dots = $('#carouselDots');
  let idx = 0;
  function renderDots(){
    if (!dots) return;
    dots.innerHTML = '';
    imgs.forEach((_, i)=>{
      const b = document.createElement('button');
      b.className = 'w-2.5 h-2.5 rounded-full border border-slate-400' + (i===idx ? ' bg-slate-600' : ' bg-transparent');
      b.setAttribute('aria-label', 'Ir a diapositiva ' + (i+1));
      b.addEventListener('click', ()=>{ idx=i; update(); });
      dots.appendChild(b);
    });
  }
  function update(){
    if (!track) return;
    track.style.transform = `translateX(-${idx*100}%)`;
    renderDots();
  }
  byAll('[data-carousel="prev"]').forEach(btn=>btn.addEventListener('click', ()=>{ idx = (idx - 1 + imgs.length) % imgs.length; update(); }));
  byAll('[data-carousel="next"]').forEach(btn=>btn.addEventListener('click', ()=>{ idx = (idx + 1) % imgs.length; update(); }));
  if (imgs.length) update();
})();
