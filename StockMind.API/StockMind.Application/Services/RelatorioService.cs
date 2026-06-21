using StockMind.Application.DataTransferObjects.Relatorios;
using StockMind.Application.Interfaces;

namespace StockMind.Application.Services
{
    public class RelatorioService
    {
        // Repository responsável pelas consultas Dapper
        private readonly IRelatorioDapperRepository relatorioDapperRepository;

        // Construtor
        public RelatorioService(
            IRelatorioDapperRepository relatorioDapperRepository)
        {
            this.relatorioDapperRepository = relatorioDapperRepository;
        }

        /// <summary>
        /// Retorna a quantidade total de produtos ativos.
        /// </summary>
        public async Task<int> ObterTotalProdutosAtivosAsync()
        {
            return await relatorioDapperRepository
                .ObterTotalProdutosAtivosAsync();
        }

        /// <summary>
        /// Retorna os produtos que estão abaixo do estoque mínimo.
        /// Dados obtidos através da Procedure
        /// sp_ListarProdutosEstoqueBaixo.
        /// </summary>
        public async Task<List<ProdutoEstoqueBaixoDataTransferObject>>
            ObterProdutosEstoqueBaixoAsync()
        {
            return await relatorioDapperRepository
                .ObterProdutosEstoqueBaixoAsync();
        }

        /// <summary>
        /// Retorna o produto mais vendido.
        /// Dados obtidos através da Procedure
        /// sp_ProdutoMaisVendido.
        /// </summary>
        public async Task<ProdutoMaisVendidoDataTransferObject?>
            ObterProdutoMaisVendidoAsync()
        {
            return await relatorioDapperRepository
                .ObterProdutoMaisVendidoAsync();
        }

        /// <summary>
        /// Utiliza a Function SQL Server
        /// fn_CalcularQuantidadeReposicao
        /// para calcular a quantidade sugerida
        /// para reposição.
        /// </summary>
        public async Task<int> CalcularQuantidadeReposicaoAsync(
            int quantidadeAtual,
            int quantidadeMinima)
        {
            return await relatorioDapperRepository
                .CalcularQuantidadeReposicaoAsync(
                    quantidadeAtual,
                    quantidadeMinima);
        }
    }
}