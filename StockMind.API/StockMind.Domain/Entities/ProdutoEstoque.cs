namespace StockMind.Domain.Entities
{
    public class ProdutoEstoque
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public string Tamanho { get; set; } = string.Empty;
        public int Quantidade { get; set; }
        public int QuantidadeMinimaAlerta { get; set; } = 10;

        public Produto? Produto { get; set; }
        public ICollection<MovimentacaoEstoque> MovimentacoesEstoque { get; set; } = new List<MovimentacaoEstoque>();
        public ICollection<AlertaEstoque> AlertasEstoque { get; set; } = new List<AlertaEstoque>();
        public ICollection<VendaItem> VendaItens { get; set; } = new List<VendaItem>();
    }
}
