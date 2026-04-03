const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");

wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    wrapper.classList.add("open");
    music.currentTime = 90;
    music.play().catch(() => console.log("Interacción requerida"));

    iniciarLluviaFlores(); // Lluvia de pétalos y hojas

    setTimeout(() => letter.classList.add("front-view"), 1100);

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
    if (music.paused) { music.play(); icon.innerText = "⏸️"; } 
    else { music.pause(); icon.innerText = "▶️"; }
}

function updateCountdown() {
    const target = new Date("Oct 3, 2026 13:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div class="timer">
            <div class="timer-col"><span>DÍAS</span><div class="timer-box">${d}</div></div>
            <div class="timer-col"><span>HORAS</span><div class="timer-box">${h}</div></div>
            <div class="timer-col"><span>MINUTOS</span><div class="timer-box">${m}</div></div>
        </div>`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

function iniciarLluviaFlores() {
    setInterval(() => {
        const el = document.createElement("div");
        el.classList.add("falling-element");
        const esHoja = Math.random() > 0.5;
        el.innerHTML = esHoja 
            ? `<svg width="15" height="30" viewBox="0 0 24 48" fill="#5d663d"><path d="M12 0C4 12 0 24 12 48 24 24 20 12 12 0Z"/></svg>`
            : `<svg width="20" height="20" viewBox="0 0 20 20" fill="white"><circle cx="10" cy="10" r="10"/></svg>`;
        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = (Math.random() * 3 + 4) + "s";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 7000);
    }, 400);
}
