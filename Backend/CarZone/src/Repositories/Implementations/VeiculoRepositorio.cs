using CarZone.src.DTOs;
using CarZone.src.Models;

namespace CarZone.src.Repositories.Implementations
{
    public class VeiculoRepositorio : IVeiculo
    {
        public Task NovoVeiculoAsync(NovoVeiculoDTO veiculo)
        {
            throw new NotImplementedException();
        }
        public Task<List<ListarVeiculosDTO>> ListarTodosVeiculosAsync()
        {
            throw new NotImplementedException();
        }
        public Task AtualizarVeiculoAsync(AtualizarVeiculoDTO veiculo)
        {
            throw new NotImplementedException();
        }

        public Task DeletarVeiculoAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
