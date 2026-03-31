// ELEMENTOS
const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");

// 1. ABRIR SOBRE Y CAMBIAR CAPA DE CARTA
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    // Inicia apertura
    wrapper.classList.add("open");
    
    // MOMENTO CLAVE: Cuando la tapa se abre (1.2s), la carta pasa al frente
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1000); 
    
    // TIEMPO DE MUESTRA: Esperamos 3.5 segundos para que lean la carta
    // antes de pasar a la invitación completa
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

// 2. CONTADOR
const targetDate = new Date("Oct 3, 2026 13:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer">
            <div>${d < 10 ? '0'+d : d}<span> DÍAS 💍</span></div>
            <div>${h < 10 ? '0'+h : h}<span> HORAS</span></div>
            <div>${m < 10 ? '0'+m : m}<span> MINS</span></div>
        </div>
    `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 3. MÚSICA
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
