using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class AlertaEstoqueService
    {
        private readonly IAlertaEstoqueRepository alertaEstoqueRepository;

        public AlertaEstoqueService(IAlertaEstoqueRepository alertaEstoqueRepository)
        {
            this.alertaEstoqueRepository = alertaEstoqueRepository;
        }

        public async Task<List<AlertaEstoque>> ListarAsync()
        {
            return await alertaEstoqueRepository.ListarAsync();
        }

        public async Task ResolverAsync(int id)
        {
            var alertaEstoque = await alertaEstoqueRepository.ObterPorIdAsync(id);

            if (alertaEstoque == null)
            {
                throw new Exception("Alerta não encontrado.");
            }

            alertaEstoque.Resolvido = true;

            await alertaEstoqueRepository.AtualizarAsync(alertaEstoque);
        }

        public async Task AtualizarSugestaoReposicaoIaAsync(AtualizarSugestaoReposicaoIaDataTransferObject atualizarSugestaoReposicaoIaDataTransferObject)
        {
            var alertaEstoque = await alertaEstoqueRepository.ObterPorIdAsync(atualizarSugestaoReposicaoIaDataTransferObject.AlertaEstoqueId);

            if (alertaEstoque == null)
            {
                throw new Exception("Alerta não encontrado.");
            }

            alertaEstoque.SugestaoReposicaoIa = atualizarSugestaoReposicaoIaDataTransferObject.SugestaoReposicaoIa;

            await alertaEstoqueRepository.AtualizarAsync(alertaEstoque);
        }
    }
}