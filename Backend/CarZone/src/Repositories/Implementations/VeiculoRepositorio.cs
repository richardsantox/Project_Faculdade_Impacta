using CarZone.src.Context;
using CarZone.src.DTOs;
using CarZone.src.Models;
using Microsoft.EntityFrameworkCore;

namespace CarZone.src.Repositories.Implementations
{
    public class VeiculoRepositorio : IVeiculo
    {
        private readonly CarZoneContexto _contexto;

        public VeiculoRepositorio(CarZoneContexto contexto)
        {
            _contexto = contexto;
        }

        public Task NovoVeiculoAsync(NovoVeiculoDTO veiculo)
        {
            throw new NotImplementedException();
        }
        public async Task<List<Veiculo>> ListarTodosVeiculosAsync()
        {
            return await _contexto.Veiculos.ToListAsync();
                
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
