/* ═══════════════════════════════════════════════════════════
   OMOYENI PORTFOLIO — MAIN JAVASCRIPT
   js/main.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. MOBILE NAV
───────────────────────────────────────────── */
function initMobileNav() {
  const toggle   = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on any mobile link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (
      mobileNav.classList.contains('is-open') &&
      !e.target.closest('.nav') &&
      !e.target.closest('#mobileNav')
    ) closeNav();
  });

  function closeNav() {
    mobileNav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ─────────────────────────────────────────────
   2. LIGHTBOX
───────────────────────────────────────────── */
function initLightbox() {
  const overlay  = document.getElementById('bookLightbox');
  const closeBtn = document.getElementById('lbClose');
  const ghostBtn = document.getElementById('lbGhost');
  const trigger  = document.getElementById('bookCardTrigger');
  if (!overlay) return;

  function openLightbox() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  trigger && trigger.addEventListener('click', openLightbox);
  trigger && trigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); }
  });

  closeBtn  && closeBtn.addEventListener('click', closeLightbox);
  ghostBtn  && ghostBtn.addEventListener('click', closeLightbox);

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });
}

/* ─────────────────────────────────────────────
   3. SCROLL REVEAL
───────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Stagger delay for grid children
  document.querySelectorAll('.work-grid, .services-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────
   4. STICKY NAV SHADOW
───────────────────────────────────────────── */
function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(22,17,16,0.07)'
      : 'none';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─────────────────────────────────────────────
   5. SMOOTH ANCHOR SCROLL (offset for sticky nav)
───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   6. POLAROID HOVER — lift effect
───────────────────────────────────────────── */
function initPolaroidTilt() {
  document.querySelectorAll('.polaroid').forEach(pol => {
    const baseTransform = pol.style.transform || getComputedStyle(pol).transform;

    pol.addEventListener('mouseenter', () => {
      pol.style.transform = 'rotate(0deg) scale(1.04)';
    });
    pol.addEventListener('mouseleave', () => {
      pol.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────────
   7. CURSOR GLOW (subtle accent blob on hero right)
───────────────────────────────────────────── */
function initCursorGlow() {
  const panel = document.querySelector('.hero__right');
  if (!panel) return;

  const blob = document.createElement('div');
  blob.style.cssText = `
    position: absolute; width: 320px; height: 320px;
    border-radius: 50%; pointer-events: none; z-index: 1;
    background: radial-gradient(circle, rgba(255,71,87,0.14) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: left 0.18s ease, top 0.18s ease;
  `;
  panel.appendChild(blob);

  panel.addEventListener('mousemove', e => {
    const rect = panel.getBoundingClientRect();
    blob.style.left = (e.clientX - rect.left) + 'px';
    blob.style.top  = (e.clientY - rect.top)  + 'px';
  });
}

/* ─────────────────────────────────────────────
   8. THEME TOGGLE
───────────────────────────────────────────── */
function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  const SUN = `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="var(--text)"/>
  `;
  const MOON = `
    <circle cx="12" cy="12" r="4.5" fill="var(--yellow)"/>
    <g stroke="var(--yellow)" stroke-width="1.8" stroke-linecap="round">
      <line x1="12" y1="1.5" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22.5"/>
      <line x1="1.5" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22.5" y2="12"/>
      <line x1="4.2" y1="4.2" x2="6" y2="6"/>
      <line x1="18" y1="18" x2="19.8" y2="19.8"/>
      <line x1="19.8" y1="4.2" x2="18" y2="6"/>
      <line x1="6" y1="18" x2="4.2" y2="19.8"/>
    </g>
  `;

  function render(theme) {
    icon.innerHTML = theme === 'light' ? SUN : MOON;
    // restart the spin-in animation on every switch
    icon.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    icon.offsetHeight; // force reflow
    icon.style.animation = '';
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  render(document.documentElement.getAttribute('data-theme') || 'dark');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('sisi-theme', next); } catch (e) { /* no-op */ }
    render(next);
  });
}

/* ─────────────────────────────────────────────
   9. SERVICE TABS
───────────────────────────────────────────── */
function initServiceTabs() {
  const wrap = document.getElementById('serviceTabs');
  if (!wrap) return;

  const pills   = wrap.querySelectorAll('.tab-pill');
  const content = document.getElementById('serviceTabPanelContent');
  const numEl   = document.getElementById('serviceTabNum');
  const nameEl  = document.getElementById('serviceTabName');
  const descEl  = document.getElementById('serviceTabDesc');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('is-active')) return;

      pills.forEach(p => { p.classList.remove('is-active'); p.setAttribute('aria-selected', 'false'); });
      pill.classList.add('is-active');
      pill.setAttribute('aria-selected', 'true');

      numEl.textContent  = pill.dataset.num;
      nameEl.textContent = pill.textContent.trim();
      descEl.textContent = pill.dataset.desc;

      // restart the fade-in on the panel content
      content.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      content.offsetHeight;
      content.style.animation = '';
    });
  });
}

/* ─────────────────────────────────────────────
   10. FOOTER ANIMATION — quill drive
   Replays every time the strip scrolls into view,
   not just the first time.
───────────────────────────────────────────── */
function initFooterAnimation() {
  const strip = document.getElementById('quillStrip');
  const quill = document.getElementById('quillIcon');
  const trail = document.getElementById('inkTrail');
  if (!strip || !quill || !trail) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Toggling the class off then on (via reflow) each time it re-enters
      // view restarts the CSS animation fresh — so the quill drives across
      // every time you reach the footer, not just once per page load.
      if (entry.isIntersecting) {
        quill.classList.remove('is-driving');
        trail.classList.remove('is-driving');
        // eslint-disable-next-line no-unused-expressions
        quill.offsetHeight;
        quill.classList.add('is-driving');
        trail.classList.add('is-driving');
      } else {
        quill.classList.remove('is-driving');
        trail.classList.remove('is-driving');
      }
    });
  }, { threshold: 0.3 });

  io.observe(strip);
}

/* ─────────────────────────────────────────────
   11. INIT ALL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLightbox();
  initReveal();
  initNavShadow();
  initSmoothScroll();
  initPolaroidTilt();
  initCursorGlow();
  initThemeToggle();
  initServiceTabs();
  initFooterAnimation();
});
