using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class ProdutoService
    {
        private readonly IProdutoRepository produtoRepository;
        private readonly IProdutoEstoqueRepository produtoEstoqueRepository;

        public ProdutoService(
            IProdutoRepository produtoRepository,
            IProdutoEstoqueRepository produtoEstoqueRepository)
        {
            this.produtoRepository = produtoRepository;
            this.produtoEstoqueRepository = produtoEstoqueRepository;
        }

        public async Task<List<Produto>> ListarAsync()
        {
            return await produtoRepository.ListarAsync();
        }

        public async Task<Produto?> ObterPorIdAsync(int id)
        {
            return await produtoRepository.ObterPorIdAsync(id);
        }

        public async Task CriarAsync(ProdutoCriarDataTransferObject produtoCriarDataTransferObject)
        {
            if (string.IsNullOrWhiteSpace(produtoCriarDataTransferObject.Nome))
            {
                throw new Exception("O nome do produto é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(produtoCriarDataTransferObject.Localizacao))
            {
                throw new Exception("A localização do produto é obrigatória.");
            }

            if (produtoCriarDataTransferObject.Tamanhos == null || produtoCriarDataTransferObject.Tamanhos.Count == 0)
            {
                throw new Exception("É necessário informar ao menos um tamanho.");
            }

            var produto = new Produto
            {
                Nome = produtoCriarDataTransferObject.Nome,
                Descricao = produtoCriarDataTransferObject.Descricao,
                Categoria = produtoCriarDataTransferObject.Categoria,
                Localizacao = produtoCriarDataTransferObject.Localizacao,
                Ativo = true,
                DataCadastro = DateTime.Now
            };

            await produtoRepository.AdicionarAsync(produto);

            foreach (var tamanho in produtoCriarDataTransferObject.Tamanhos)
            {
                var tamanhoFormatado = tamanho.Tamanho?.Trim().ToUpper();

                if (string.IsNullOrWhiteSpace(tamanhoFormatado))
                {
                    throw new Exception("O tamanho é obrigatório.");
                }

                var tamanhosPermitidos = new List<string> { "PP", "P", "M", "G", "GG" };

                if (!tamanhosPermitidos.Contains(tamanhoFormatado))
                {
                    throw new Exception($"O tamanho {tamanho.Tamanho} é inválido. Use apenas PP, P, M, G ou GG.");
                }

                if (tamanho.Quantidade < 0)
                {
                    throw new Exception("A quantidade não pode ser negativa.");
                }

                var produtoEstoque = new ProdutoEstoque
                {
                    ProdutoId = produto.Id,
                    Tamanho = tamanhoFormatado,
                    Quantidade = tamanho.Quantidade,
                    QuantidadeMinimaAlerta = tamanho.QuantidadeMinimaAlerta
                };

                await produtoEstoqueRepository.AdicionarAsync(produtoEstoque);
            }
        }

        public async Task AtualizarAsync(int id, ProdutoAtualizarDataTransferObject produtoAtualizarDataTransferObject)
        {
            var produto = await produtoRepository.ObterPorIdAsync(id);

            if (produto == null)
            {
                throw new Exception("Produto não encontrado.");
            }

            produto.Nome = produtoAtualizarDataTransferObject.Nome;
            produto.Descricao = produtoAtualizarDataTransferObject.Descricao;
            produto.Categoria = produtoAtualizarDataTransferObject.Categoria;
            produto.Localizacao = produtoAtualizarDataTransferObject.Localizacao;

            await produtoRepository.AtualizarAsync(produto);
        }

        public async Task ExcluirAsync(int id)
        {
            var produto = await produtoRepository.ObterPorIdAsync(id);

            if (produto == null)
            {
                throw new Exception("Produto não encontrado.");
            }

            await produtoRepository.RemoverAsync(produto);
        }
    }
}
