namespace StockMind.Application.DataTransferObjects
{
    public class VendaItemDataTransferObject
    {
        public int ProdutoId { get; set; }
        public string Tamanho { get; set; } = string.Empty;
        public int Quantidade { get; set; }
    }
}