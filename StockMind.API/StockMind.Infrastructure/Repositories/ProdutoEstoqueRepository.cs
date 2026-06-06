using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class ProdutoEstoqueRepository : IProdutoEstoqueRepository
    {
        private readonly AppDbContext contextoBancoDados;

        public ProdutoEstoqueRepository(AppDbContext contextoBancoDados)
        {
            this.contextoBancoDados = contextoBancoDados;
        }

        public async Task<ProdutoEstoque?> ObterPorIdAsync(int id)
        {
            return await contextoBancoDados.ProdutosEstoque
                .Include(produtoEstoque => produtoEstoque.Produto)
                .FirstOrDefaultAsync(produtoEstoque => produtoEstoque.Id == id);
        }

        public async Task<List<ProdutoEstoque>> ListarPorProdutoIdAsync(int produtoId)
        {
            return await contextoBancoDados.ProdutosEstoque
                .Where(produtoEstoque => produtoEstoque.ProdutoId == produtoId)
                .ToListAsync();
        }

        public async Task<ProdutoEstoque?> ObterPorProdutoIdETamanhoAsync(int produtoId, string tamanho)
        {
            return await contextoBancoDados.ProdutosEstoque
                .FirstOrDefaultAsync(produtoEstoque =>
                    produtoEstoque.ProdutoId == produtoId &&
                    produtoEstoque.Tamanho == tamanho);
        }

        public async Task AdicionarAsync(ProdutoEstoque produtoEstoque)
        {
            await contextoBancoDados.ProdutosEstoque.AddAsync(produtoEstoque);
            await contextoBancoDados.SaveChangesAsync();
        }

        public async Task AtualizarAsync(ProdutoEstoque produtoEstoque)
        {
            contextoBancoDados.ProdutosEstoque.Update(produtoEstoque);
            await contextoBancoDados.SaveChangesAsync();
        }

        public async Task SalvarAlteracoesAsync()
        {
            await contextoBancoDados.SaveChangesAsync();
        }
    }
}