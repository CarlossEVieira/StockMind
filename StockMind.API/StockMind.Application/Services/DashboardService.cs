using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;

namespace StockMind.Application.Services
{
    public class DashboardService
    {
        // Repository do dashboard
        private readonly IDashboardRepository dashboardRepository;

        // Construtor recebendo a interface
        public DashboardService(IDashboardRepository dashboardRepository)
        {
            this.dashboardRepository = dashboardRepository;
        }

        public async Task<DashboardDataTransferObject> ObterDadosAsync()
        {
            // Busca total de produtos
            var totalProdutos = await dashboardRepository.ObterTotalProdutosAsync();

            // Busca total em estoque
            var totalEstoque = await dashboardRepository.ObterTotalEstoqueAsync();

            // Busca quantidade de alertas pendentes
            var alertasPendentes = await dashboardRepository.ObterAlertasPendentesAsync();

            // Busca o produto com menor estoque
            var menorEstoque = await dashboardRepository.ObterMenorEstoqueAsync();

            // Monta o DTO de retorno
            return new DashboardDataTransferObject
            {
                TotalProdutos = totalProdutos,
                TotalEstoque = totalEstoque,
                AlertasPendentes = alertasPendentes,

                MenorEstoque = menorEstoque == null
                    ? null
                    : new MenorEstoqueDataTransferObject
                    {
                        NomeProduto = menorEstoque.Value.nome,
                        Tamanho = menorEstoque.Value.tamanho,
                        Quantidade = menorEstoque.Value.quantidade
                    }
            };
        }
    }
}