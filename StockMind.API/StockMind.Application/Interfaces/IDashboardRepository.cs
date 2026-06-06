namespace StockMind.Application.Interfaces
{
    public interface IDashboardRepository
    {
        Task<int> ObterTotalProdutosAsync();
        Task<int> ObterTotalEstoqueAsync();
        Task<int> ObterAlertasPendentesAsync();
        Task<(string nome, string tamanho, int quantidade)?> ObterMenorEstoqueAsync();
    }
}