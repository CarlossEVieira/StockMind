using Microsoft.AspNetCore.Mvc;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        // Service responsável pelos relatórios
        private readonly RelatorioService relatorioService;

        // Construtor
        public RelatoriosController(
            RelatorioService relatorioService)
        {
            this.relatorioService = relatorioService;
        }

        /// <summary>
        /// Retorna os produtos que estão abaixo
        /// do estoque mínimo.
        /// Dados obtidos através da Procedure
        /// sp_ListarProdutosEstoqueBaixo.
        /// </summary>
        [HttpGet("estoque-baixo")]
        public async Task<IActionResult>
            ObterProdutosEstoqueBaixo()
        {
            var resultado =
                await relatorioService
                    .ObterProdutosEstoqueBaixoAsync();

            return Ok(resultado);
        }

        /// <summary>
        /// Retorna a quantidade total
        /// de produtos ativos.
        /// </summary>
        [HttpGet("total-produtos-ativos")]
        public async Task<IActionResult>
            ObterTotalProdutosAtivos()
        {
            var total =
                await relatorioService
                    .ObterTotalProdutosAtivosAsync();

            return Ok(total);
        }

        /// <summary>
        /// Retorna o produto mais vendido.
        /// Dados obtidos através da Procedure
        /// sp_ProdutoMaisVendido.
        /// </summary>
        [HttpGet("produto-mais-vendido")]
        public async Task<IActionResult>
            ObterProdutoMaisVendido()
        {
            var resultado =
                await relatorioService
                    .ObterProdutoMaisVendidoAsync();

            return Ok(resultado);
        }

        /// <summary>
        /// Utiliza a Function SQL Server
        /// fn_CalcularQuantidadeReposicao
        /// para calcular uma sugestão
        /// de reposição de estoque.
        /// </summary>
        [HttpGet("calcular-reposicao")]
        public async Task<IActionResult>
            CalcularQuantidadeReposicao(
                int quantidadeAtual,
                int quantidadeMinima)
        {
            var quantidadeSugerida =
                await relatorioService
                    .CalcularQuantidadeReposicaoAsync(
                        quantidadeAtual,
                        quantidadeMinima);

            return Ok(quantidadeSugerida);
        }
    }
}