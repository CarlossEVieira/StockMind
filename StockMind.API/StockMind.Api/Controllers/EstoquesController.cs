using Microsoft.AspNetCore.Mvc;
using StockMind.Application.DataTransferObjects;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstoquesController : ControllerBase
    {
        private readonly EstoqueService estoqueService;

        public EstoquesController(EstoqueService estoqueService)
        {
            this.estoqueService = estoqueService;
        }

        [HttpGet("produto/{produtoId}")]
        public async Task<IActionResult> ListarPorProdutoIdAsync(int produtoId)
        {
            var estoques = await estoqueService.ListarPorProdutoIdAsync(produtoId);
            return Ok(estoques);
        }

        [HttpPost("entrada")]
        public async Task<IActionResult> RegistrarEntradaAsync([FromBody] EntradaEstoqueDataTransferObject entradaEstoqueDataTransferObject)
        {
            try
            {
                await estoqueService.RegistrarEntradaAsync(entradaEstoqueDataTransferObject);
                return Ok("Entrada de estoque registrada com sucesso.");
            }
            catch (Exception excecao)
            {
                return BadRequest(excecao.Message);
            }
       }
    }
}
