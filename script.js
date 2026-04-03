const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const btnVolver = document.getElementById("btnVolver");

const tiempoInicio = 90; 
const tiempoFin = 130;   

// --- FUNCIÓN ABRIR ---
wrapper.addEventListener("click", function openEnvelope() {
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
            setTimeout(() => { content.style.opacity = "1"; }, 100);
        }, 1000);
    }, 4500); 
});

// --- FUNCIÓN VOLVER (CORREGIDA) ---
btnVolver.addEventListener("click", () => {
    // 1. Ocultar contenido
    content.style.opacity = "0";
    
    setTimeout(() => {
        content.style.display = "none";
        
        // 2. Limpiar estados del sobre
        wrapper.classList.remove("open");
        letter.classList.remove("front-view");
        
        // 3. Restaurar visualización del sobre
        wrapper.style.display = "block";
        
        // Forzamos un pequeño reflow para que el navegador note el cambio antes de la opacidad
        void wrapper.offsetWidth; 
        
        wrapper.style.opacity = "1";
        
    }, 1000);
});

// --- REPRODUCTOR Y OTROS ---
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

// (Aquí incluirías tus funciones de updateCountdown e iniciarLluviaFlores que ya tienes)
