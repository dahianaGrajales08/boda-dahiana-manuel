// La lógica de pausa se mantiene intacta para que NO deje de funcionar
function toggleMusic() {
    const music = document.getElementById("music");
    const icon = document.getElementById("musicIcon");
    
    if (music.paused) {
        music.play();
        icon.innerText = "||"; 
    } else {
        music.pause();
        icon.innerText = "▶";
    }
}

// El evento del sobre ahora tiene un delay de 4 segundos antes de mostrar el contenido
// para que se aprecie el fondo y los lirios subiendo.
wrapper.addEventListener("click", () => {
    if(wrapper.classList.contains("open")) return;
    
    music.currentTime = tiempoInicio;
    music.play().catch(e => console.log("Play"));

    wrapper.classList.add("open");
    iniciarLluviaFlores();
    
    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1500);
    }, 4000); 
});
