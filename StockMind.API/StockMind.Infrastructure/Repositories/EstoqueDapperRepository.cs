using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using StockMind.Application.Interfaces;
using System.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class EstoqueDapperRepository : IEstoqueDapperRepository
    {
        // Configuração da aplicação
        private readonly IConfiguration configuration;

        // Construtor
        public EstoqueDapperRepository(
            IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Executa a Procedure
        /// sp_RegistrarEntradaEstoque
        /// </summary>
        /// <summary>
/// Executa a Procedure
/// sp_RegistrarEntradaEstoque
/// </summary>
        public async Task RegistrarEntradaEstoqueAsync(
            int produtoId,
            string tamanho,
            int quantidade,
            string observacao)
        {
            // Cria conexão com SQL Server
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            // Executa Procedure
            await conexao.ExecuteAsync(
                "sp_RegistrarEntradaEstoque",
                new
                {
                    ProdutoId = produtoId,
                    Tamanho = tamanho,
                    Quantidade = quantidade,
                    Observacao = observacao
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}