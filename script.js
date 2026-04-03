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
    music.play().catch(e => console.log("Esperando interacción del usuario para reproducir"));

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
    }, 4500); // Dar tiempo a que suban las flores
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

// --- FUNCIÓN CONTADOR (COUNTDOWN) ---
function updateCountdown() {
    // Fecha objetivo: 3 de Octubre de 2026 a las 13:00
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        // Si la fecha ya pasó, podrías mostrar un mensaje
        document.getElementById("countdown").innerHTML = "¡Llegó el gran día!";
        return;
    }

    // Cálculos de tiempo
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Generar el HTMLboxed
    const countdownDiv = document.getElementById("countdown");
    if(countdownDiv) {
        countdownDiv.innerHTML = `
            <div class="timer">
                <div class="timer-col"><span>DÍAS💍</span><div class="timer-box">${d < 10 ? '0'+d : d}</div></div>
                <div class="timer-col"><span>HORAS</span><div class="timer-box">${h < 10 ? '0'+h : h}</div></div>
                <div class="timer-col"><span>MINS</span><div class="timer-box">${m < 10 ? '0'+m : m}</div></div>
            </div>`;
    }
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar una vez al inicio

// --- FUNCIÓN LLUVIA DE FLORES Y HOJAS (SVG) ---
function iniciarLluviaFlores() {
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");
        
        // Decidir si es hoja o pétalo
        const esHoja = Math.random() > 0.5;
        
        if (esHoja) {
            // SVG Hoja de Olivo
            element.innerHTML = `<svg width="18" height="35" viewBox="0 0 24 48" fill="#5d663d"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`;
        } else {
            // SVG Pétalo Blanco
            element.innerHTML = `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;
        }

        // Posición y animación aleatoria
        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 4 + 4) + "s"; // Entre 4 y 8 segundos
        
        // Variables CSS para la animación de deriva y rotación
        element.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        element.style.setProperty('--rot', (Math.random() * 360 + 180) + 'deg');

        document.body.appendChild(element);

        // Limpiar elemento después de la animación
        setTimeout(() => {
            element.remove();
        }, 8000); // Ajustar según la duración máxima de la animación
    }, 400); // Generar nuevo elemento cada 400ms
}
