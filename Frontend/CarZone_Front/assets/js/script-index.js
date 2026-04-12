// LÓGICA DA PÁGINA INDEX

const backgroundImages = [
    'assets/images/porsche.jpg',
    'assets/images/bg2.jpg',
    'assets/images/lamborghini.jpg'
];

let currentImageIndex = 1;

function nextSlide() {
    currentImageIndex++;
    if (currentImageIndex > backgroundImages.length) {
        currentImageIndex = 1;
    }
    updateBackground();
}

function prevSlide() {
    currentImageIndex--;
    if (currentImageIndex < 1) {
        currentImageIndex = backgroundImages.length;
    }
    updateBackground();
}

function updateBackground() {
    const topSection = document.querySelector('.top-section');
    
    if (!topSection) {
        console.warn('Elemento .top-section não encontrado no DOM');
        return;
    }
    
    const imageUrl = backgroundImages[currentImageIndex - 1];
    topSection.style.backgroundImage = `url('${imageUrl}')`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateBackground();
});

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const veiculos = await fetchVeiculos();
        console.log('Veículos recebidos do backend:', veiculos);
        renderVeiculos(veiculos);
    } catch (err) {
        console.error(err);
        const grid = document.querySelector('.car-grid');
        if (grid) grid.innerHTML = '<p class="error">Erro ao carregar veículos.</p>';
    }
});
