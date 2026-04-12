// FUNÇÕES COMPARTILHADAS ENTRE PÁGINAS

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
