using CarZone.src.DTOs;
using CarZone.src.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarZone.src.Controllers
{
    [ApiController]
    [Route("api/Veiculos")]
    public class VeiculoController : ControllerBase
    {
        private readonly IVeiculo _repositorio;

        public VeiculoController(IVeiculo repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet("todos")]
        public async Task<ActionResult> ListarTodosVeiculosAsync()
        {
            var lista = await _repositorio.ListarTodosVeiculosAsync();

            if (lista.Count == 0) return NoContent();

            return Ok(lista);
        }

        [HttpPost("upload")]
        public async Task<ActionResult> NovoVeiculoAsync(
            [FromForm] NovoVeiculoDTO veiculo, IFormFile imagem)
        {
            string fileName = string.Empty;
            if (imagem != null && imagem.Length > 0)
            {
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");
                Directory.CreateDirectory(caminhoPasta);

                var nomeArquivo = $"{Guid.NewGuid().ToString()}_{imagem.FileName}";
                var caminhoArquivo = Path.Combine(caminhoPasta, nomeArquivo);
                fileName = nomeArquivo;

                using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }
            }

            await _repositorio.NovoVeiculoAsync(veiculo, fileName);

            return Created($"api/Veiculos", veiculo);
        }

        [HttpDelete("{idVeiculo}")]
        public async Task<ActionResult> DeletarVeiculo([FromRoute] int idVeiculo)
        {
            try
            {
                await _repositorio.DeletarVeiculoAsync(idVeiculo);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { Mensagem = ex.Message });
            }
        }
    }
}
