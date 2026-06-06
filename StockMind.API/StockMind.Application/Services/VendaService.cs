using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class VendaService
    {
        private readonly IProdutoRepository produtoRepository;
        private readonly IProdutoEstoqueRepository produtoEstoqueRepository;
        private readonly IVendaRepository vendaRepository;
        private readonly IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository;
        private readonly IAlertaEstoqueRepository alertaEstoqueRepository;
        private readonly IInteligenciaEstoqueService inteligenciaEstoqueService;

        public VendaService(
            IProdutoRepository produtoRepository,
            IProdutoEstoqueRepository produtoEstoqueRepository,
            IVendaRepository vendaRepository,
            IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository,
            IAlertaEstoqueRepository alertaEstoqueRepository,
            IInteligenciaEstoqueService inteligenciaEstoqueService)
        {
            this.produtoRepository = produtoRepository;
            this.produtoEstoqueRepository = produtoEstoqueRepository;
            this.vendaRepository = vendaRepository;
            this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
            this.alertaEstoqueRepository = alertaEstoqueRepository;
            this.inteligenciaEstoqueService = inteligenciaEstoqueService;
        }

        public async Task RegistrarVendaAsync(RegistrarVendaDataTransferObject registrarVendaDataTransferObject)
        {
            if (registrarVendaDataTransferObject.ItensVenda == null || !registrarVendaDataTransferObject.ItensVenda.Any())
            {
                throw new Exception("É necessário informar ao menos um item para a venda.");
            }

            var venda = new Venda
            {
                DataVenda = DateTime.Now,
                Observacao = registrarVendaDataTransferObject.Observacao,
                ItensVenda = new List<VendaItem>()
            };

            foreach (var item in registrarVendaDataTransferObject.ItensVenda)
            {
                var produto = await produtoRepository.ObterPorIdAsync(item.ProdutoId);

                if (produto == null)
                {
                    throw new Exception($"Produto com id {item.ProdutoId} não encontrado.");
                }

                if (string.IsNullOrWhiteSpace(item.Tamanho))
                {
                    throw new Exception("O tamanho é obrigatório.");
                }

                var tamanho = item.Tamanho.Trim().ToUpper();

                var produtoEstoque = await produtoEstoqueRepository
                    .ObterPorProdutoIdETamanhoAsync(item.ProdutoId, tamanho);

                if (produtoEstoque == null)
                {
                    throw new Exception($"Tamanho {tamanho} não encontrado para o produto.");
                }

                if (item.Quantidade <= 0)
                {
                    throw new Exception("A quantidade da venda deve ser maior que zero.");
                }

                if (produtoEstoque.Quantidade < item.Quantidade)
                {
                    throw new Exception("Estoque insuficiente.");
                }

                // Baixa o estoque
                produtoEstoque.Quantidade -= item.Quantidade;

                await produtoEstoqueRepository.AtualizarAsync(produtoEstoque);

                // Adiciona o item na venda
                venda.ItensVenda.Add(new VendaItem
                {
                    ProdutoId = produto.Id,
                    ProdutoEstoqueId = produtoEstoque.Id,
                    Quantidade = item.Quantidade
                });

                // Registra movimentação de saída
                var movimentacaoEstoque = new MovimentacaoEstoque
                {
                    ProdutoId = produto.Id,
                    ProdutoEstoqueId = produtoEstoque.Id,
                    TipoMovimentacao = "Saida",
                    OrigemMovimentacao = "Venda",
                    Quantidade = item.Quantidade,
                    Observacao = registrarVendaDataTransferObject.Observacao,
                    DataMovimentacao = DateTime.Now
                };

                await movimentacaoEstoqueRepository.AdicionarAsync(movimentacaoEstoque);

                // Analisa alertas após registrar a saída
                await AnalisarAlertasAposVendaAsync(produto, produtoEstoque, tamanho);
            }

            await vendaRepository.AdicionarAsync(venda);
        }

        private async Task AnalisarAlertasAposVendaAsync(
            Produto produto,
            ProdutoEstoque produtoEstoque,
            string tamanho)
        {
            // Quantidade de dias analisados para demanda alta
            const int quantidadeDiasAnalise = 7;

            // Quantidade mínima de saídas para considerar alta demanda
            const int limiteSaidasDemandaAlta = 10;

            // Busca alertas existentes para evitar duplicados
            var alertasExistentes = await alertaEstoqueRepository.ListarAsync();

            // Calcula saídas recentes desse produto/tamanho
            var quantidadeSaidasRecentes = await movimentacaoEstoqueRepository
                .ObterTotalSaidasPorProdutoEstoqueNosUltimosDiasAsync(
                    produtoEstoque.Id,
                    quantidadeDiasAnalise);

            // Verifica estoque baixo
            if (produtoEstoque.Quantidade <= produtoEstoque.QuantidadeMinimaAlerta)
            {
                var jaExisteAlertaEstoqueBaixo = alertasExistentes.Any(alerta =>
                    alerta.ProdutoId == produto.Id &&
                    alerta.ProdutoEstoqueId == produtoEstoque.Id &&
                    alerta.TipoAlerta == "EstoqueBaixo" &&
                    !alerta.Resolvido);

                if (!jaExisteAlertaEstoqueBaixo)
                {
                    var sugestaoReposicaoIa = await inteligenciaEstoqueService.GerarSugestaoReposicaoAsync(
                        produto.Nome,
                        tamanho,
                        produtoEstoque.Quantidade,
                        produtoEstoque.QuantidadeMinimaAlerta,
                        produto.Localizacao,
                        "EstoqueBaixo",
                        quantidadeSaidasRecentes,
                        quantidadeDiasAnalise);

                    var alertaEstoqueBaixo = new AlertaEstoque
                    {
                        ProdutoId = produto.Id,
                        ProdutoEstoqueId = produtoEstoque.Id,
                        Mensagem = $"O produto {produto.Nome} no tamanho {tamanho} está com estoque baixo.",
                        QuantidadeAtual = produtoEstoque.Quantidade,
                        SugestaoReposicaoIa = sugestaoReposicaoIa,
                        Resolvido = false,
                        DataAlerta = DateTime.Now,
                        TipoAlerta = "EstoqueBaixo"
                    };

                    await alertaEstoqueRepository.AdicionarAsync(alertaEstoqueBaixo);
                }
            }

            // Verifica demanda alta
            if (quantidadeSaidasRecentes >= limiteSaidasDemandaAlta)
            {
                var jaExisteAlertaDemandaAlta = alertasExistentes.Any(alerta =>
                    alerta.ProdutoId == produto.Id &&
                    alerta.ProdutoEstoqueId == produtoEstoque.Id &&
                    alerta.TipoAlerta == "DemandaAlta" &&
                    !alerta.Resolvido);

                if (!jaExisteAlertaDemandaAlta)
                {
                    var sugestaoReposicaoIa = await inteligenciaEstoqueService.GerarSugestaoReposicaoAsync(
                        produto.Nome,
                        tamanho,
                        produtoEstoque.Quantidade,
                        produtoEstoque.QuantidadeMinimaAlerta,
                        produto.Localizacao,
                        "DemandaAlta",
                        quantidadeSaidasRecentes,
                        quantidadeDiasAnalise);

                    var alertaDemandaAlta = new AlertaEstoque
                    {
                        ProdutoId = produto.Id,
                        ProdutoEstoqueId = produtoEstoque.Id,
                        Mensagem = $"O produto {produto.Nome} no tamanho {tamanho} está com alta demanda de saída.",
                        QuantidadeAtual = produtoEstoque.Quantidade,
                        SugestaoReposicaoIa = sugestaoReposicaoIa,
                        Resolvido = false,
                        DataAlerta = DateTime.Now,
                        TipoAlerta = "DemandaAlta"
                    };

                    await alertaEstoqueRepository.AdicionarAsync(alertaDemandaAlta);
                }
            }
        }
    }
}