/* ============================================
   DAHIANA & MANUEL · script.js
   - Cuenta regresiva
   - Pétalos flotantes
   - Scroll reveal
   ============================================ */

// --- CUENTA REGRESIVA ---
(function initCountdown() {
  // 03 oct 2026, 13:00 hora España (UTC+2 en verano → UTC+1 en octubre → CET = UTC+1)
  const weddingDate = new Date('2026-10-03T13:00:00+01:00');

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent    = '¡';
      hoursEl.textContent   = 'H';
      minutesEl.textContent = 'O';
      secondsEl.textContent = 'Y';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// --- PÉTALOS FLOTANTES ---
(function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const PETAL_COUNT = 18;
  const COLORS = [
    'rgba(201,168,76,0.35)',
    'rgba(232,201,122,0.30)',
    'rgba(107,123,58,0.25)',
    'rgba(201,168,76,0.20)',
    'rgba(74,87,40,0.20)'
  ];

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size     = 6 + Math.random() * 8;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 20;
    const duration = 12 + Math.random() * 16;
    const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
    const rotation = Math.random() * 360;

    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.5}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      transform: rotate(${rotation}deg);
      border-radius: ${40 + Math.random() * 20}% ${10 + Math.random() * 10}% ${40 + Math.random() * 20}% ${10 + Math.random() * 10}%;
    `;

    container.appendChild(petal);
  }
})();

// --- SCROLL REVEAL ---
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();

// --- MICRO-INTERACCIÓN: botones RSVP ---
(function initRSVPButtons() {
  const btns = document.querySelectorAll('.rsvp-btn');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
    });
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translateY(0) scale(0.98)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translateY(-2px) scale(1)';
    });
  });
})();

// --- CURSOR personalizado sutil (solo desktop) ---
(function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px; height: 8px;
    background: rgba(201,168,76,0.7);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, opacity 0.2s ease;
    mix-blend-mode: multiply;
  `;
  document.body.appendChild(cursor);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(3)';
      cursor.style.opacity   = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity   = '1';
    });
  });
})();
