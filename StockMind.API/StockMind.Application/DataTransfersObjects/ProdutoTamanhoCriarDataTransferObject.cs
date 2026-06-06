namespace StockMind.Application.DataTransferObjects
{
    public class ProdutoTamanhoCriarDataTransferObject
    {
        public string Tamanho { get; set; } = string.Empty;
        public int Quantidade { get; set; }
        public int QuantidadeMinimaAlerta { get; set; } = 10;
    }
}