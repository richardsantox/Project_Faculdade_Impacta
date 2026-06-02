using CarZone.src.DTOs;
using CarZone.src.Models;

namespace CarZone.src.Repositories
{
    public interface IVeiculo
    {
        Task NovoVeiculoAsync(NovoVeiculoDTO veiculo, string? fileName);
        Task<List<Veiculo>> ListarTodosVeiculosAsync();
        Task AtualizarVeiculoAsync(AtualizarVeiculoDTO veiculo, string? fileName);
        Task DeletarVeiculoAsync(int id);
    }
}
