// LÓGICA DA PÁGINA CADASTRO 

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
            const response = await fetch('http://localhost:5062/api/Veiculos/upload', {
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

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioCadastro();
});
