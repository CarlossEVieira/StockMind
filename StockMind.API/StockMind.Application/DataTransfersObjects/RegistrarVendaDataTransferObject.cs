namespace StockMind.Application.DataTransferObjects
{
    public class RegistrarVendaDataTransferObject
    {
        public string? Observacao { get; set; }
        public List<VendaItemDataTransferObject> ItensVenda { get; set; } = new();
    }
}