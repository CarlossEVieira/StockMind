using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class VendaRepository : IVendaRepository
    {
        private readonly AppDbContext appDbContext;

        public VendaRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task AdicionarAsync(Venda venda)
        {
            await appDbContext.Vendas.AddAsync(venda);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<Venda>> ListarAsync()
        {
            return await appDbContext.Vendas
                .Include(venda => venda.ItensVenda)
                .OrderByDescending(venda => venda.DataVenda)
                .ToListAsync();
        }
    }
}