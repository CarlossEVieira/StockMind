using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class MovimentacaoEstoqueRepository : IMovimentacaoEstoqueRepository
    {
        private readonly AppDbContext appDbContext;

        public MovimentacaoEstoqueRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task AdicionarAsync(MovimentacaoEstoque movimentacaoEstoque)
        {
            await appDbContext.MovimentacoesEstoque.AddAsync(movimentacaoEstoque);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<MovimentacaoEstoque>> ListarAsync()
        {
            return await appDbContext.MovimentacoesEstoque
                .Include(movimentacaoEstoque => movimentacaoEstoque.Produto)
                .Include(movimentacaoEstoque => movimentacaoEstoque.ProdutoEstoque)
                .OrderByDescending(movimentacaoEstoque => movimentacaoEstoque.DataMovimentacao)
                .ToListAsync();
        }

        public async Task<int> ObterTotalSaidasPorProdutoEstoqueNosUltimosDiasAsync(
            int produtoEstoqueId,
            int quantidadeDias)
        {
            // Define a data inicial para considerar as movimentações recentes
            var dataInicial = DateTime.Now.AddDays(-quantidadeDias);

            // Soma todas as movimentações de saída daquele produto/tamanho
            return await appDbContext.MovimentacoesEstoque
                .Where(movimentacaoEstoque =>
                    movimentacaoEstoque.ProdutoEstoqueId == produtoEstoqueId &&
                    movimentacaoEstoque.TipoMovimentacao == "Saida" &&
                    movimentacaoEstoque.DataMovimentacao >= dataInicial)
                .SumAsync(movimentacaoEstoque => movimentacaoEstoque.Quantidade);
        }
    }
}