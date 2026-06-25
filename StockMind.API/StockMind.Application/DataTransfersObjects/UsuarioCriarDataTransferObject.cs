namespace StockMind.Application.DataTransferObjects
{
    public class UsuarioCriarDataTransferObject
    {
        // Nome do usuário
        public string Nome { get; set; } = string.Empty;

        // E-mail do usuário
        public string Email { get; set; } = string.Empty;

        // Senha do usuário
        public string Senha { get; set; } = string.Empty;

        // Perfil do usuário
        public string Perfil { get; set; } = "Administrador";
    }
}