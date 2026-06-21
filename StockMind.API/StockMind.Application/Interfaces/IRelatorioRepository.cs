using StockMind.Application.DataTransferObjects.Relatorios;

namespace StockMind.Application.Interfaces
{
    public interface IRelatorioRepository
    {
        // Retorna produtos com estoque baixo
        Task<List<ProdutoEstoqueBaixoDataTransferObject>>
            ObterProdutosEstoqueBaixoAsync();
    }
}