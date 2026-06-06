using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IProdutoEstoqueRepository
    {
        Task<List<ProdutoEstoque>> ListarPorProdutoIdAsync(int produtoId);
        Task<ProdutoEstoque?> ObterPorProdutoIdETamanhoAsync(int produtoId, string tamanho);
        Task AdicionarAsync(ProdutoEstoque produtoEstoque);
        Task AtualizarAsync(ProdutoEstoque produtoEstoque);
    }
}