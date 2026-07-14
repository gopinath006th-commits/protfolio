/* ============================================================
   GOPINATH G — PORTFOLIO MAIN SCRIPT
   ============================================================ */
(function(){
  "use strict";

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('gp-theme');
  if(savedTheme){ root.setAttribute('data-theme', savedTheme); }
  else{ root.setAttribute('data-theme','dark'); }

  const themeToggle = document.getElementById('themeToggle');
  themeToggle && themeToggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
    localStorage.setItem('gp-theme', current);
  });

  /* ---------- LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  const loaderPct = document.getElementById('loader-pct');
  let pct = 0;
  const pctTimer = setInterval(()=>{
    pct += Math.ceil(Math.random()*18);
    if(pct >= 100){ pct = 100; clearInterval(pctTimer); }
    if(loaderPct) loaderPct.textContent = pct + '%';
  }, 130);

  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      if(loader){ loader.classList.add('hide'); }
      document.body.classList.remove('no-scroll');
    }, 1400);
  });
  document.body.classList.add('no-scroll');
  // safety fallback in case load event is delayed
  setTimeout(()=>{
    if(loader && !loader.classList.contains('hide')){
      loader.classList.add('hide');
      document.body.classList.remove('no-scroll');
    }
  }, 3500);

  /* ---------- CUSTOM CURSOR ---------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  if(window.matchMedia('(hover:hover)').matches){
    window.addEventListener('mousemove', (e)=>{
      mouseX = e.clientX; mouseY = e.clientY;
      if(dot){ dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`; }
    });
    function animateRing(){
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if(ring){ ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`; }
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .project-card, .tool-chip, input, textarea').forEach(el=>{
      el.addEventListener('mouseenter', ()=> ring && ring.classList.add('active'));
      el.addEventListener('mouseleave', ()=> ring && ring.classList.remove('active'));
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if(progressBar) progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress);

  /* ---------- NAVBAR SCROLLED STATE ---------- */
  const navbar = document.getElementById('navbar');
  function updateNav(){
    if(window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  /* ---------- MOBILE NAV ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  burger && burger.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('[data-nav]').forEach(a=>{
    a.addEventListener('click', ()=> navLinks.classList.remove('open'));
  });

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop && backToTop.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });

  /* ---------- TYPING EFFECT (hero line) ---------- */
  const typeTarget = document.getElementById('typeTarget');
  const phrases = [
    'Full Stack Web Developer',
    'B.Sc Computer Science Student',
    'HTML · CSS · JavaScript · PHP',
    'Lifelong Learner & Builder'
  ];
  let pIndex = 0, cIndex = 0, deleting = false;
  function typeLoop(){
    if(!typeTarget) return;
    const current = phrases[pIndex];
    if(!deleting){
      cIndex++;
      typeTarget.textContent = current.slice(0, cIndex);
      if(cIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      cIndex--;
      typeTarget.textContent = current.slice(0, cIndex);
      if(cIndex === 0){
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 60);
  }
  typeLoop();

  /* ---------- EDITOR CODE TYPING (hero signature panel) ---------- */
  const editorTyped = document.getElementById('editorTyped');
  const editorLine = "console.log('Hello, World! 🚀');";
  let eIndex = 0;
  function editorLoop(){
    if(!editorTyped) return;
    if(eIndex <= editorLine.length){
      editorTyped.textContent = editorLine.slice(0, eIndex);
      eIndex++;
      setTimeout(editorLoop, 70);
    } else {
      setTimeout(()=>{ eIndex = 0; editorLoop(); }, 2200);
    }
  }
  setTimeout(editorLoop, 1600);

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el=> revealObserver.observe(el));

  /* ---------- SKILL PROGRESS BARS ---------- */
  const skillRows = document.querySelectorAll('.skill-row');
  const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const target = entry.target.getAttribute('data-skill');
        const fill = entry.target.querySelector('.skill-fill');
        if(fill) fill.style.width = target + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillRows.forEach(el=> skillObserver.observe(el));

  /* ---------- STATS COUNTER ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const duration = 1400;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;
        const timer = setInterval(()=>{
          current += increment;
          if(current >= target){
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, stepTime);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el=> counterObserver.observe(el));

  /* ---------- PROJECT FILTER + SEARCH ---------- */
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearch');
  const noResults = document.getElementById('noResults');
  let activeFilter = 'all';

  function applyFilters(){
    const query = (searchInput && searchInput.value || '').trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach(card=>{
      const cat = card.getAttribute('data-category');
      const name = card.getAttribute('data-name') || '';
      const matchesFilter = activeFilter === 'all' || cat === activeFilter;
      const matchesSearch = query === '' || name.includes(query);
      const show = matchesFilter && matchesSearch;
      card.style.display = show ? '' : 'none';
      if(show) visibleCount++;
    });
    if(noResults) noResults.classList.toggle('show', visibleCount === 0);
  }

  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=> c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });
  searchInput && searchInput.addEventListener('input', applyFilters);

  /* ---------- CONTACT FORM (static demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  contactForm && contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(()=> formSuccess.classList.remove('show'), 5000);
  });

})();
