// LÓGICA DEL CONTROLADOR DE DIAPOSITIVAS (SLIDER)
const wrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('paginationDots');

let currentSlide = 0;
const totalSlides = 12;

// Crear los puntos indicadores dinámicamente
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function updateControls() {
    // Mueve el wrapper horizontalmente según la diapositiva actual
    wrapper.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    // Actualiza el estado activo de los puntos indicadores
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateControls();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateControls();
}

// Eventos de botones en PC
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Control por teclado (flechas derecha e izquierda)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

function goToSlide(index) {
    currentSlide = index;
    updateControls();
}

// Soporte de gestos táctiles (Swipe) para teléfonos móviles
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, {passive: true});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const threshold = 50; // Distancia mínima en píxeles para detectar arrastre
    if (startX - endX > threshold) {
        nextSlide(); // Arrastre hacia la izquierda -> Siguiente
    } else if (endX - startX > threshold) {
        prevSlide(); // Arrastre hacia la derecha -> Anterior
    }
}


// LÓGICA DEL CONTADOR REGRESIVO (COUNTDOWN)
const weddingDate = new Date('October 3, 2026 13:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    // Si ya pasó la fecha de la boda
    if (difference < 0) {
        document.getElementById('countdown').innerHTML = "<p style='color:#c5a059; font-weight:bold; font-size:20px;'>¡Llegó el Gran Día!</p>";
        return;
    }

    // Cálculos de tiempo matemático
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    // Renderizar los valores añadiendo un cero a la izquierda si es un solo dígito
    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}

// Ejecutar cada segundo de forma automática
setInterval(updateCountdown, 1000);
updateCountdown(); // Llamada inicial para evitar delay al cargar la página
