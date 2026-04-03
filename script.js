const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const btnVolver = document.getElementById("btnVolver");

const tiempoInicio = 90; 
const tiempoFin = 130;   

// --- ABRIR SOBRE ---
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Música activada"));

    wrapper.classList.add("open");
    iniciarLluviaFlores();
    
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1100); 
    
    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 4500); 
});

// --- VOLVER AL SOBRE ---
btnVolver.addEventListener("click", () => {
    // 1. Ocultar el contenido de la invitación
    content.style.opacity = "0";
    
    setTimeout(() => {
        content.style.display = "none";
        
        // 2. Resetear el sobre a su estado original (cerrado)
        wrapper.classList.remove("open");
        letter.classList.remove("front-view");
        
        // 3. Mostrar el sobre de nuevo
        wrapper.style.display = "block";
        
        // Forzamos al navegador a procesar el cambio de estado antes de mostrarlo
        void wrapper.offsetWidth;
        
        wrapper.style.opacity = "1";
    }, 1000);
});

// --- FUNCIONES COMPLEMENTARIAS (Música, Contador, Lluvia) ---
function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    if (music.paused) {
        music.play();
        icon.innerText = "||";
    } else {
        music.pause();
        icon.innerText = "▶";
    }
}

function updateCountdown() {
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "¡Llegó el gran día!";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

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
setInterval(updateCountdown, 1000);
updateCountdown();

function iniciarLluviaFlores() {
    // (Aquí va tu código original de lluvia de flores y hojas)
}
