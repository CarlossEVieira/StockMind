namespace StockMind.Domain.Entities
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string Localizacao { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;
        public DateTime DataCadastro { get; set; } = DateTime.Now;

        public ICollection<ProdutoEstoque> EstoquesPorTamanho { get; set; } = new List<ProdutoEstoque>();
        public ICollection<MovimentacaoEstoque> MovimentacoesEstoque { get; set; } = new List<MovimentacaoEstoque>();
        public ICollection<AlertaEstoque> AlertasEstoque { get; set; } = new List<AlertaEstoque>();
        public ICollection<VendaItem> VendaItens { get; set; } = new List<VendaItem>();
    }
}
