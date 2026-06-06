using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext contextoBancoDados;

        public ProdutoRepository(AppDbContext contextoBancoDados)
        {
            this.contextoBancoDados = contextoBancoDados;
        }

        public async Task<List<Produto>> ListarAsync()
        {
            return await contextoBancoDados.Produtos
                .Include(produto => produto.EstoquesPorTamanho)
                .Where(produto => produto.Ativo)
                .ToListAsync();
        }

        public async Task<Produto?> ObterPorIdAsync(int id)
        {
            return await contextoBancoDados.Produtos
                .Include(produto => produto.EstoquesPorTamanho)
                .FirstOrDefaultAsync(produto => produto.Id == id && produto.Ativo);
        }

        public async Task AdicionarAsync(Produto produto)
        {
            await contextoBancoDados.Produtos.AddAsync(produto);
            await contextoBancoDados.SaveChangesAsync();
        }

        public async Task AtualizarAsync(Produto produto)
        {
            contextoBancoDados.Produtos.Update(produto);
            await contextoBancoDados.SaveChangesAsync();
        }

        public async Task RemoverAsync(Produto produto)
        {
            produto.Ativo = false;
            contextoBancoDados.Produtos.Update(produto);
            await contextoBancoDados.SaveChangesAsync();
        }

        public async Task SalvarAlteracoesAsync()
        {
            await contextoBancoDados.SaveChangesAsync();
        }
    }
}