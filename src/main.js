import { gsap } from 'gsap';
import './style.css';
import './projects-island.jsx';

/* ══════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════ */
function goTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// Attach nav link events
document.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    goTo(btn.dataset.goto);
    closeMobileMenu();
  });
});
document.getElementById('ham').addEventListener('click', toggleMobileMenu);

/* ══════════════════════════════════════════
   PERSONA SWITCH & ROUTING
   ══════════════════════════════════════════ */
let isDevMode = true;
const curtain = document.getElementById('curtain');

function switchPersona(mode, instant = false) {
  if ((mode === 'dev') === isDevMode) return;
  closeMobileMenu();

  const toVid = mode === 'vid';
  
  const applySwitch = () => {
    const devEl  = document.getElementById('dev-persona');
    const vidEl  = document.getElementById('vid-persona');
    const navEl  = document.getElementById('nav');
    const toggle = document.getElementById('ptoggle');

    if (toVid) {
      devEl.style.display = 'none';
      vidEl.style.display = 'block';
      navEl.classList.add('vid-nav');
      document.getElementById('dev-btn').classList.remove('dev-active');
      document.getElementById('vid-btn').classList.add('vid-active');
      toggle.style.background = 'rgba(184,125,48,0.1)';
      toggle.style.borderColor = 'rgba(184,125,48,0.25)';
      document.body.classList.add('vid-mode');
      isDevMode = false;
    } else {
      vidEl.style.display = 'none';
      devEl.style.display = 'block';
      navEl.classList.remove('vid-nav');
      document.getElementById('vid-btn').classList.remove('vid-active');
      document.getElementById('dev-btn').classList.add('dev-active');
      toggle.style.background = 'var(--c-surface)';
      toggle.style.borderColor = 'var(--c-border)';
      document.body.classList.remove('vid-mode');
      isDevMode = true;
    }

    window.scrollTo(0, 0);
    // Re-observe elements for the newly visible persona
    document.querySelectorAll('.io,.io-left,.io-right').forEach(el => {
      el.classList.remove('in');
      observer.observe(el);
    });
  };

  if (instant) {
    applySwitch();
    return;
  }

  curtain.style.background = toVid ? '#B87D30' : '#c96442';

  const tl = gsap.timeline();
  tl.to(curtain, { clipPath: 'inset(0 0% 0 0)', duration: 0.38, ease: 'power3.in' })
    .call(applySwitch)
    .to(curtain, { clipPath: 'inset(0 0% 0 100%)', duration: 0.42, ease: 'power3.out' });
}

function handleRouting(instant = false) {
  const path = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
  if (path === '/creative') {
    switchPersona('vid', instant);
  } else {
    switchPersona('dev', instant);
  }
}

document.getElementById('dev-btn').addEventListener('click', () => {
  if (window.location.pathname !== '/' && window.location.pathname !== '/dev') {
    history.pushState(null, '', '/dev');
  }
  switchPersona('dev');
});

document.getElementById('vid-btn').addEventListener('click', () => {
  if (window.location.pathname !== '/creative') {
    history.pushState(null, '', '/creative');
  }
  switchPersona('vid');
});

window.addEventListener('popstate', () => {
  handleRouting(false);
});

/* ══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  document.getElementById('progress').style.width = Math.min(pct * 100, 100) + '%';
}, { passive: true });

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER REVEALS
   ══════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeAll() {
  document.querySelectorAll('.io, .io-left, .io-right').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   CUSTOM CURSOR (desktop only)
   ══════════════════════════════════════════ */
const isMobile = () => window.innerWidth <= 768;

const curDot  = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');

document.addEventListener('mousemove', e => {
  if (isMobile()) return;
  gsap.to(curDot,  { x: e.clientX, y: e.clientY, duration: 0.05 });
  gsap.to(curRing, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' });
});

document.querySelectorAll('a, button, .proj-card, .plat-card, .vid-thumb').forEach(el => {
  el.addEventListener('mouseenter', () => { if (!isMobile()) gsap.to(curRing, { scale: 2.2, opacity: 0.7, duration: 0.2 }); });
  el.addEventListener('mouseleave', () => { if (!isMobile()) gsap.to(curRing, { scale: 1,   opacity: 1,   duration: 0.3 }); });
});

/* ══════════════════════════════════════════
   HERO MOUSE PARALLAX
   ══════════════════════════════════════════ */
document.addEventListener('mousemove', e => {
  if (!isDevMode || isMobile()) return;
  const mx = (e.clientX / window.innerWidth  - 0.5);
  const my = (e.clientY / window.innerHeight - 0.5);
  gsap.to('#portrait-img', { x: mx * 16, y: my * 10, duration: 1.4, ease: 'power2.out' });
  gsap.to('#code-card',    { x: -mx * 9, y: -my * 7, duration: 1.8, ease: 'power2.out' });
});

/* ══════════════════════════════════════════
   3D CARD TILT
   ══════════════════════════════════════════ */
function init3DTilt() {
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      if (isMobile()) return;
      const r    = card.getBoundingClientRect();
      const xPct = (e.clientX - r.left)  / r.width  - 0.5;
      const yPct = (e.clientY - r.top)   / r.height - 0.5;
      const img  = card.querySelector('img');
      gsap.to(img,  { scale: 1.06, duration: 0.4, ease: 'power2.out', overwrite: true });
      gsap.to(card, {
        rotateY: xPct * 14, rotateX: -yPct * 10, z: 20,
        boxShadow: `${-xPct * 22}px ${yPct * 16}px 48px rgba(201,100,66,0.14)`,
        duration: 0.28, ease: 'power2.out', overwrite: true,
      });
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      gsap.to(img,  { scale: 1,  duration: 0.45, ease: 'power2.out',       overwrite: true });
      gsap.to(card, {
        rotateY: 0, rotateX: 0, z: 0,
        boxShadow: 'rgba(0,0,0,0.04) 0px 1px 4px 0px',
        duration: 0.75, ease: 'elastic.out(1, 0.5)', overwrite: true,
      });
    });
  });
}

