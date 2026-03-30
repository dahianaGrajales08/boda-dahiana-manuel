// --- CONFIGURACIÓN DE ELEMENTOS ---
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const countdownElement = document.getElementById("countdown");

// --- 1. LÓGICA DE APERTURA DEL SOBRE ---
wrapper.addEventListener("click", () => {
    // Añade la clase para que la tapa gire y la carta suba
    wrapper.classList.add("open");
    
    // Esperamos a que la animación de la carta termine (1.5 segundos)
    setTimeout(() => {
        // Desvanecimiento suave del sobre
        wrapper.style.transition = "opacity 0.8s ease";
        wrapper.style.opacity = "0";
        
        setTimeout(() => {
            wrapper.style.display = "none"; // Quitamos el sobre
            content.style.display = "block"; // Mostramos la invitación
            
            // Pequeño truco para que la invitación aparezca con fade-in
            setTimeout(() => {
                content.style.opacity = "1";
            }, 50);
        }, 800);
    }, 1500);
});

// --- 2. LÓGICA DEL CONTADOR (Estilo Premium) ---
// Fecha de la boda: 3 de Octubre de 2026 a las 13:00
const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        countdownElement.innerHTML = "¡HOY ES NUESTRO GRAN DÍA! 💍";
        return;
    }

    // Cálculos de tiempo
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Formato con ceros a la izquierda (01 en lugar de 1)
    const days = d < 10 ? '0' + d : d;
    const hours = h < 10 ? '0' + h : h;
    const minutes = m < 10 ? '0' + m : m;

    // Insertamos el HTML con el estilo de las fotos de referencia
    countdownElement.innerHTML = `
        <div class="timer">
            <div>${days}<span>DÍAS</span></div>
            <div>${hours}<span>HORAS</span></div>
            <div>${minutes}<span>MINUTOS</span></div>
        </div>
    `;
};

// Ejecutar el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecución inmediata para evitar el salto de 1s al cargar

// --- 3. LÓGICA DE LA MÚSICA ---
function toggleMusic() {
    const btnMusic = document.querySelector('.btn-music');
    
    if (music.paused) {
        music.play().then(() => {
            btnMusic.innerHTML = "🎵 Pausar Música";
        }).catch(error => {
            console.log("El navegador bloqueó el audio. Se requiere interacción del usuario.");
        });
    } else {
        music.pause();
        btnMusic.innerHTML = "🎵 Reproducir Música";
    }
}