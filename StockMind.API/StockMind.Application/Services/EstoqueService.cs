using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class EstoqueService
    {
        private readonly IProdutoRepository produtoRepository;
        private readonly IProdutoEstoqueRepository produtoEstoqueRepository;
        private readonly IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository;
        private readonly IAlertaEstoqueRepository alertaEstoqueRepository;

        public EstoqueService(
            IProdutoRepository produtoRepository,
            IProdutoEstoqueRepository produtoEstoqueRepository,
            IMovimentacaoEstoqueRepository movimentacaoEstoqueRepository,
            IAlertaEstoqueRepository alertaEstoqueRepository)
        {
            this.produtoRepository = produtoRepository;
            this.produtoEstoqueRepository = produtoEstoqueRepository;
            this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
            this.alertaEstoqueRepository = alertaEstoqueRepository;
        }

        public async Task<List<ProdutoEstoque>> ListarPorProdutoIdAsync(int produtoId)
        {
            return await produtoEstoqueRepository.ListarPorProdutoIdAsync(produtoId);
        }

       public async Task RegistrarEntradaAsync(EntradaEstoqueDataTransferObject entradaEstoqueDataTransferObject)
        {
            var produto = await produtoRepository.ObterPorIdAsync(entradaEstoqueDataTransferObject.ProdutoId);

            if (produto == null)
            {
                throw new Exception($"Produto com id {entradaEstoqueDataTransferObject.ProdutoId} não encontrado.");
            }

            if (string.IsNullOrWhiteSpace(entradaEstoqueDataTransferObject.Tamanho))
            {
                throw new Exception("O tamanho é obrigatório.");
            }

            var tamanhoFormatado = entradaEstoqueDataTransferObject.Tamanho.Trim().ToUpper();

            var tamanhosPermitidos = new List<string> { "PP", "P", "M", "G", "GG" };

            if (!tamanhosPermitidos.Contains(tamanhoFormatado))
            {
                throw new Exception("Tamanho inválido. Use PP, P, M, G ou GG.");
            }

            var produtoEstoque = await produtoEstoqueRepository.ObterPorProdutoIdETamanhoAsync(
                entradaEstoqueDataTransferObject.ProdutoId,
                tamanhoFormatado);

            if (produtoEstoque == null)
            {
                throw new Exception($"Tamanho {tamanhoFormatado} não encontrado para este produto.");
            }

            if (entradaEstoqueDataTransferObject.QuantidadeEntrada <= 0)
            {
                throw new Exception("A quantidade de entrada deve ser maior que zero.");
            }

            produtoEstoque.Quantidade += entradaEstoqueDataTransferObject.QuantidadeEntrada;

            await produtoEstoqueRepository.AtualizarAsync(produtoEstoque);

            var movimentacaoEstoque = new MovimentacaoEstoque
            {
                ProdutoId = produto.Id,
                ProdutoEstoqueId = produtoEstoque.Id,
                TipoMovimentacao = "Entrada",
                OrigemMovimentacao = "Reposicao",
                Quantidade = entradaEstoqueDataTransferObject.QuantidadeEntrada,
                Observacao = entradaEstoqueDataTransferObject.Observacao,
                DataMovimentacao = DateTime.Now
            };

            await movimentacaoEstoqueRepository.AdicionarAsync(movimentacaoEstoque);
        }
    }
}