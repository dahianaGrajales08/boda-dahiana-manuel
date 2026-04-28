const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const btnVolver = document.getElementById("btnVolver");

// Configuración de música
const tiempoInicio = 90; 
const tiempoFin = 130;   

// --- DETECCIÓN DE DISPOSITIVO ---
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// --- FUNCIÓN WHATSAPP UNIVERSAL ---
function abrirWhatsApp(telefono, mensaje) {
    const mensajeCodificado = encodeURIComponent(mensaje);
    let url;
    
    if (isAndroid()) {
        // Android nativo: usa intent o esquema whatsapp://
        url = `whatsapp://send?phone=${telefono}&text=${mensajeCodificado}`;
    } else if (isiOS()) {
        // iOS: usa esquema whatsapp://
        url = `whatsapp://send?phone=${telefono}&text=${mensajeCodificado}`;
    } else {
        // Desktop/otros: usa web.whatsapp.com
        url = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    }
    
    window.location.href = url;
}

// --- BOTONES DE CONFIRMACIÓN ---
function confirmarDahiana() {
    const mensaje = "¡Hola Dahiana! Confirmo mi asistencia a vuestra boda el 03 de octubre de 2026. ¡Qué emoción! 🌿💍";
    abrirWhatsApp("34602732290", mensaje);
}

function confirmarManuel() {
    const mensaje = "¡Hola Manuel! Confirmo mi asistencia a vuestra boda el 03 de octubre de 2026. ¡Qué emoción! 🌿💍";
    abrirWhatsApp("34664593119", mensaje);
}

// --- EVENTO DE APERTURA ---
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Iniciar Música en el segundo 90
    music.currentTime = tiempoInicio;
    music.play().catch(() => {}); 

    // Mantener el bucle personalizado
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

// --- BOTÓN VOLVER ---
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

function toggleMusic() {
    const icon = document.getElementById("musicIcon");
    if (music.paused) { music.play(); icon.innerText = "||"; }
    else { music.pause(); icon.innerText = "▶"; }
}

function updateCountdown() {
    const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer-text">
            <div class="timer-group"><span class="timer-val">${d}</span><span class="timer-lab">Días💍</span></div>
            <span class="timer-sep">:</span>
            <div class="timer-group"><span class="timer-val">${h < 10 ? '0'+h : h}</span><span class="timer-lab">Horas</span></div>
            <span class="timer-sep">:</span>
            <div class="timer-group"><span class="timer-val">${m < 10 ? '0'+m : m}</span><span class="timer-lab">Mins</span></div>
        </div>`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function iniciarLluviaFlores() {
    setInterval(() => {
        const element = document.createElement("div");
        element.classList.add("falling-element");
        element.innerHTML = `<svg width="20" height="24" viewBox="0 0 24 30" fill="#ffffff"><path d="M12 0C4 6 0 15 12 30 24 15 20 6 12 0Z"/></svg>`;
        element.style.left = Math.random() * 100 + "vw";
        element.style.animationDuration = (Math.random() * 4 + 4) + "s";
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 8000);
    }, 400);
}
