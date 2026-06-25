using StockMind.Application.DataTransferObjects;
using StockMind.Application.Interfaces;
using StockMind.Domain.Entities;

namespace StockMind.Application.Services
{
    public class UsuarioService
    {
        // Repository de usuários
        private readonly IUsuarioRepository usuarioRepository;

        // Construtor
        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            this.usuarioRepository = usuarioRepository;
        }

        // Lista usuários
        public async Task<List<Usuario>> ListarAsync()
        {
            return await usuarioRepository.ListarAsync();
        }

        // Busca usuário por id
        public async Task<Usuario?> ObterPorIdAsync(int id)
        {
            return await usuarioRepository.ObterPorIdAsync(id);
        }

        // Realiza o login do usuário
        public async Task<Usuario> LoginAsync(
            LoginUsuarioDataTransferObject loginUsuarioDataTransferObject)
        {
            // Verifica se o e-mail foi informado
            if (string.IsNullOrWhiteSpace(loginUsuarioDataTransferObject.Email))
            {
                throw new Exception("Informe o e-mail.");
            }

            // Verifica se a senha foi informada
            if (string.IsNullOrWhiteSpace(loginUsuarioDataTransferObject.Senha))
            {
                throw new Exception("Informe a senha.");
            }

            // Procura usuário pelo e-mail
            var usuario =
                await usuarioRepository.ObterPorEmailAsync(
                    loginUsuarioDataTransferObject.Email
                );

            // Verifica se existe
            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            // Verifica se está ativo
            if (!usuario.Ativo)
            {
                throw new Exception("Usuário inativo.");
            }

            // Valida a senha
            if (usuario.Senha != loginUsuarioDataTransferObject.Senha)
            {
                throw new Exception("Senha inválida.");
            }

            return usuario;
        }

        // Cria novo usuário
        public async Task CriarAsync(UsuarioCriarDataTransferObject usuarioCriarDataTransferObject)
        {
            if (string.IsNullOrWhiteSpace(usuarioCriarDataTransferObject.Nome))
            {
                throw new Exception("O nome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(usuarioCriarDataTransferObject.Email))
            {
                throw new Exception("O e-mail é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(usuarioCriarDataTransferObject.Senha))
            {
                throw new Exception("A senha é obrigatória.");
            }

            var usuarioExistente =
                await usuarioRepository.ObterPorEmailAsync(usuarioCriarDataTransferObject.Email);

            if (usuarioExistente != null)
            {
                throw new Exception("Já existe um usuário cadastrado com este e-mail.");
            }

            var usuario = new Usuario
            {
                Nome = usuarioCriarDataTransferObject.Nome,
                Email = usuarioCriarDataTransferObject.Email,
                Senha = usuarioCriarDataTransferObject.Senha,
                Perfil = usuarioCriarDataTransferObject.Perfil,
                Ativo = true,
                DataCadastro = DateTime.Now
            };

            await usuarioRepository.AdicionarAsync(usuario);
        }

        // Atualiza usuário
        public async Task AtualizarAsync(
            int id,
            UsuarioAtualizarDataTransferObject usuarioAtualizarDataTransferObject)
        {
            var usuario = await usuarioRepository.ObterPorIdAsync(id);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            usuario.Nome = usuarioAtualizarDataTransferObject.Nome;
            usuario.Email = usuarioAtualizarDataTransferObject.Email;
            usuario.Perfil = usuarioAtualizarDataTransferObject.Perfil;
            usuario.Ativo = usuarioAtualizarDataTransferObject.Ativo;

            await usuarioRepository.AtualizarAsync(usuario);
        }

        // Exclusão lógica
        public async Task RemoverAsync(int id)
        {
            var usuario = await usuarioRepository.ObterPorIdAsync(id);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            usuario.Ativo = false;

            await usuarioRepository.AtualizarAsync(usuario);
        }
    }
}