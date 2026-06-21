namespace StockMind.Application.DataTransferObjects.Relatorios
{
    public class ProdutoEstoqueBaixoDataTransferObject
    {
        // Id do produto
        public int ProdutoId { get; set; }

        // Nome do produto
        public string Nome { get; set; } = string.Empty;

        // Categoria do produto
        public string Categoria { get; set; } = string.Empty;

        // Localização física
        public string Localizacao { get; set; } = string.Empty;

        // Tamanho do produto
        public string Tamanho { get; set; } = string.Empty;

        // Quantidade atual
        public int Quantidade { get; set; }

        // Quantidade mínima configurada
        public int QuantidadeMinimaAlerta { get; set; }
    }
}