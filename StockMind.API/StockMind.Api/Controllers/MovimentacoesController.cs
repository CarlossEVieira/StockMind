using Microsoft.AspNetCore.Mvc;
using StockMind.Application.Interfaces;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacoesController : ControllerBase
    {
        private readonly IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository;

        public MovimentacoesController(IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository)
        {
            this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
        }

        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var movimentacoes = await movimentacaoEstoqueRepository.ListarAsync();

            return Ok(movimentacoes);
        }
    }
}