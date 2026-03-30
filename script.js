const envelope = document.getElementById("envelope");
const content = document.getElementById("content");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    envelope.style.display = "none";
    content.style.display = "block";
  }, 1000);
});

// CONTADOR
const countdown = document.getElementById("countdown");
const fecha = new Date("Oct 3, 2026 13:00:00").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let diff = fecha - now;

  let dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerHTML = "Faltan " + dias + " días 💍";
}, 1000);

// MÚSICA
function toggleMusic() {
  const music = document.getElementById("music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}