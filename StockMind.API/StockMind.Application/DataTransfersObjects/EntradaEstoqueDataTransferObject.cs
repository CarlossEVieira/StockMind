namespace StockMind.Application.DataTransferObjects
{
    public class EntradaEstoqueDataTransferObject
    {
        public int ProdutoId { get; set; }
        public string Tamanho { get; set; } = string.Empty;
        public int QuantidadeEntrada { get; set; }
        public string? Observacao { get; set; }
    }
}