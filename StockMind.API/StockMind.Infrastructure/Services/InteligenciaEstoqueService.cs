using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using StockMind.Application.Interfaces;

namespace StockMind.Infrastructure.Services
{
    public class InteligenciaEstoqueService : IInteligenciaEstoqueService
    {
        private readonly HttpClient httpClient;
        private readonly IConfiguration configuration;

        public InteligenciaEstoqueService(HttpClient httpClient, IConfiguration configuration)
        {
            this.httpClient = httpClient;
            this.configuration = configuration;
        }

        public async Task<string> GerarSugestaoReposicaoAsync(
            string nomeProduto,
            string tamanho,
            int quantidadeAtual,
            int quantidadeMinimaAlerta,
            string localizacao,
            string tipoAlerta,
            int quantidadeSaidasRecentes,
            int quantidadeDiasAnalise)
        {
            var apiKey = configuration["Gemini:ApiKey"];
            var modelo = configuration["Gemini:Model"] ?? "gemini-2.5-flash";

            if (string.IsNullOrWhiteSpace(apiKey) || apiKey == "SUA_CHAVE_AQUI")
            {
                return GerarSugestaoPadrao(
                    nomeProduto,
                    tamanho,
                    quantidadeAtual,
                    quantidadeMinimaAlerta,
                    localizacao,
                    tipoAlerta,
                    quantidadeSaidasRecentes,
                    quantidadeDiasAnalise);
            }

            var prompt = $@"
Você é um assistente inteligente de reposição de estoque para uma loja de roupas.

Analise os dados abaixo:
- Produto: {nomeProduto}
- Tamanho: {tamanho}
- Quantidade atual em estoque: {quantidadeAtual}
- Quantidade mínima para alerta: {quantidadeMinimaAlerta}
- Localização no estoque: {localizacao}
- Tipo de alerta: {tipoAlerta}
- Saídas recentes: {quantidadeSaidasRecentes} unidades nos últimos {quantidadeDiasAnalise} dias

Gere uma sugestão curta, objetiva e profissional em português.

Formato obrigatório da resposta:
Prioridade: Alta/Média/Baixa.
Repor: X unidades.
Motivo: explique em uma frase curta.

Regras:
- Se o tipo de alerta for EstoqueBaixo e a quantidade atual estiver menor ou igual ao mínimo, use prioridade Alta.
- Se o tipo de alerta for DemandaAlta e as saídas recentes forem altas, use prioridade Média ou Alta.
- A quantidade sugerida deve ser um número inteiro.
- Não use markdown.
- Não use listas.
";

            var corpoRequisicao = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var json = JsonSerializer.Serialize(corpoRequisicao);

            using var requisicao = new HttpRequestMessage(
                HttpMethod.Post,
                $"https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent?key={apiKey}");

            requisicao.Content = new StringContent(json, Encoding.UTF8, "application/json");
            requisicao.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var resposta = await httpClient.SendAsync(requisicao);
            var conteudoResposta = await resposta.Content.ReadAsStringAsync();

            if (!resposta.IsSuccessStatusCode)
            {
                return GerarSugestaoPadrao(
                    nomeProduto,
                    tamanho,
                    quantidadeAtual,
                    quantidadeMinimaAlerta,
                    localizacao,
                    tipoAlerta,
                    quantidadeSaidasRecentes,
                    quantidadeDiasAnalise);
            }

            using var documento = JsonDocument.Parse(conteudoResposta);

            var textoGerado = documento
                .RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            if (string.IsNullOrWhiteSpace(textoGerado))
            {
                return GerarSugestaoPadrao(
                    nomeProduto,
                    tamanho,
                    quantidadeAtual,
                    quantidadeMinimaAlerta,
                    localizacao,
                    tipoAlerta,
                    quantidadeSaidasRecentes,
                    quantidadeDiasAnalise);
            }

            return textoGerado.Trim();
        }

        private string GerarSugestaoPadrao(
            string nomeProduto,
            string tamanho,
            int quantidadeAtual,
            int quantidadeMinimaAlerta,
            string localizacao,
            string tipoAlerta,
            int quantidadeSaidasRecentes,
            int quantidadeDiasAnalise)
        {
            if (tipoAlerta == "DemandaAlta")
            {
                var quantidadeSugeridaDemandaAlta = Math.Max(quantidadeSaidasRecentes * 2, quantidadeMinimaAlerta);

                return $"Prioridade: Média. Repor: {quantidadeSugeridaDemandaAlta} unidades. Motivo: o produto {nomeProduto} no tamanho {tamanho} teve {quantidadeSaidasRecentes} saídas nos últimos {quantidadeDiasAnalise} dias e pode precisar de reposição em breve.";
            }

            var quantidadeNecessariaParaMinimo = quantidadeMinimaAlerta - quantidadeAtual;
            var quantidadeSugeridaEstoqueBaixo = Math.Max(quantidadeNecessariaParaMinimo + quantidadeMinimaAlerta, quantidadeMinimaAlerta);

            return $"Prioridade: Alta. Repor: {quantidadeSugeridaEstoqueBaixo} unidades. Motivo: o produto {nomeProduto} no tamanho {tamanho} está com estoque atual de {quantidadeAtual}, abaixo ou igual ao mínimo de {quantidadeMinimaAlerta}.";
        }
    }
}