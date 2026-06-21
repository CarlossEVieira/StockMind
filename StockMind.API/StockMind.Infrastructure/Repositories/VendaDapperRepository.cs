// Biblioteca Dapper
using Dapper;

// Conexão SQL Server
using Microsoft.Data.SqlClient;

// Configuração
using Microsoft.Extensions.Configuration;

// Interfaces
using StockMind.Application.Interfaces;

// Necessário para Stored Procedure
using System.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class VendaDapperRepository : IVendaDapperRepository
    {
        // Configuração da aplicação
        private readonly IConfiguration configuration;

        // Construtor
        public VendaDapperRepository(
            IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Executa a Procedure
        /// sp_RegistrarVendaEstoque
        /// </summary>
        public async Task RegistrarVendaEstoqueAsync(
            int produtoId,
            string tamanho,
            int quantidade,
            string observacao)
        {
            using var conexao =
                new SqlConnection(
                    configuration.GetConnectionString("DefaultConnection"));

            await conexao.ExecuteAsync(
                "sp_RegistrarVendaEstoque",
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