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

        public async Task NovoVeiculoAsync(NovoVeiculoDTO veiculoDto, string? fileName)
        {
            await _contexto.AddAsync(new Veiculo
            {
                Modelo = veiculoDto.Modelo,
                Marca = veiculoDto.Marca,
                Ano = veiculoDto.Ano,
                Valor = veiculoDto.Valor,
                Tipo = veiculoDto.Tipo,
                ImagemUrl = string.IsNullOrEmpty(fileName) ? null : $"/imagens/{fileName}"
            });

            await _contexto.SaveChangesAsync();
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
