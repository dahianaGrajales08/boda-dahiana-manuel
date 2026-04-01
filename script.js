const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

const tiempoInicio = 90; 
const tiempoFin = 130;   

wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    music.currentTime = tiempoInicio;
    music.play().then(() => {
        musicIcon.innerText = "⏸️";
        musicText.innerText = "Pausar";
    }).catch(e => console.log("Audio esperando interacción"));

    music.addEventListener("timeupdate", () => {
        if (music.currentTime >= tiempoFin) {
            music.currentTime = tiempoInicio;
            music.play();
        }
    });

    wrapper.classList.add("open");
    
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
    }, 4000); 
});

function toggleMusic() {
    if (music.paused) {
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
