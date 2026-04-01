// ELEMENTOS
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");

// CONFIGURACIÓN DE TIEMPO (en segundos)
const tiempoInicio = 90; // 1:30 = 90 segundos
const tiempoFin = 130;    // 2:10 = 130 segundos

// 1. ABRIR SOBRE Y CONTROL DE MÚSICA
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Iniciar música en el segundo 1:40
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Interacción requerida para audio"));

    // Bucle personalizado: vigilamos el tiempo actual
    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio; // Salta de nuevo al 1:40
            music.play();
        }
    });

    // Lógica visual del sobre
    wrapper.classList.add("open");
    
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1000); 
    
    setTimeout(() => {
        wrapper.style.transition = "opacity 1.5s ease";
        wrapper.style.opacity = "0";
        
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 3500); 
});

// 2. CONTADOR (Asegúrate de que el div con id="countdown" exista en tu HTML)
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
                <div>${d < 10 ? '0'+d : d}<span> DÍAS 💍</span></div>
                <div>${h < 10 ? '0'+h : h}<span> HORAS</span></div>
                <div>${m < 10 ? '0'+m : m}<span> MINS</span></div>
            </div>
        `;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 3. FUNCIÓN TOGGLE (Si tienes botón de pausa)
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
