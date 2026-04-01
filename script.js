const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const musicIcon = document.getElementById("musicIcon");

wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    wrapper.classList.add("open");
    music.play().catch(() => console.log("Esperando clic para música"));
    iniciarLluvia();

    // Desaparece el sobre y aparece la invitación
    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1000);
    }, 4500); 
});

function toggleMusic() {
    if (music.paused) { music.play(); musicIcon.innerText = "⏸️"; }
    else { music.pause(); musicIcon.innerText = "▶️"; }
}

function updateCountdown() {
    const target = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer">
            <div class="timer-col"><div class="timer-box">${d}</div><span>DÍAS</span></div>
            <div class="timer-col"><div class="timer-box">${h}</div><span>HORAS</span></div>
            <div class="timer-col"><div class="timer-box">${m}</div><span>MINS</span></div>
        </div>`;
}
setInterval(updateCountdown, 1000);

function iniciarLluvia() {
    setInterval(() => {
        const flower = document.createElement("div");
        flower.classList.add("falling-element");
        const esHoja = Math.random() > 0.5;
        flower.innerHTML = esHoja 
            ? `<svg width="15" height="30" viewBox="0 0 24 48" fill="#5d663d"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`
            : `<svg width="20" height="20" fill="white"><circle cx="10" cy="10" r="10"/></svg>`;
        
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = (Math.random() * 3 + 4) + "s";
        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 7000);
    }, 300);
}
