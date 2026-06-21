using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class VendaService
    {
        // Repository de produtos
        private readonly IProdutoRepository produtoRepository;

        // Repository de estoque
        private readonly IProdutoEstoqueRepository produtoEstoqueRepository;

        // Repository de vendas
        private readonly IVendaRepository vendaRepository;

        // Repository de movimentações
        private readonly IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository;

        // Repository de alertas
        private readonly IAlertaEstoqueRepository alertaEstoqueRepository;

        // Serviço de IA
        private readonly IInteligenciaEstoqueService inteligenciaEstoqueService;

        // Repository Dapper responsável pela Procedure de Venda
        private readonly IVendaDapperRepository vendaDapperRepository;

        // Construtor
        public VendaService(
            IProdutoRepository produtoRepository,
            IProdutoEstoqueRepository produtoEstoqueRepository,
            IVendaRepository vendaRepository,
            IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository,
            IAlertaEstoqueRepository alertaEstoqueRepository,
            IInteligenciaEstoqueService inteligenciaEstoqueService,
            IVendaDapperRepository vendaDapperRepository)
        {
            this.produtoRepository = produtoRepository;
            this.produtoEstoqueRepository = produtoEstoqueRepository;
            this.vendaRepository = vendaRepository;
            this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
            this.alertaEstoqueRepository = alertaEstoqueRepository;
            this.inteligenciaEstoqueService = inteligenciaEstoqueService;
            this.vendaDapperRepository = vendaDapperRepository;
        }

        /// <summary>
        /// Registra uma venda.
        /// </summary>
        public async Task RegistrarVendaAsync(
            RegistrarVendaDataTransferObject registrarVendaDataTransferObject)
        {
            if (registrarVendaDataTransferObject.ItensVenda == null ||
                !registrarVendaDataTransferObject.ItensVenda.Any())
            {
                throw new Exception(
                    "É necessário informar ao menos um item para a venda.");
            }

            var venda = new Venda
            {
                DataVenda = DateTime.Now,
                Observacao = registrarVendaDataTransferObject.Observacao,
                ItensVenda = new List<VendaItem>()
            };

            foreach (var item in registrarVendaDataTransferObject.ItensVenda)
            {
                // Busca produto
                var produto =
                    await produtoRepository.ObterPorIdAsync(
                        item.ProdutoId);

                if (produto == null)
                {
                    throw new Exception(
                        $"Produto com id {item.ProdutoId} não encontrado.");
                }

                // Valida tamanho
                if (string.IsNullOrWhiteSpace(item.Tamanho))
                {
                    throw new Exception(
                        "O tamanho é obrigatório.");
                }

                var tamanho =
                    item.Tamanho.Trim().ToUpper();

                // Busca estoque do produto
                var produtoEstoque =
                    await produtoEstoqueRepository
                        .ObterPorProdutoIdETamanhoAsync(
                            item.ProdutoId,
                            tamanho);

                if (produtoEstoque == null)
                {
                    throw new Exception(
                        $"Tamanho {tamanho} não encontrado para o produto.");
                }

                // Valida quantidade
                if (item.Quantidade <= 0)
                {
                    throw new Exception(
                        "A quantidade da venda deve ser maior que zero.");
                }

                // Verifica estoque disponível
                if (produtoEstoque.Quantidade < item.Quantidade)
                {
                    throw new Exception(
                        "Estoque insuficiente.");
                }

                // =====================================================
                // BAIXA ESTOQUE UTILIZANDO DAPPER + PROCEDURE
                // =====================================================
                await vendaDapperRepository
                    .RegistrarVendaEstoqueAsync(
                        produto.Id,
                        tamanho,
                        item.Quantidade,
                        registrarVendaDataTransferObject.Observacao
                            ?? string.Empty);

                // Atualiza objeto local para continuar
                // análise dos alertas
                produtoEstoque.Quantidade -= item.Quantidade;

                // Adiciona item na venda
                venda.ItensVenda.Add(
                    new VendaItem
                    {
                        ProdutoId = produto.Id,
                        ProdutoEstoqueId = produtoEstoque.Id,
                        Quantidade = item.Quantidade
                    });

                // Analisa alertas
                await AnalisarAlertasAposVendaAsync(
                    produto,
                    produtoEstoque,
                    tamanho);
            }

            // Salva venda
            await vendaRepository.AdicionarAsync(venda);
        }

        /// <summary>
        /// Analisa alertas após uma venda.
        /// </summary>
        private async Task AnalisarAlertasAposVendaAsync(
            Produto produto,
            ProdutoEstoque produtoEstoque,
            string tamanho)
        {
            const int quantidadeDiasAnalise = 7;
            const int limiteSaidasDemandaAlta = 10;

            var alertasExistentes =
                await alertaEstoqueRepository.ListarAsync();

            var quantidadeSaidasRecentes =
                await movimentacaoEstoqueRepository
                    .ObterTotalSaidasPorProdutoEstoqueNosUltimosDiasAsync(
                        produtoEstoque.Id,
                        quantidadeDiasAnalise);

            // =====================================================
            // ALERTA DE ESTOQUE BAIXO
            // =====================================================
            if (produtoEstoque.Quantidade <=
                produtoEstoque.QuantidadeMinimaAlerta)
            {
                var jaExisteAlertaEstoqueBaixo =
                    alertasExistentes.Any(alerta =>
                        alerta.ProdutoId == produto.Id &&
                        alerta.ProdutoEstoqueId == produtoEstoque.Id &&
                        alerta.TipoAlerta == "EstoqueBaixo" &&
                        !alerta.Resolvido);

                if (!jaExisteAlertaEstoqueBaixo)
                {
                    var sugestaoReposicaoIa =
                        await inteligenciaEstoqueService
                            .GerarSugestaoReposicaoAsync(
                                produto.Nome,
                                tamanho,
                                produtoEstoque.Quantidade,
                                produtoEstoque.QuantidadeMinimaAlerta,
                                produto.Localizacao,
                                "EstoqueBaixo",
                                quantidadeSaidasRecentes,
                                quantidadeDiasAnalise);

                    await alertaEstoqueRepository.AdicionarAsync(
                        new AlertaEstoque
                        {
                            ProdutoId = produto.Id,
                            ProdutoEstoqueId = produtoEstoque.Id,
                            Mensagem =
                                $"O produto {produto.Nome} no tamanho {tamanho} está com estoque baixo.",
                            QuantidadeAtual =
                                produtoEstoque.Quantidade,
                            SugestaoReposicaoIa =
                                sugestaoReposicaoIa,
                            Resolvido = false,
                            DataAlerta = DateTime.Now,
                            TipoAlerta = "EstoqueBaixo"
                        });
                }
            }

            // =====================================================
            // ALERTA DE DEMANDA ALTA
            // =====================================================
            if (quantidadeSaidasRecentes >=
                limiteSaidasDemandaAlta)
            {
                var jaExisteAlertaDemandaAlta =
                    alertasExistentes.Any(alerta =>
                        alerta.ProdutoId == produto.Id &&
                        alerta.ProdutoEstoqueId == produtoEstoque.Id &&
                        alerta.TipoAlerta == "DemandaAlta" &&
                        !alerta.Resolvido);

                if (!jaExisteAlertaDemandaAlta)
                {
                    var sugestaoReposicaoIa =
                        await inteligenciaEstoqueService
                            .GerarSugestaoReposicaoAsync(
                                produto.Nome,
                                tamanho,
                                produtoEstoque.Quantidade,
                                produtoEstoque.QuantidadeMinimaAlerta,
                                produto.Localizacao,
                                "DemandaAlta",
                                quantidadeSaidasRecentes,
                                quantidadeDiasAnalise);

                    await alertaEstoqueRepository.AdicionarAsync(
                        new AlertaEstoque
                        {
                            ProdutoId = produto.Id,
                            ProdutoEstoqueId = produtoEstoque.Id,
                            Mensagem =
                                $"O produto {produto.Nome} no tamanho {tamanho} está com alta demanda de saída.",
                            QuantidadeAtual =
                                produtoEstoque.Quantidade,
                            SugestaoReposicaoIa =
                                sugestaoReposicaoIa,
                            Resolvido = false,
                            DataAlerta = DateTime.Now,
                            TipoAlerta = "DemandaAlta"
                        });
                }
            }
        }
    }
}