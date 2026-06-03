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

function formatCurrency(value) {
    const numero = Number(value || 0);
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        const marca = v.Marca || v.marca || '';
        const modelo = v.Modelo || v.modelo || v.Nome || 'Modelo desconhecido';
        const ano = v.Ano || v.ano || '';
        const valorRaw = v.Valor != null ? v.Valor : v.valor || 0;
        const valor = formatCurrency(valorRaw);
        const tipo = v.Tipo || v.tipo || '';

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
        btnEdit.title = 'Editar veículo';
        btnEdit.onclick = () => openEditVeiculoModal({
            id: v.id || v.Id,
            marca,
            modelo,
            ano,
            valor: valorRaw,
            tipo,
            imagemUrl: v.imagemUrl || ''
        });

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

function openEditVeiculoModal(veiculo) {
    const modal = document.getElementById('editVehicleModal');
    if (!modal) return;

    document.getElementById('editVehicleId').value = veiculo.id || '';
    document.getElementById('editMarca').value = veiculo.marca || '';
    document.getElementById('editModelo').value = veiculo.modelo || '';
    document.getElementById('editAno').value = veiculo.ano || '';
    document.getElementById('editValor').value = veiculo.valor || '';
    document.getElementById('editTipo').value = veiculo.tipo || '';

    modal.classList.add('open');
    document.body.classList.add('modal-open');
}

function closeEditVeiculoModal() {
    const modal = document.getElementById('editVehicleModal');
    if (!modal) return;

    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    
    // Limpar o input de arquivo
    const imagemInput = document.getElementById('editImagem');
    if (imagemInput) {
        imagemInput.value = '';
    }
}

function updateCardAfterEdit(veiculoAtualizado) {
    const article = document.querySelector(`.car-card[data-veiculo_id="${veiculoAtualizado.id || veiculoAtualizado.Id}"]`);
    if (!article) return;

    const h3 = article.querySelector('h3');
    const p = article.querySelector('p');
    if (h3) {
        h3.textContent = veiculoAtualizado.Modelo || veiculoAtualizado.modelo || h3.textContent;
    }
    if (p) {
        const valor = formatCurrency(veiculoAtualizado.Valor ?? veiculoAtualizado.valor ?? 0);
        p.textContent = valor;
    }
}


async function saveVeiculoEdicao(event) {
    event.preventDefault();

    const id = document.getElementById('editVehicleId').value;
    const marca = document.getElementById('editMarca').value.trim();
    const modelo = document.getElementById('editModelo').value.trim();
    const ano = document.getElementById('editAno').value;
    const valor = document.getElementById('editValor').value;
    const tipo = document.getElementById('editTipo').value.trim();
    const imagemInput = document.getElementById('editImagem');
    const imagem = imagemInput.files[0];

    if (!id || !marca || !modelo || !ano || !valor || !tipo) {
        alert('Preencha todos os campos obrigatórios antes de salvar.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('ID', id);
        formData.append('Marca', marca);
        formData.append('Modelo', modelo);
        formData.append('Ano', ano);
        formData.append('Valor', valor);
        formData.append('Tipo', tipo);
        formData.append('ImagemUrl', '');
        
        if (imagem && imagem.size > 0) {
            formData.append('imagem', imagem);
        }

        console.log('Enviando FormData para edição:', { ID: id, Marca: marca, Modelo: modelo, Ano: ano, Valor: valor, Tipo: tipo, temImagem: !!imagem });
        
        const response = await fetch(`http://localhost:5062/api/Veiculos/${id}`, {
            method: 'PUT',
            body: formData
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errText = await response.text().catch(() => response.statusText);
            console.error('Erro completo do servidor:', errText);
            throw new Error(`Erro ao editar veículo: ${response.status} - ${errText}`);
        }

        const resultado = await response.json().catch(() => ({}));
        updateCardAfterEdit({ id, Modelo: modelo, Valor: valor });
        closeEditVeiculoModal();
        alert('Veículo atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao editar veículo:', error);
        alert(error.message || 'Não foi possível atualizar este veículo.');
    }
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

document.addEventListener('click', (event) => {
    if (event.target.id === 'editVehicleModal') {
        closeEditVeiculoModal();
        return;
    }

    closeAllOptionsMenus();
});

const editVehicleForm = document.getElementById('editVehicleForm');
if (editVehicleForm) {
    editVehicleForm.addEventListener('submit', saveVeiculoEdicao);
}

const closeEditModalBtn = document.getElementById('closeEditModalBtn');
if (closeEditModalBtn) {
    closeEditModalBtn.addEventListener('click', closeEditVeiculoModal);
}

const cancelEditBtn = document.getElementById('cancelEditBtn');
if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', closeEditVeiculoModal);
}

