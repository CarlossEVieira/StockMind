namespace StockMind.Domain.Entities
{
    public class MovimentacaoEstoque
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int ProdutoEstoqueId { get; set; }
        public string TipoMovimentacao { get; set; } = string.Empty; // Entrada ou Saida
        public string OrigemMovimentacao { get; set; } = string.Empty; // Venda, Reposicao, Ajuste
        public int Quantidade { get; set; }
        public string? Observacao { get; set; }
        public DateTime DataMovimentacao { get; set; } = DateTime.Now;

        public Produto? Produto { get; set; }
        public ProdutoEstoque? ProdutoEstoque { get; set; }
    }
}