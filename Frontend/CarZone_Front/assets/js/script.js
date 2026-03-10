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


async function fetchVeiculos() {
    const API_URL = 'http://localhost:5062/api/Veiculos/todos';
    const grid = document.querySelector('.car-grid');
    if (grid) grid.innerHTML = '<p class="loading">Carregando...</p>';

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => response.statusText);
        throw new Error(`Erro ao buscar veículos: ${response.status} ${errText}`);
    }

    const data = await response.json();
    return data;
}

// Example usage: call fetchVeiculos on load and log the result (rendering is Step 4)
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

// -----------------------------
// Step 4: renderVeiculos()
// -----------------------------
function renderVeiculos(veiculos) {
    const grid = document.querySelector('.car-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!veiculos || veiculos.length === 0) {
        grid.innerHTML = '<p class="empty">Nenhum veículo encontrado.</p>';
        return;
    }

    veiculos.forEach(v => {
        const imgSrc = v.ImagemUrl || v.Imagem || 'assets/images/placeholder.svg';
        const modelo = v.Modelo || v.modelo || v.Nome || 'Modelo desconhecido';
        const valorRaw = v.Valor != null ? v.Valor : v.valor || 0;
        const valor = Number(valorRaw).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const article = document.createElement('article');
        article.className = 'car-card';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = modelo;

        const info = document.createElement('div');
        info.className = 'card-info';

        const h3 = document.createElement('h3');
        h3.textContent = modelo;

        const p = document.createElement('p');
        p.textContent = valor;

        info.appendChild(h3);
        info.appendChild(p);
        article.appendChild(img);
        article.appendChild(info);

        grid.appendChild(article);
    });
}
