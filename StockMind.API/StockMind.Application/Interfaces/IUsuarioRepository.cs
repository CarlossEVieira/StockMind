using StockMind.Domain.Entities;

namespace StockMind.Application.Interfaces
{
    public interface IUsuarioRepository
    {
        // Lista todos os usuários
        Task<List<Usuario>> ListarAsync();

        // Busca usuário por id
        Task<Usuario?> ObterPorIdAsync(int id);

        // Busca usuário por e-mail
        Task<Usuario?> ObterPorEmailAsync(string email);

        // Adiciona novo usuário
        Task AdicionarAsync(Usuario usuario);

        // Atualiza usuário existente
        Task AtualizarAsync(Usuario usuario);
    }
}