// ELEMENTOS
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

const tiempoInicio = 90; 
const tiempoFin = 130;   

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
    
    // NUEVO: Iniciar lluvia de hojas y pétalos
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

const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();

// NUEVO CONTADOR ESTILO RELOJ DIGITAL
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

// NUEVO: SISTEMA DE LLUVIA DE FLORES (Pétalos blancos y hojas de olivo)
function iniciarLluviaFlores() {
    const contenedor = document.getElementById("falling-flowers");
    
    // Genera un elemento cada 400 milisegundos
    setInterval(() => {
        const esHoja = Math.random() > 0.5; // Probabilidad de ser hoja vs pétalo
        const elemento = document.createElement("div");
        elemento.classList.add("falling-element");

        if (esHoja) {
            // SVG HOJA DE OLIVO estilizadda y verde
            elemento.innerHTML = `<svg width="15" height="30" viewBox="0 0 24 48" fill="#5d663d" style="filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.1));"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`;
        } else {
            // SVG PÉTALO BLANCO estilizado
            elemento.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" style="filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.1));"><path d="M10 0C4 5 0 10 10 20 20 10 16 5 10 0Z"/></svg>`;
        }

        // Posición horizontal aleatoria
        elemento.style.left = Math.random() * 100 + "vw";
        
        // Duración de la caída aleatoria (entre 4 y 8 segundos)
        elemento.style.animationDuration = (Math.random() * 4 + 4) + "s";
        
        // Variables CSS para la animación (drift horizontal y rotación)
        elemento.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        elemento.style.setProperty('--rot', (Math.random() * 360 + 180) + 'deg');

        contenedor.appendChild(elemento);

        // Eliminar el elemento después de que la animación termine para no saturar la memoria
        setTimeout(() => {
            elemento.remove();
        }, 8000); // 8 segundos es la duración máxima
    }, 400); 
}
