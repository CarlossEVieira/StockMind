namespace StockMind.Application.Interfaces
{
    public interface IEstoqueDapperRepository
    {
        /// <summary>
        /// Executa a Procedure responsável
        /// pela entrada de estoque.
        /// </summary>
        Task RegistrarEntradaEstoqueAsync(
            int produtoId,
            string tamanho,
            int quantidade,
            string observacao);
    }
}