namespace StockMind.Application.Interfaces
{
    public interface IInteligenciaEstoqueService
    {
        Task<string> GerarSugestaoReposicaoAsync(
            string nomeProduto,
            string tamanho,
            int quantidadeAtual,
            int quantidadeMinimaAlerta,
            string localizacao,
            string tipoAlerta,
            int quantidadeSaidasRecentes,
            int quantidadeDiasAnalise);
    }
}