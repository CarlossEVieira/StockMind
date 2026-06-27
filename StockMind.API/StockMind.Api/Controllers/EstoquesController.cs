using Microsoft.AspNetCore.Mvc;
using StockMind.Application.DataTransferObjects;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstoquesController : ControllerBase
    {
        // Service de estoque
        private readonly EstoqueService estoqueService;

        // Construtor
        public EstoquesController(
            EstoqueService estoqueService)
        {
            this.estoqueService = estoqueService;
        }

        // Lista os tamanhos de um produto
        [HttpGet("produto/{produtoId}")]
        public async Task<IActionResult> ListarPorProdutoIdAsync(
            int produtoId)
        {
            var estoques =
                await estoqueService.ListarPorProdutoIdAsync(
                    produtoId);

            return Ok(estoques);
        }

        // Registra entrada individual
        [HttpPost("entrada")]
        public async Task<IActionResult> RegistrarEntradaAsync(
            [FromBody]
            EntradaEstoqueDataTransferObject entradaEstoqueDataTransferObject)
        {
            try
            {
                await estoqueService.RegistrarEntradaAsync(
                    entradaEstoqueDataTransferObject);

                return Ok(
                    "Entrada de estoque registrada com sucesso.");
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message);
            }
        }

        // Registra reposição completa
        [HttpPost("reposicao-completa")]
        public async Task<IActionResult> RegistrarReposicaoCompletaAsync(
            [FromBody]
            ReposicaoCompletaDataTransferObject reposicaoCompletaDataTransferObject)
        {
            try
            {
                await estoqueService
                    .RegistrarReposicaoCompletaAsync(
                        reposicaoCompletaDataTransferObject);

                return Ok(
                    "Reposição registrada com sucesso.");
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message);
            }
        }
    }
}