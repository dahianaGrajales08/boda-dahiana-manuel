// ELEMENTOS
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

// CONFIGURACIÓN DE TIEMPO (Bucle 1:30 a 2:10)
const tiempoInicio = 90;  // 1:30 en segundos
const tiempoFin = 130;    // 2:10 en segundos

// 1. ABRIR SOBRE Y EMPEZAR MÚSICA
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Iniciar música en el punto exacto
    music.currentTime = tiempoInicio;
    music.play().then(() => {
        musicIcon.innerText = "⏸️";
        musicText.innerText = "Pausar";
    }).catch(e => console.log("Audio esperando interacción"));

    // Bucle personalizado
    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
            music.play();
        }
    });

    wrapper.classList.add("open");
    
    // Carta pasa al frente al abrirse el sobre
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
    }, 4000); 
});

// 2. BOTÓN DE PLAY/PAUSA
function toggleMusic() {
    if (music.paused) {
        // Si se pausó fuera del rango del bucle, volver al inicio
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

// 3. CONTADOR
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
                <div>${d < 10 ? '0'+d : d}<span> Días 💍</span></div>
                <div>${h < 10 ? '0'+h : h}<span> Horas</span></div>
                <div>${m < 10 ? '0'+m : m}<span> Mins</span></div>
            </div>
        `;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();
