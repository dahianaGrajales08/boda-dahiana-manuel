const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const btnVolver = document.getElementById("btnVolver");

const tiempoInicio = 90; 
const tiempoFin = 130;   

// ABRIR SOBRE
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Interacción necesaria"));

    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
        }
    });

    wrapper.classList.add("open");
    iniciarLluviaFlores();
    
    setTimeout(() => { letter.classList.add("front-view"); }, 1100); 
    
    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 4500);
});

// BOTÓN VOLVER
btnVolver.addEventListener("click", () => {
    content.style.opacity = "0";
    setTimeout(() => {
        content.style.display = "none";
        wrapper.classList.remove("open");
        letter.classList.remove("front-view");
        wrapper.style.display = "block";
        setTimeout(() => wrapper.style.opacity = "1", 50);
    }, 1000);
});

// REPRODUCTOR
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

// CONTADOR
function updateCountdown() {
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "<h2>¡Llegó el día!</h2>";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer-container">
            <div class="timer-unit"><span class="timer-value">${d}</span><span class="timer-label">Días💍</span></div>
            <span class="timer-sep">:</span>
            <div class="timer-unit"><span class="timer-value">${h < 10 ? '0'+h : h}</span><span class="timer-label">Horas</span></div>
            <span class="timer-sep">:</span>
            <div class="timer-unit"><span class="timer-value">${m < 10 ? '0'+m : m}</span><span class="timer-label">Mins</span></div>
        </div>`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// LLUVIA DE FLORES
function iniciarLluviaFlores() {
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");
        const esHoja = Math.random() > 0.5;
        if (esHoja) {
            element.innerHTML = `<svg width="18" height="35" viewBox="0 0 24 48" fill="#5d663d"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`;
        } else {
            element.innerHTML = `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;
        }
        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 4 + 4) + "s";
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 8000);
    }, 400);
}
