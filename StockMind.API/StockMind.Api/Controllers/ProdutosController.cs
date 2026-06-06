using Microsoft.AspNetCore.Mvc;
using StockMind.Application.DataTransferObjects;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutoService produtoService;

        public ProdutosController(ProdutoService produtoService)
        {
            this.produtoService = produtoService;
        }

        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var produtos = await produtoService.ListarAsync();
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var produto = await produtoService.ObterPorIdAsync(id);

            if (produto == null)
            {
                return NotFound("Produto não encontrado.");
            }

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] ProdutoCriarDataTransferObject produtoCriarDataTransferObject)
        {
            await produtoService.CriarAsync(produtoCriarDataTransferObject);
            return Ok("Produto criado com sucesso.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarAsync(int id, [FromBody] ProdutoAtualizarDataTransferObject produtoAtualizarDataTransferObject)
        {
            await produtoService.AtualizarAsync(id, produtoAtualizarDataTransferObject);
            return Ok("Produto atualizado com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirAsync(int id)
        {
            await produtoService.ExcluirAsync(id);
            return Ok("Produto excluído com sucesso.");
        }
    }
}
