/* ═══════════════════════════════════════════════════════════
   SISI PORTFOLIO — MAIN JAVASCRIPT
   js/main.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. MOBILE NAV
───────────────────────────────────────────── */
function initMobileNav() {
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

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
   NOTE POPOVER — shared by every easter egg on
   the site (theme toggle, section-meta triggers).
   Appended straight to <body> with explicit style
   resets in CSS so it can never inherit odd
   tracking/case/font styling from a nested trigger.
───────────────────────────────────────────── */
let activeNotePopover = null;
let activeNotePopoverTimer = null;

function closeNotePopover() {
  if (activeNotePopover) {
    activeNotePopover.remove();
    activeNotePopover = null;
  }
  clearTimeout(activeNotePopoverTimer);
}

function showNotePopover(triggerEl, message) {
  closeNotePopover();

  const pop = document.createElement('div');
  pop.className = 'note-popover';
  pop.textContent = message;
  pop.setAttribute('role', 'status');
  document.body.appendChild(pop);

  const rect = triggerEl.getBoundingClientRect();
  const popRect = pop.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - popRect.width / 2 + window.scrollX;
  left = Math.max(12, Math.min(left, window.innerWidth - popRect.width - 12 + window.scrollX));
  const top = rect.bottom + window.scrollY + 10;

  pop.style.left = left + 'px';
  pop.style.top = top + 'px';

  requestAnimationFrame(() => pop.classList.add('is-visible'));

  activeNotePopover = pop;
  activeNotePopoverTimer = setTimeout(closeNotePopover, 2800);
}

document.addEventListener('click', e => {
  if (activeNotePopover && !e.target.closest('.note-popover') && !e.target.closest('.note-trigger') && !e.target.closest('#themeToggle')) {
    closeNotePopover();
  }
});
document.addEventListener('scroll', closeNotePopover, { passive: true });

function initNoteTriggers() {
  document.querySelectorAll('.note-trigger[data-note]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      showNotePopover(trigger, trigger.dataset.note);
    });
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showNotePopover(trigger, trigger.dataset.note);
      }
    });
  });
}

/* ─────────────────────────────────────────────
   2. SCROLL REVEAL
───────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  document.querySelectorAll('.work-grid, .featured-grid').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.06) + 's';
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
   4. SMOOTH ANCHOR SCROLL (offset for sticky nav)
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
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   5. THEME TOGGLE
───────────────────────────────────────────── */
function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  const SUN = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="var(--text)"/>`;
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
    icon.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    icon.offsetHeight; // force reflow to restart the spin-in
    icon.style.animation = '';
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  render(document.documentElement.getAttribute('data-theme') || 'light');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { sessionStorage.setItem('sisi-theme', next); } catch (e) { /* no-op */ }
    render(next);
    showNotePopover(btn, next === 'dark' ? "Hope you're not scared of the dark" : 'Up NEPA');
  });
}

/* ─────────────────────────────────────────────
   6. SERVICE TABS
───────────────────────────────────────────── */
function initServiceTabs() {
  const wrap = document.getElementById('serviceTabs');
  if (!wrap) return;

  const pills   = wrap.querySelectorAll('.chip');
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

      content.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      content.offsetHeight;
      content.style.animation = '';
    });
  });
}

/* ─────────────────────────────────────────────
   7. EMAIL DROPDOWN MENU
───────────────────────────────────────────── */
function initEmailMenu() {
  const btn  = document.getElementById('emailMenuBtn');
  const menu = document.getElementById('emailMenu');
  if (!btn || !menu) return;

  function open() {
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function close() {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.contains('is-open') ? close() : open();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.email-menu-wrap')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // Sending an email navigates away via mailto, closing the menu is harmless either way
  menu.querySelector('a.email-menu__item')?.addEventListener('click', close);
}

/* ─────────────────────────────────────────────
   8. COPY EMAIL BUTTON
───────────────────────────────────────────── */
function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  const label = document.getElementById('copyEmailLabel');
  if (!btn || !label) return;

  const email = btn.dataset.email;
  let resetTimer = null;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      // Fallback for older browsers / no clipboard permission
      const temp = document.createElement('textarea');
      temp.value = email;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand('copy'); } catch (err) { /* no-op */ }
      document.body.removeChild(temp);
    }

    label.textContent = 'Copied!';
    btn.classList.add('is-copied');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      label.textContent = 'Copy Email';
      btn.classList.remove('is-copied');
      document.getElementById('emailMenu')?.classList.remove('is-open');
      document.getElementById('emailMenuBtn')?.setAttribute('aria-expanded', 'false');
    }, 1400);
  });
}

/* ─────────────────────────────────────────────
   9. INIT ALL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initReveal();
  initSmoothScroll();
  initThemeToggle();
  initServiceTabs();
  initEmailMenu();
  initCopyEmail();
  initNoteTriggers();
});
