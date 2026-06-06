using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IProdutoRepository
    {
        Task<List<Produto>> ListarAsync();
        Task<Produto?> ObterPorIdAsync(int id);
        Task AdicionarAsync(Produto produto);
        Task AtualizarAsync(Produto produto);
        Task RemoverAsync(Produto produto);
    }
}