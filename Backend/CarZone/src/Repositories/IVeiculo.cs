using CarZone.src.DTOs;
using CarZone.src.Models;

namespace CarZone.src.Repositories
{
    public interface IVeiculo
    {
        Task NovoVeiculoAsync(NovoVeiculoDTO veiculo);
        Task<List<ListarVeiculosDTO>> ListarTodosVeiculosAsync();
        Task AtualizarVeiculoAsync(AtualizarVeiculoDTO veiculo);
        Task DeletarVeiculoAsync(int id);

    }
}
