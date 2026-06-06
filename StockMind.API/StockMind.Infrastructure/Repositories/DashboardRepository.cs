using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext appDbContext;

        public DashboardRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<int> ObterTotalProdutosAsync()
        {
            return await appDbContext.Produtos
                .CountAsync(produto => produto.Ativo);
        }

        public async Task<int> ObterTotalEstoqueAsync()
        {
            return await appDbContext.ProdutosEstoque
                .Include(produtoEstoque => produtoEstoque.Produto)
                .Where(produtoEstoque => produtoEstoque.Produto!.Ativo)
                .SumAsync(produtoEstoque => produtoEstoque.Quantidade);
        }

        public async Task<int> ObterAlertasPendentesAsync()
        {
            return await appDbContext.AlertasEstoque
                .Include(alertaEstoque => alertaEstoque.Produto)
                .CountAsync(alertaEstoque =>
                    !alertaEstoque.Resolvido &&
                    alertaEstoque.Produto!.Ativo);
        }

        public async Task<(string nome, string tamanho, int quantidade)?> ObterMenorEstoqueAsync()
        {
            var menorEstoque = await appDbContext.ProdutosEstoque
                .Include(produtoEstoque => produtoEstoque.Produto)
                .Where(produtoEstoque => produtoEstoque.Produto!.Ativo)
                .OrderBy(produtoEstoque => produtoEstoque.Quantidade)
                .FirstOrDefaultAsync();

            if (menorEstoque == null)
            {
                return null;
            }

            return (
                menorEstoque.Produto!.Nome,
                menorEstoque.Tamanho,
                menorEstoque.Quantidade
            );
        }
    }
}