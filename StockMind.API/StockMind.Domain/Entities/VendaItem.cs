namespace StockMind.Domain.Entities
{
    public class VendaItem
    {
        public int Id { get; set; }
        public int VendaId { get; set; }
        public int ProdutoId { get; set; }
        public int ProdutoEstoqueId { get; set; }
        public int Quantidade { get; set; }

        public Venda? Venda { get; set; }
        public Produto? Produto { get; set; }
        public ProdutoEstoque? ProdutoEstoque { get; set; }
    }
}