namespace StockMind.Application.DataTransferObjects
{
    public class LoginUsuarioDataTransferObject
    {
        // E-mail informado no login
        public string Email { get; set; } = string.Empty;

        // Senha informada
        public string Senha { get; set; } = string.Empty;
    }
}