namespace StockMind.Application.Interfaces
{
    public interface IVendaDapperRepository
    {
        /// <summary>
        /// Executa a Procedure
        /// sp_RegistrarVendaEstoque
        /// </summary>
        Task RegistrarVendaEstoqueAsync(
            int produtoId,
            string tamanho,
            int quantidade,
            string observacao);
    }
}