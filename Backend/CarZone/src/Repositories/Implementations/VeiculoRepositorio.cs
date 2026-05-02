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
                DataCriado = DateTime.UtcNow,
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

        public async Task DeletarVeiculoAsync(int id)
        {
            var VeiculoEncontrado = _contexto.Veiculos.FirstOrDefault(v => v.ID == id);

            if (VeiculoEncontrado == null) throw new Exception("Veículo não encontrado");

            if (!string.IsNullOrEmpty(VeiculoEncontrado.ImagemUrl))
            {
                var caminhoImagem = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot", VeiculoEncontrado.ImagemUrl.TrimStart('/'));

                if (File.Exists(caminhoImagem))
                {
                    File.Delete(caminhoImagem);
                }
            }

            _contexto.Veiculos.Remove(VeiculoEncontrado);

            await _contexto.SaveChangesAsync();
        }
    }
}
