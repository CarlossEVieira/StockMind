using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IMovimentacaoEstoqueRepository
    {
        Task AdicionarAsync(MovimentacaoEstoque movimentacaoEstoque);

        Task<List<MovimentacaoEstoque>> ListarAsync();

        // Soma todas as saídas de um produto/tamanho
        // nos últimos X dias
        Task<int> ObterTotalSaidasPorProdutoEstoqueNosUltimosDiasAsync(
            int produtoEstoqueId,
            int quantidadeDias);
    }
}