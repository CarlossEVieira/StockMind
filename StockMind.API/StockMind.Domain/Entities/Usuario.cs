namespace StockMind.Domain.Entities
{
    public class Usuario
    {
        // Identificador do usuário
        public int Id { get; set; }

        // Nome completo do usuário
        public string Nome { get; set; } = string.Empty;

        // E-mail usado para acesso
        public string Email { get; set; } = string.Empty;

        // Senha simples por enquanto
        // Futuramente podemos criptografar
        public string Senha { get; set; } = string.Empty;

        // Perfil exibido no sistema
        public string Perfil { get; set; } = "Administrador";

        // Define se o usuário está ativo
        public bool Ativo { get; set; } = true;

        // Data de cadastro do usuário
        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}