namespace StockMind.Domain.Entities
{
    public class Venda
    {
        public int Id { get; set; }
        public DateTime DataVenda { get; set; } = DateTime.Now;
        public string? Observacao { get; set; }

        public ICollection<VendaItem> ItensVenda { get; set; } = new List<VendaItem>();
    }
}