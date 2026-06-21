using Microsoft.EntityFrameworkCore;
using StockMind.Domain.Entities;

namespace StockMind.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ProdutoEstoque> ProdutosEstoque { get; set; }
        public DbSet<MovimentacaoEstoque> MovimentacoesEstoque { get; set; }
        public DbSet<AlertaEstoque> AlertasEstoque { get; set; }
        public DbSet<Venda> Vendas { get; set; }
        public DbSet<VendaItem> VendaItens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Nome das tabelas
            modelBuilder.Entity<Produto>().ToTable("Produtos");
            modelBuilder.Entity<ProdutoEstoque>().ToTable("ProdutosEstoque");
            modelBuilder.Entity<MovimentacaoEstoque>().ToTable("MovimentacoesEstoque");
            modelBuilder.Entity<AlertaEstoque>().ToTable("AlertasEstoque");
            modelBuilder.Entity<Venda>().ToTable("Vendas");
            modelBuilder.Entity<VendaItem>().ToTable("VendaItens");

            // Produto -> Estoques
            modelBuilder.Entity<Produto>()
                .HasMany(produto => produto.EstoquesPorTamanho)
                .WithOne(produtoEstoque => produtoEstoque.Produto)
                .HasForeignKey(produtoEstoque => produtoEstoque.ProdutoId);

            // Produto -> Movimentações
            modelBuilder.Entity<Produto>()
                .HasMany(produto => produto.MovimentacoesEstoque)
                .WithOne(movimentacaoEstoque => movimentacaoEstoque.Produto)
                .HasForeignKey(movimentacaoEstoque => movimentacaoEstoque.ProdutoId)
                .OnDelete(DeleteBehavior.NoAction);

            // Produto -> Alertas
            modelBuilder.Entity<Produto>()
                .HasMany(produto => produto.AlertasEstoque)
                .WithOne(alertaEstoque => alertaEstoque.Produto)
                .HasForeignKey(alertaEstoque => alertaEstoque.ProdutoId)
                .OnDelete(DeleteBehavior.NoAction);

            // Produto -> VendaItens
            modelBuilder.Entity<Produto>()
                .HasMany(produto => produto.VendaItens)
                .WithOne(vendaItem => vendaItem.Produto)
                .HasForeignKey(vendaItem => vendaItem.ProdutoId)
                .OnDelete(DeleteBehavior.NoAction);

            // ProdutoEstoque -> Movimentações
            modelBuilder.Entity<ProdutoEstoque>()
                .HasMany(produtoEstoque => produtoEstoque.MovimentacoesEstoque)
                .WithOne(movimentacaoEstoque => movimentacaoEstoque.ProdutoEstoque)
                .HasForeignKey(movimentacaoEstoque => movimentacaoEstoque.ProdutoEstoqueId)
                .OnDelete(DeleteBehavior.Cascade);

            // ProdutoEstoque -> Alertas
            modelBuilder.Entity<ProdutoEstoque>()
                .HasMany(produtoEstoque => produtoEstoque.AlertasEstoque)
                .WithOne(alertaEstoque => alertaEstoque.ProdutoEstoque)
                .HasForeignKey(alertaEstoque => alertaEstoque.ProdutoEstoqueId)
                .OnDelete(DeleteBehavior.Cascade);

            // ProdutoEstoque -> VendaItens
            modelBuilder.Entity<ProdutoEstoque>()
                .HasMany(produtoEstoque => produtoEstoque.VendaItens)
                .WithOne(vendaItem => vendaItem.ProdutoEstoque)
                .HasForeignKey(vendaItem => vendaItem.ProdutoEstoqueId);

            // Venda -> Itens
            modelBuilder.Entity<Venda>()
                .HasMany(venda => venda.ItensVenda)
                .WithOne(vendaItem => vendaItem.Venda)
                .HasForeignKey(vendaItem => vendaItem.VendaId);

            base.OnModelCreating(modelBuilder);
        }
    }
}