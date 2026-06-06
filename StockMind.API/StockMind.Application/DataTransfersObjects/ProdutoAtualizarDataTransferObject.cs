namespace StockMind.Application.DataTransferObjects
{
    public class ProdutoAtualizarDataTransferObject
    {
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string Localizacao { get; set; } = string.Empty;
    }
}