namespace StockMind.Application.DataTransferObjects
{
    public class ReposicaoCompletaDataTransferObject
    {
        // Produto que receberá a reposição
        public int ProdutoId { get; set; }

        // Observação da movimentação
        public string? Observacao { get; set; }

        // Lista de tamanhos e quantidades
        public List<ItemReposicaoDataTransferObject> Itens { get; set; } = new();
    }

    public class ItemReposicaoDataTransferObject
    {
        // Tamanho
        public string Tamanho { get; set; } = string.Empty;

        // Quantidade
        public int Quantidade { get; set; }
    }
}