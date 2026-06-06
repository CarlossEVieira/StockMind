using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IVendaRepository
    {
        Task AdicionarAsync(Venda venda);
        Task<List<Venda>> ListarAsync();
    }
}