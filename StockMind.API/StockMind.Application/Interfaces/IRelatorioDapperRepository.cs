using StockMind.Application.DataTransferObjects.Relatorios;

namespace StockMind.Application.Interfaces
{
    public interface IRelatorioDapperRepository
    {
        // Retorna a quantidade total de produtos ativos
        Task<int> ObterTotalProdutosAtivosAsync();

        // Retorna os produtos com estoque baixo
        Task<List<ProdutoEstoqueBaixoDataTransferObject>>
            ObterProdutosEstoqueBaixoAsync();

        // Retorna o produto mais vendido
        Task<ProdutoMaisVendidoDataTransferObject?>
            ObterProdutoMaisVendidoAsync();

        // Consulta a Function fn_CalcularQuantidadeReposicao no SQL Server
        Task<int> CalcularQuantidadeReposicaoAsync(
            int quantidadeAtual,
            int quantidadeMinima);
    }
}