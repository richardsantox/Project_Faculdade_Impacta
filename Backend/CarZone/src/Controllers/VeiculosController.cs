using CarZone.src.Repositories;
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
    }
}