/* ══════════════════════════════════════════
   VIDEO THUMBNAIL HOVER
   ══════════════════════════════════════════ */
function initVidThumbHover() {
  document.querySelectorAll('.vid-thumb').forEach(thumb => {
    const reveal = thumb.querySelector('.vid-reveal');
    const img    = thumb.querySelector('img');
    thumb.addEventListener('mouseenter', () => {
      gsap.to(img,    { scale: 1.07, duration: 0.5, ease: 'power2.out', overwrite: true });
      gsap.to(reveal, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out', overwrite: true });
    });
    thumb.addEventListener('mouseleave', () => {
      gsap.to(img,    { scale: 1,  duration: 0.5, ease: 'power2.out', overwrite: true });
      gsap.to(reveal, { clipPath: 'inset(0 100% 0 0)', duration: 0.4, ease: 'power3.in', overwrite: true });
    });
  });
}

/* ══════════════════════════════════════════
   PLATFORM CARD HOVER
   ══════════════════════════════════════════ */
function initPlatCardHover() {
  document.querySelectorAll('.plat-card').forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, { y: -6, scale: 1.02, background: 'rgba(255,252,240,0.88)', duration: 0.22, ease: 'power2.out', overwrite: true }));
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { y:  0, scale: 1,    background: 'rgba(255,252,240,0.55)', duration: 0.35, ease: 'power2.out', overwrite: true }));
  });
}

/* ══════════════════════════════════════════
   MAGNETIC EMAIL BUTTON
   ══════════════════════════════════════════ */
function initMagneticBtn() {
  const emailBtn = document.getElementById('email-cta');
  if (!emailBtn || isMobile()) return;
  emailBtn.addEventListener('mousemove', e => {
    const r = emailBtn.getBoundingClientRect();
    gsap.to(emailBtn, {
      x: (e.clientX - r.left - r.width  / 2) * 0.38,
      y: (e.clientY - r.top  - r.height / 2) * 0.38,
      duration: 0.42, ease: 'power2.out',
    });
  });
  emailBtn.addEventListener('mouseleave', () =>
    gsap.to(emailBtn, { x: 0, y: 0, duration: 0.85, ease: 'elastic.out(1, 0.45)' }));
}

/* ══════════════════════════════════════════
   CLAUDE-STYLE LOADER
   ══════════════════════════════════════════ */
function initLoader() {
  const bar = document.querySelector('.loader-bar');
  const loader = document.getElementById('loader');
  const logos = document.querySelectorAll('.loader-logo');
  if (!bar || !loader || logos.length === 0) return;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          document.body.classList.add('loaded');
          // Re-trigger intersection observer triggers
          observeAll();
        }
      });
    }
  });

  // Set initial states for all logos
  gsap.set(logos, { opacity: 0, scale: 0.7, rotation: -12 });
  // Make the first one active initially
  gsap.set(logos[0], { opacity: 1, scale: 1, rotation: 0 });

  // Fill progress bar smoothly over 1.8 seconds to allow visual cycling
  tl.to(bar, {
    width: '100%',
    duration: 1.8,
    ease: 'power2.inOut'
  }, 0);

  // Cycle through the 4 logos sequentially
  const interval = 0.45;
  for (let i = 0; i < logos.length - 1; i++) {
    const current = logos[i];
    const next = logos[i + 1];
    const time = (i + 1) * interval;

    // Transition out the current logo
    tl.to(current, {
      opacity: 0,
      scale: 0.7,
      rotation: 12,
      duration: 0.3,
      ease: 'power2.in'
    }, time);

    // Transition in the next logo
    tl.to(next, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, time + 0.1);
  }

  // Fade out the final logo as loading finishes
  tl.to(logos[logos.length - 1], {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  }, 1.7);
}

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
handleRouting(true);
initLoader();
observeAll();

window.addEventListener('load', () => {
  init3DTilt();
  initVidThumbHover();
  initPlatCardHover();
  initMagneticBtn();
});
