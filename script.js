/* ================================================
   DAHIANA & MANUEL · script.js
   ================================================ */

const envelopeWrapper = document.getElementById('envelopeWrapper');
const content         = document.getElementById('content');
const music           = document.getElementById('music');
const letter          = document.getElementById('letter');
const btnVolver       = document.getElementById('btnVolver');
const playBtn         = document.getElementById('playBtn');
const musicIcon       = document.getElementById('musicIcon');
const progressFill    = document.getElementById('progressFill');

// Fragmento de la canción (segundos)
const MUSIC_START = 90;
const MUSIC_END   = 130;

let petalInterval = null;
let progressInterval = null;
let musicStarted = false;

// ── APERTURA DEL SOBRE ──────────────────────────
envelopeWrapper.addEventListener('click', () => {
  if (envelopeWrapper.classList.contains('open')) return;

  envelopeWrapper.classList.add('open');
  startPetals();

  // Música arranca con la apertura
  startMusic();

  // Tras la animación del sobre → mostrar invitación
  setTimeout(() => {
    envelopeWrapper.style.opacity = '0';
    envelopeWrapper.style.pointerEvents = 'none';
  }, 3800);

  setTimeout(() => {
    envelopeWrapper.style.display = 'none';
    content.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        content.style.opacity = '1';
      });
    });
  }, 5000);
});

// ── BOTÓN VOLVER ────────────────────────────────
btnVolver.addEventListener('click', () => {
  content.style.opacity = '0';
  setTimeout(() => {
    content.style.display = 'none';
    envelopeWrapper.classList.remove('open');
    envelopeWrapper.style.display = 'flex';
    envelopeWrapper.style.pointerEvents = 'auto';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        envelopeWrapper.style.opacity = '1';
      });
    });
    stopPetals();
  }, 1000);
});

// ── MÚSICA ──────────────────────────────────────
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  music.currentTime = MUSIC_START;
  music.play().catch(() => {}); // silencia el error si el navegador bloquea autoplay

  music.addEventListener('timeupdate', () => {
    if (music.currentTime >= MUSIC_END) {
      music.currentTime = MUSIC_START;
    }
    // Actualizar barra de progreso
    const pct = ((music.currentTime - MUSIC_START) / (MUSIC_END - MUSIC_START)) * 100;
    if (progressFill) progressFill.style.width = Math.min(100, Math.max(0, pct)) + '%';
  });

  musicIcon.textContent = '❚❚';
}

function toggleMusic() {
  if (!musicStarted) {
    startMusic();
    return;
  }
  if (music.paused) {
    music.play();
    musicIcon.textContent = '❚❚';
  } else {
    music.pause();
    musicIcon.textContent = '▶';
  }
}

// ── CUENTA REGRESIVA ─────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  // 03 oct 2026 13:00 CET (UTC+1)
  const target = new Date('2026-10-03T13:00:00+01:00').getTime();
  const now    = Date.now();
  const diff   = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '¡';
    document.getElementById('cd-hours').textContent = 'H';
    document.getElementById('cd-mins').textContent  = 'O';
    document.getElementById('cd-secs').textContent  = 'Y';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = days;
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── LLUVIA DE PÉTALOS ────────────────────────────
const PETAL_COLORS = [
  'rgba(197,160,89,0.55)',
  'rgba(226,194,122,0.45)',
  'rgba(122,132,80,0.40)',
  'rgba(197,160,89,0.35)',
  'rgba(93,102,61,0.35)',
  'rgba(240,220,160,0.50)',
];

function createPetal() {
  const container = document.getElementById('falling-flowers');
  const el = document.createElement('div');
  el.className = 'petal';

  const size     = 8 + Math.random() * 10;
  const left     = Math.random() * 98;
  const duration = 5 + Math.random() * 7;
  const delay    = Math.random() * 2;
  const color    = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  const rX       = 30 + Math.random() * 40;
  const rY       = 10 + Math.random() * 20;

  el.style.cssText = `
    left: ${left}vw;
    width: ${size}px;
    height: ${size * 1.4}px;
    background: ${color};
    animation: petalDrop ${duration}s ${delay}s linear forwards;
    border-radius: ${rX}% ${rY}% ${rX}% ${rY}%;
    transform: rotate(${Math.random()*360}deg);
  `;

  container.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay + 0.5) * 1000);
}

function startPetals() {
  createPetal(); // primera inmediata
  petalInterval = setInterval(createPetal, 350);
}

function stopPetals() {
  clearInterval(petalInterval);
  petalInterval = null;
  document.getElementById('falling-flowers').innerHTML = '';
}
