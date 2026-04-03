const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");

const tiempoInicio = 90; // Segundo donde empieza la canción
const tiempoFin = 130;   // Segundo donde termina bucle

// --- EVENTO DE APERTURA DEL SOBRE ---
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return; // Prevenir clics múltiples
    
    // Iniciar Música
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Música activada"));

    // Bucle de música personalizado
    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
        }
    });

    // Abrir sobre (CSS trigger)
    wrapper.classList.add("open");
    
    // Iniciar lluvia de hojas y pétalos
    iniciarLluviaFlores();
    
    // Mover la carta al frente después de que suba
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1100); 
    
    // Desvanecer sobre y mostrar invitación completa
    setTimeout(() => {
        wrapper.style.transition = "opacity 1.5s ease";
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 4500); 
});

// --- FUNCIÓN CONTROL MÚSICA (PLAY/PAUSE) ---
function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    if (music.paused) {
        music.play();
        icon.innerText = "||"; // Icono de pausa
    } else {
        music.pause();
        icon.innerText = "▶"; // Icono de play
    }
}

// --- FUNCIÓN CONTADOR (Actualizado a formato ':') ---
function updateCountdown() {
    // Fecha objetivo: 3 de Octubre de 2026 a las 13:00
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "<h2 class='gold-text'>¡HOY ES EL GRAN DÍA!</h2>";
        return;
    }

    // Cálculos de tiempo
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Generar el HTML con formato morado y separadores ':'
    const countdownDiv = document.getElementById("countdown");
    if(countdownDiv) {
        countdownDiv.innerHTML = `
            <div class="timer-text">
                <div class="timer-group"><span class="timer-val">${d < 10 ? '0'+d : d}</span><span class="timer-lab">Días💍</span></div>
                <span class="timer-sep">:</span>
                <div class="timer-group"><span class="timer-val">${h < 10 ? '0'+h : h}</span><span class="timer-lab">Horas</span></div>
                <span class="timer-sep">:</span>
                <div class="timer-group"><span class="timer-val">${m < 10 ? '0'+m : m}</span><span class="timer-lab">Mins</span></div>
            </div>`;
    }
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar una vez al inicio

// --- FUNCIÓN LLUVIA DE FLORES Y HOJAS ---
function iniciarLluviaFlores() {
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");
        element.innerHTML = `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;
        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 4 + 4) + "s";
        element.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        element.style.setProperty('--rot', (Math.random() * 360) + 'deg');
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 8000);
    }, 400); 
}
