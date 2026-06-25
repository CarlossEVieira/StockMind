using Microsoft.EntityFrameworkCore;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;
using StockMind.Infrastructure.Data;

namespace StockMind.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        // Contexto do banco de dados
        private readonly AppDbContext contextoBancoDados;

        // Construtor
        public UsuarioRepository(AppDbContext contextoBancoDados)
        {
            this.contextoBancoDados = contextoBancoDados;
        }

        // Lista todos os usuários cadastrados
        public async Task<List<Usuario>> ListarAsync()
        {
            return await contextoBancoDados.Usuarios
                .OrderBy(usuario => usuario.Nome)
                .ToListAsync();
        }

        // Busca usuário por id
        public async Task<Usuario?> ObterPorIdAsync(int id)
        {
            return await contextoBancoDados.Usuarios
                .FirstOrDefaultAsync(usuario => usuario.Id == id);
        }

        // Busca usuário por e-mail
        public async Task<Usuario?> ObterPorEmailAsync(string email)
        {
            return await contextoBancoDados.Usuarios
                .FirstOrDefaultAsync(usuario => usuario.Email == email);
        }

        // Adiciona usuário no banco
        public async Task AdicionarAsync(Usuario usuario)
        {
            await contextoBancoDados.Usuarios.AddAsync(usuario);
            await contextoBancoDados.SaveChangesAsync();
        }

        // Atualiza usuário no banco
        public async Task AtualizarAsync(Usuario usuario)
        {
            contextoBancoDados.Usuarios.Update(usuario);
            await contextoBancoDados.SaveChangesAsync();
        }
    }
}