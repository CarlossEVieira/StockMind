namespace StockMind.Domain.Entities
{
    public class AlertaEstoque
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int ProdutoEstoqueId { get; set; }
        public string Mensagem { get; set; } = string.Empty;
        public int QuantidadeAtual { get; set; }
        public string? SugestaoReposicaoIa { get; set; }
        public bool Resolvido { get; set; } = false;
        public DateTime DataAlerta { get; set; } = DateTime.Now;

        public Produto? Produto { get; set; }
        public ProdutoEstoque? ProdutoEstoque { get; set; }
        public string TipoAlerta { get; set; } = "EstoqueBaixo";
    }
}