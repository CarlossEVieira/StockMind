using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IAlertaEstoqueRepository
    {
        Task<List<AlertaEstoque>> ListarAsync();
        Task<AlertaEstoque?> ObterPorIdAsync(int id);
        Task AdicionarAsync(AlertaEstoque alertaEstoque);
        Task AtualizarAsync(AlertaEstoque alertaEstoque);
    }
}