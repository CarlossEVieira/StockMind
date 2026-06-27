using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class EstoqueService
    {
        // Repository de produtos
        private readonly IProdutoRepository produtoRepository;

        // Repository de estoque (Entity Framework)
        private readonly IProdutoEstoqueRepository produtoEstoqueRepository;

        // Repository de movimentações
        private readonly IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository;

        // Repository de alertas
        private readonly IAlertaEstoqueRepository alertaEstoqueRepository;

        // Repository Dapper
        private readonly IEstoqueDapperRepository estoqueDapperRepository;

        // Construtor
        public EstoqueService(
            IProdutoRepository produtoRepository,
            IProdutoEstoqueRepository produtoEstoqueRepository,
            IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository,
            IAlertaEstoqueRepository alertaEstoqueRepository,
            IEstoqueDapperRepository estoqueDapperRepository)
        {
            this.produtoRepository = produtoRepository;
            this.produtoEstoqueRepository = produtoEstoqueRepository;
            this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
            this.alertaEstoqueRepository = alertaEstoqueRepository;
            this.estoqueDapperRepository = estoqueDapperRepository;
        }

        /// <summary>
        /// Lista os estoques de um produto.
        /// </summary>
        public async Task<List<ProdutoEstoque>>
            ListarPorProdutoIdAsync(int produtoId)
        {
            return await produtoEstoqueRepository
                .ListarPorProdutoIdAsync(produtoId);
        }

        /// <summary>
        /// Registra entrada de estoque.
        /// Utiliza Dapper + Procedure SQL Server.
        /// </summary>
        public async Task RegistrarEntradaAsync(
            EntradaEstoqueDataTransferObject entradaEstoqueDataTransferObject)
        {
            // Valida existência do produto
            var produto =
                await produtoRepository.ObterPorIdAsync(
                    entradaEstoqueDataTransferObject.ProdutoId);

            if (produto == null)
            {
                throw new Exception(
                    $"Produto com id {entradaEstoqueDataTransferObject.ProdutoId} não encontrado.");
            }

            // Valida tamanho
            if (string.IsNullOrWhiteSpace(
                entradaEstoqueDataTransferObject.Tamanho))
            {
                throw new Exception(
                    "O tamanho é obrigatório.");
            }

            // Padroniza tamanho
            var tamanhoFormatado =
                entradaEstoqueDataTransferObject.Tamanho
                    .Trim()
                    .ToUpper();

            // Tamanhos permitidos
            var tamanhosPermitidos =
                new List<string>
                {
                    "PP",
                    "P",
                    "M",
                    "G",
                    "GG"
                };

            if (!tamanhosPermitidos.Contains(tamanhoFormatado))
            {
                throw new Exception(
                    "Tamanho inválido. Use PP, P, M, G ou GG.");
            }

            // Valida quantidade
            if (entradaEstoqueDataTransferObject.QuantidadeEntrada <= 0)
            {
                throw new Exception(
                    "A quantidade de entrada deve ser maior que zero.");
            }

            // Executa Procedure através do Dapper
            await estoqueDapperRepository
                .RegistrarEntradaEstoqueAsync(
                    entradaEstoqueDataTransferObject.ProdutoId,
                    tamanhoFormatado,
                    entradaEstoqueDataTransferObject.QuantidadeEntrada,
                    entradaEstoqueDataTransferObject.Observacao ?? string.Empty);
        }

        /// <summary>
        /// Registra uma reposição completa utilizando
        /// a mesma Procedure para todos os tamanhos.
        /// </summary>
        public async Task RegistrarReposicaoCompletaAsync(
            ReposicaoCompletaDataTransferObject reposicaoCompletaDataTransferObject)
        {
            // Verifica se o produto existe
            var produto =
                await produtoRepository.ObterPorIdAsync(
                    reposicaoCompletaDataTransferObject.ProdutoId);

            if (produto == null)
            {
                throw new Exception(
                    $"Produto com id {reposicaoCompletaDataTransferObject.ProdutoId} não encontrado.");
            }

            // Tamanhos permitidos
            var tamanhosPermitidos =
                new List<string>
                {
                    "PP",
                    "P",
                    "M",
                    "G",
                    "GG"
                };

            // Percorre todos os tamanhos enviados
            foreach (var item in reposicaoCompletaDataTransferObject.Itens)
            {
                // Ignora quantidades zeradas
                if (item.Quantidade <= 0)
                {
                    continue;
                }

                // Padroniza o tamanho
                var tamanhoFormatado =
                    item.Tamanho
                        .Trim()
                        .ToUpper();

                // Valida o tamanho
                if (!tamanhosPermitidos.Contains(tamanhoFormatado))
                {
                    throw new Exception(
                        $"O tamanho {item.Tamanho} é inválido.");
                }

                // Reutiliza a mesma Procedure já existente
                await estoqueDapperRepository
                    .RegistrarEntradaEstoqueAsync(
                        reposicaoCompletaDataTransferObject.ProdutoId,
                        tamanhoFormatado,
                        item.Quantidade,
                        reposicaoCompletaDataTransferObject.Observacao ?? string.Empty);
            }
        }
    }
}