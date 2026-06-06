using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class AlertaEstoqueRepository : IAlertaEstoqueRepository
    {
        private readonly AppDbContext appDbContext;

        public AlertaEstoqueRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task AdicionarAsync(AlertaEstoque alertaEstoque)
        {
            await appDbContext.AlertasEstoque.AddAsync(alertaEstoque);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<AlertaEstoque>> ListarAsync()
        {
            return await appDbContext.AlertasEstoque
                .Include(alertaEstoque => alertaEstoque.Produto)
                .Include(alertaEstoque => alertaEstoque.ProdutoEstoque)
                .OrderByDescending(alertaEstoque => alertaEstoque.DataAlerta)
                .ToListAsync();
        }

        public async Task<AlertaEstoque?> ObterPorIdAsync(int id)
        {
            return await appDbContext.AlertasEstoque
                .Include(alertaEstoque => alertaEstoque.Produto)
                .Include(alertaEstoque => alertaEstoque.ProdutoEstoque)
                .FirstOrDefaultAsync(alertaEstoque => alertaEstoque.Id == id);
        }

        public async Task AtualizarAsync(AlertaEstoque alertaEstoque)
        {
            appDbContext.AlertasEstoque.Update(alertaEstoque);
            await appDbContext.SaveChangesAsync();
        }
    }
}