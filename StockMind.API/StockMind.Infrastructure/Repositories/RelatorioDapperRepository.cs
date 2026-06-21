// Biblioteca Dapper para consultas SQL
using Dapper;

// Provider de conexão para SQL Server
using Microsoft.Data.SqlClient;

// Leitura do appsettings.json
using Microsoft.Extensions.Configuration;

// DTOs
using StockMind.Application.DataTransferObjects.Relatorios;

// Interfaces
using StockMind.Application.Interfaces;

// Necessário para CommandType.StoredProcedure
using System.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class RelatorioDapperRepository : IRelatorioDapperRepository
    {
        // Configurações da aplicação
        private readonly IConfiguration configuration;

        // Construtor
        public RelatorioDapperRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Retorna a quantidade total de produtos ativos.
        /// Consulta executada através do Dapper.
        /// </summary>
        public async Task<int> ObterTotalProdutosAtivosAsync()
        {
            // Cria conexão com SQL Server
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            // Consulta SQL
            var sql = @"
                SELECT COUNT(*)
                FROM Produtos
                WHERE Ativo = 1";

            // Executa consulta e retorna total
            return await conexao.ExecuteScalarAsync<int>(sql);
        }

        /// <summary>
        /// Retorna todos os produtos com estoque baixo.
        /// Dados obtidos através da Procedure
        /// sp_ListarProdutosEstoqueBaixo.
        /// </summary>
        public async Task<List<ProdutoEstoqueBaixoDataTransferObject>>
            ObterProdutosEstoqueBaixoAsync()
        {
            // Cria conexão com SQL Server
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            // Executa Procedure
            var resultado =
                await conexao.QueryAsync<ProdutoEstoqueBaixoDataTransferObject>(
                    "sp_ListarProdutosEstoqueBaixo",
                    commandType: CommandType.StoredProcedure);

            // Retorna lista
            return resultado.ToList();
        }

        /// <summary>
        /// Retorna o produto mais vendido.
        /// Dados obtidos através da Procedure
        /// sp_ProdutoMaisVendido.
        /// </summary>
        public async Task<ProdutoMaisVendidoDataTransferObject?>
            ObterProdutoMaisVendidoAsync()
        {
            // Cria conexão com SQL Server
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            // Executa Procedure
            var resultado =
                await conexao.QueryFirstOrDefaultAsync<
                    ProdutoMaisVendidoDataTransferObject>(
                        "sp_ProdutoMaisVendido",
                        commandType: CommandType.StoredProcedure);

            // Retorna resultado
            return resultado;
        }

        /// <summary>
        /// Executa a Function SQL Server
        /// fn_CalcularQuantidadeReposicao.
        /// </summary>
        public async Task<int> CalcularQuantidadeReposicaoAsync(
            int quantidadeAtual,
            int quantidadeMinima)
        {
            // Cria conexão com SQL Server
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            // Consulta que executa a Function
            var sql = @"
                SELECT dbo.fn_CalcularQuantidadeReposicao
                (
                    @QuantidadeAtual,
                    @QuantidadeMinima
                )";

            // Executa Function e retorna resultado
            return await conexao.ExecuteScalarAsync<int>(
                sql,
                new
                {
                    QuantidadeAtual = quantidadeAtual,
                    QuantidadeMinima = quantidadeMinima
                });
        }
    }
}