/* ================================================
   DAHIANA & MANUEL · script.js
   ================================================ */

// ── Referencias DOM ──────────────────────────────
const sobre       = document.getElementById('sobre');
const invitacion  = document.getElementById('invitacion');
const music       = document.getElementById('music');
const playBtn     = document.getElementById('playBtn');
const progFill    = document.getElementById('progFill');
const btnVolver   = document.getElementById('btnVolver');

const MUSIC_START = 90;   // segundo de inicio
const MUSIC_END   = 130;  // segundo de fin

let petalTimer = null;

// ── APERTURA DEL SOBRE ──────────────────────────
sobre.addEventListener('click', abrirSobre);

function abrirSobre() {
  if (sobre.classList.contains('abierto')) return;

  // 1. Animación CSS del sobre
  sobre.classList.add('abierto');

  // 2. Intentar reproducir música (no bloquea el flujo)
  try {
    music.currentTime = MUSIC_START;
    music.play().then(() => {
      playBtn.textContent = '❚❚';
    }).catch(() => {
      // Autoplay bloqueado por el navegador — OK, el botón manual funciona
    });
  } catch(e) {}

  // 3. Lluvia de pétalos
  startPetals();

  // 4. Mostrar invitación tras la animación
  setTimeout(() => {
    sobre.style.transition = 'opacity 0.8s ease';
    sobre.style.opacity = '0';
  }, 3500);

  setTimeout(() => {
    sobre.style.display = 'none';
    invitacion.style.display = 'block';
    // Doble rAF garantiza que display:block se pinte antes de aplicar opacity
    requestAnimationFrame(() => requestAnimationFrame(() => {
      invitacion.style.opacity = '1';
    }));
  }, 4400);
}

// ── VOLVER ──────────────────────────────────────
btnVolver.addEventListener('click', () => {
  invitacion.style.opacity = '0';

  setTimeout(() => {
    invitacion.style.display = 'none';
    stopPetals();
    music.pause();
    playBtn.textContent = '▶';

    sobre.classList.remove('abierto');
    sobre.style.transition = '';
    sobre.style.opacity = '0';
    sobre.style.display = 'flex';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      sobre.style.transition = 'opacity 0.8s ease';
      sobre.style.opacity = '1';
    }));
  }, 1000);
});

// ── REPRODUCTOR ─────────────────────────────────
playBtn.addEventListener('click', () => {
  if (music.paused) {
    if (music.currentTime < MUSIC_START || music.currentTime >= MUSIC_END) {
      music.currentTime = MUSIC_START;
    }
    music.play().then(() => {
      playBtn.textContent = '❚❚';
    }).catch(() => {});
  } else {
    music.pause();
    playBtn.textContent = '▶';
  }
});

music.addEventListener('timeupdate', () => {
  if (music.currentTime >= MUSIC_END) {
    music.currentTime = MUSIC_START;
  }
  const pct = ((music.currentTime - MUSIC_START) / (MUSIC_END - MUSIC_START)) * 100;
  progFill.style.width = Math.min(100, Math.max(0, pct)) + '%';
});

// ── CUENTA REGRESIVA ─────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const target = new Date('2026-10-03T13:00:00+01:00').getTime();
  const diff   = target - Date.now();

  if (diff <= 0) {
    document.getElementById('cdDays').textContent  = '0';
    document.getElementById('cdHours').textContent = '00';
    document.getElementById('cdMins').textContent  = '00';
    document.getElementById('cdSecs').textContent  = '00';
    return;
  }

  document.getElementById('cdDays').textContent  = Math.floor(diff / 86400000);
  document.getElementById('cdHours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('cdMins').textContent  = pad(Math.floor((diff % 3600000)  / 60000));
  document.getElementById('cdSecs').textContent  = pad(Math.floor((diff % 60000)    / 1000));
}

tick();
setInterval(tick, 1000);

// ── PÉTALOS ──────────────────────────────────────
const COLORES = [
  'rgba(197,160,89,0.6)',
  'rgba(226,194,122,0.5)',
  'rgba(122,132,80,0.45)',
  'rgba(93,102,61,0.4)',
  'rgba(240,220,160,0.55)',
];

function crearPetalo() {
  const el  = document.createElement('div');
  el.className = 'petal';
  const size = 7 + Math.random() * 9;
  const dur  = 5 + Math.random() * 7;
  el.style.cssText = `
    left: ${Math.random() * 100}vw;
    width: ${size}px;
    height: ${size * 1.5}px;
    background: ${COLORES[Math.floor(Math.random() * COLORES.length)]};
    animation-duration: ${dur}s;
    animation-delay: ${Math.random() * 1.5}s;
    opacity: ${0.5 + Math.random() * 0.5};
    transform: rotate(${Math.random() * 360}deg);
  `;
  document.getElementById('petals').appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}

function startPetals() {
  crearPetalo();
  petalTimer = setInterval(crearPetalo, 380);
}

function stopPetals() {
  clearInterval(petalTimer);
  petalTimer = null;
  document.getElementById('petals').innerHTML = '';
}
