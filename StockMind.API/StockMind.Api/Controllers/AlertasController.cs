using Microsoft.AspNetCore.Mvc;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertasController : ControllerBase
    {
        private readonly AlertaEstoqueService alertaEstoqueService;

        public AlertasController(AlertaEstoqueService alertaEstoqueService)
        {
            this.alertaEstoqueService = alertaEstoqueService;
        }

        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var alertasEstoque = await alertaEstoqueService.ListarAsync();
            return Ok(alertasEstoque);
        }

        [HttpPut("{id}/resolver")]
        public async Task<IActionResult> ResolverAsync(int id)
        {
            await alertaEstoqueService.ResolverAsync(id);
            return Ok("Alerta resolvido com sucesso.");
        }
    }
}