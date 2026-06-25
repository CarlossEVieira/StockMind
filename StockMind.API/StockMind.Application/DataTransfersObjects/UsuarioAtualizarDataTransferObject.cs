namespace StockMind.Application.DataTransferObjects
{
    public class UsuarioAtualizarDataTransferObject
    {
        // Nome atualizado
        public string Nome { get; set; } = string.Empty;

        // E-mail atualizado
        public string Email { get; set; } = string.Empty;

        // Perfil atualizado
        public string Perfil { get; set; } = "Administrador";

        // Status do usuário
        public bool Ativo { get; set; }
    }
}