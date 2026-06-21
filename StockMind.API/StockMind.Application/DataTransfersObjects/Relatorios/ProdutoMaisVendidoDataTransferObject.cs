namespace StockMind.Application.DataTransferObjects.Relatorios
{
    public class ProdutoMaisVendidoDataTransferObject
    {
        // Nome do produto
        public string Nome { get; set; } = string.Empty;

        // Quantidade total vendida
        public int QuantidadeVendida { get; set; }
    }
}