// FUNÇÕES COMPARTILHADAS ENTRE PÁGINAS

async function fetchVeiculos() {
    const grid = document.querySelector('.car-grid');
    if (grid) grid.innerHTML = '<p class="loading">Carregando...</p>';

    const API_URL = 'http://localhost:5062/api/Veiculos/todos';
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
        article.dataset.veiculo_id = v.id || v.Id || '';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = modelo;

        const info = document.createElement('div');
        info.className = 'card-info';

        const h3 = document.createElement('h3');
        h3.textContent = modelo;

        const p = document.createElement('p');
        p.textContent = valor;

        const btnOptions = document.createElement('button');
        btnOptions.className = 'btn-card-options';
        btnOptions.innerHTML = '⋮';
        btnOptions.title = 'Opções';
        btnOptions.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllOptionsMenus();
            optionsMenu.classList.toggle('hidden');
        };

        const optionsMenu = document.createElement('div');
        optionsMenu.className = 'options-menu hidden';
        optionsMenu.onclick = (e) => e.stopPropagation();

        const btnEdit = document.createElement('button');
        btnEdit.type = 'button';
        btnEdit.textContent = 'Editar';
        btnEdit.className = 'options-menu-button';
        btnEdit.disabled = true;
        btnEdit.title = 'Em breve';
        btnEdit.onclick = () => editVeiculo(v.id || v.Id, modelo);

        const btnDelete = document.createElement('button');
        btnDelete.type = 'button';
        btnDelete.textContent = 'Deletar';
        btnDelete.className = 'options-menu-button options-menu-delete';
        btnDelete.onclick = () => deleteVeiculo(v.id || v.Id, modelo, article);

        optionsMenu.appendChild(btnEdit);
        optionsMenu.appendChild(btnDelete);

        info.appendChild(h3);
        info.appendChild(p);
        article.appendChild(img);
        article.appendChild(btnOptions);
        article.appendChild(optionsMenu);
        article.appendChild(info);

        grid.appendChild(article);
    });
}

function closeAllOptionsMenus() {
    document.querySelectorAll('.options-menu').forEach(menu => menu.classList.add('hidden'));
}

function editVeiculo(veiculoId, modelo) {
    alert(`Editar veículo ${modelo} ainda não está disponível.`);
}


async function deleteVeiculo(veiculoId, modelo, cardElement) {

    const confirmacao = confirm(`Tem certeza que deseja deletar ${modelo}?`);
    if (!confirmacao) {
        return;
    }

    try {
        const API_URL = `http://localhost:5062/api/Veiculos/${veiculoId}`;
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            const errText = await response.text().catch(() => response.statusText);
            throw new Error(`Erro ao deletar veículo: ${response.status} ${errText}`);
        }

        cardElement.remove();
        console.log(`Veículo ${modelo} deletado com sucesso`);
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
        alert(`Erro ao deletar veículo: ${error.message}`);
    }
}

document.addEventListener('click', closeAllOptionsMenus);
