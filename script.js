// ELEMENTOS
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

const tiempoInicio = 90; 
const tiempoFin = 130;   

// EVENTO DE APERTURA DEL SOBRE
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Reproducción de música
    music.currentTime = tiempoInicio;
    music.play().then(() => {
        musicIcon.innerText = "⏸️";
        musicText.innerText = "Pausar";
    }).catch(e => console.log("Audio esperando interacción"));

    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
            music.play();
        }
    });

    // Abrir sobre
    wrapper.classList.add("open");
    
    // Iniciar lluvia de hojas y pétalos (Mantenido)
    iniciarLluviaFlores();
    
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1100); 
    
    setTimeout(() => {
        wrapper.style.transition = "opacity 1.5s ease";
        wrapper.style.opacity = "0";
        
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 4000); 
});

// CONTROL DE MÚSICA
function toggleMusic() {
    if (music.paused) {
        if (music.currentTime < tiempoInicio || music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
        }
        music.play();
        musicIcon.innerText = "⏸️";
        musicText.innerText = "Pausar";
    } else {
        music.pause();
        musicIcon.innerText = "▶️";
        musicText.innerText = "Reproducir";
    }
}

// NUEVO CONTADOR (Estilo Reloj Digital)
const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const countdownDiv = document.getElementById("countdown");
    if(countdownDiv) {
        countdownDiv.innerHTML = `
            <div class="timer">
                <div class="timer-col">
                    <span>DÍAS💍</span>
                    <div class="timer-box">${d < 10 ? '0'+d : d}</div>
                </div>
                <div class="timer-col">
                    <span>HORAS</span>
                    <div class="timer-box">${h < 10 ? '0'+h : h}</div>
                </div>
                <div class="timer-col">
                    <span>MINS</span>
                    <div class="timer-box">${m < 10 ? '0'+m : m}</div>
                </div>
            </div>
        `;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// SISTEMA DE LLUVIA DE PÉTALOS Y HOJAS DE OLIVO (Mantenido)
function iniciarLluviaFlores() {
    // Genera un elemento cada 400 milisegundos
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");

        // 50% de probabilidad de ser hoja o pétalo
        const esHoja = Math.random() > 0.5;
        
        if (esHoja) {
            // SVG Hoja de Olivo
            element.innerHTML = `<svg width="18" height="35" viewBox="0 0 24 48" fill="#5d663d" style="filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.2));"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`;
        } else {
            // SVG Pétalo Blanco
            element.innerHTML = `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff" style="filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.2));"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;
        }

        // Posición horizontal aleatoria
        element.style.left = Math.random() * 100 + "vw";
        
        // Duración de la caída aleatoria (entre 4 y 8 segundos)
        element.style.animationDuration = (Math.random() * 4 + 4) + "s";
        
        // Variables CSS para la desviación y rotación aleatoria
        element.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        element.style.setProperty('--rot', (Math.random() * 360 + 180) + 'deg');

        document.body.appendChild(element);

        // Eliminar el elemento después de 8 segundos para no saturar la memoria
        setTimeout(() => {
            element.remove();
        }, 8000);
    }, 400); 
}
