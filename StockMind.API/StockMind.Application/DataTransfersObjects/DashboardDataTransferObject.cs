namespace StockMind.Application.DataTransferObjects
{
    public class DashboardDataTransferObject
    {
        public int TotalProdutos { get; set; }
        public int TotalEstoque { get; set; }
        public int AlertasPendentes { get; set; }

        public MenorEstoqueDataTransferObject? MenorEstoque { get; set; }
    }

    public class MenorEstoqueDataTransferObject
    {
        public string NomeProduto { get; set; } = string.Empty;
        public string Tamanho { get; set; } = string.Empty;
        public int Quantidade { get; set; }
    }
}