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
    const imageUrl = backgroundImages[currentImageIndex - 1];
    topSection.style.backgroundImage = `url('${imageUrl}')`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateBackground();
    inicializarFormularioCadastro();
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


function renderVeiculos(veiculos) {
    const grid = document.querySelector('.car-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!veiculos || veiculos.length === 0) {
        grid.innerHTML = '<p class="empty">Nenhum veículo encontrado.</p>';
        return;
    }

    veiculos.forEach(v => {
        const imgSrc = v.imagemUrl ? "http://localhost:5062" + v.imagemUrl :  "assets/images/placeholder.svg";        
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

// FORMULÁRIO DE CADASTRO DE VEÍCULO
function inicializarFormularioCadastro() {
    const formulario = document.getElementById('vehicleForm');
    if (!formulario) return;

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('marca', document.getElementById('marca').value);
        formData.append('modelo', document.getElementById('modelo').value);
        formData.append('ano', document.getElementById('ano').value);
        formData.append('valor', document.getElementById('valor').value);
        formData.append('tipo', document.getElementById('tipo').value);
        formData.append('imagem', document.getElementById('imagem').files[0]);

        try {
            const response = await fetch('http://localhost:5062/api/Veiculos', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Veículo cadastrado com sucesso!');
                formulario.reset();
                // Redirecionar para catálogo após 1.5 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                const error = await response.text();
                alert(`Erro ao cadastrar veículo: ${error}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar dados: ' + error.message);
        }
    });
}
