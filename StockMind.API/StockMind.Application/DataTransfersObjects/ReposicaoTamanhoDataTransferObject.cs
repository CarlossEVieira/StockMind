namespace StockMind.Application.DataTransferObjects
{
    public class ReposicaoTamanhoDataTransferObject
    {
        // Tamanho do produto
        public string Tamanho { get; set; } = string.Empty;

        // Quantidade que entrou
        public int Quantidade { get; set; }
    }
}