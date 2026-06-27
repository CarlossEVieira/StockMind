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

        /// <summary>
        /// Executa a reposição completa
        /// utilizando a mesma Procedure
        /// para cada tamanho informado.
        /// </summary>
        Task RegistrarReposicaoCompletaAsync(
            int produtoId,
            Dictionary<string, int> tamanhos,
            string observacao);
    }
}