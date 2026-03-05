const backgroundImages = [
    'assets/images/porsche.jpg',
    'assets/images/bg2.jpg',
    'assets/images/lamborghini.jpg'  // Inserir outras imgs
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
    const imageUrl = backgroundImages[currentImageIndex - 1];
    topSection.style.backgroundImage = `url('${imageUrl}')`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateBackground();
});
