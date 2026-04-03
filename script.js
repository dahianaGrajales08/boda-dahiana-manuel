const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");

const tiempoInicio = 90; 
const tiempoFin = 130;   

wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Iniciar Música
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Esperando interacción"));

    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) music.currentTime = tiempoInicio;
    });

    // Abrir sobre
    wrapper.classList.add("open");
    
    // Iniciar lluvia de hojas y pétalos
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
    }, 4500); 
});

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

function updateCountdown() {
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
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
                <div class="timer-col"><span>DÍAS💍</span><div class="timer-box">${d < 10 ? '0'+d : d}</div></div>
                <div class="timer-col"><span>HORAS</span><div class="timer-box">${h < 10 ? '0'+h : h}</div></div>
                <div class="timer-col"><span>MINS</span><div class="timer-box">${m < 10 ? '0'+m : m}</div></div>
            </div>`;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function iniciarLluviaFlores() {
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");
        const esHoja = Math.random() > 0.5;
        
        element.innerHTML = esHoja 
            ? `<svg width="18" height="35" viewBox="0 0 24 48" fill="#5d663d"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`
            : `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;

        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 4 + 4) + "s";
        element.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        element.style.setProperty('--rot', (Math.random() * 360 + 180) + 'deg');

        document.body.appendChild(element);
        setTimeout(() => element.remove(), 8000);
    }, 400); 
}
