const wrapper = document.getElementById("envelope-wrapper");
const content = document.getElementById("content");
const music = document.getElementById("music");
const letter = document.querySelector(".letter");
const btnVolver = document.getElementById("btnVolver");

const tiempoInicio = 90; 
const tiempoFin = 130;   

wrapper.addEventListener("click", function openEnvelope() {
    if(wrapper.classList.contains("open")) return;
    
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Música activada"));

    wrapper.classList.add("open");
    iniciarLluviaFlores();
    
    setTimeout(() => {
        letter.classList.add("front-view");
    }, 1100); 
    
    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => { content.style.opacity = "1"; }, 100);
        }, 1000);
    }, 4500); 
});

btnVolver.addEventListener("click", () => {
    content.style.opacity = "0";
    
    setTimeout(() => {
        content.style.display = "none";
        
        wrapper.classList.remove("open");
        letter.classList.remove("front-view");
        
        wrapper.style.display = "block";
        
        void wrapper.offsetWidth; 
        
        wrapper.style.opacity = "1";
        
    }, 1000);
});

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
