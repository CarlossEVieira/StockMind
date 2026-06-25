using Microsoft.AspNetCore.Mvc;
using StockMind.Application.DataTransferObjects;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        // Service de usuários
        private readonly UsuarioService usuarioService;

        // Construtor
        public UsuariosController(
            UsuarioService usuarioService)
        {
            this.usuarioService = usuarioService;
        }

        // Lista todos os usuários
        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var usuarios =
                await usuarioService.ListarAsync();

            return Ok(usuarios);
        }

        // Busca usuário por id
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorIdAsync(
            int id)
        {
            var usuario =
                await usuarioService.ObterPorIdAsync(id);

            if (usuario == null)
            {
                return NotFound(
                    "Usuário não encontrado."
                );
            }

            return Ok(usuario);
        }

        // Realiza o login
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(
            [FromBody]
            LoginUsuarioDataTransferObject
            loginUsuarioDataTransferObject)
        {
            try
            {
                var usuario =
                    await usuarioService.LoginAsync(
                        loginUsuarioDataTransferObject);

                return Ok(new
                {
                    usuario.Id,
                    usuario.Nome,
                    usuario.Email,
                    usuario.Perfil
                });
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message
                );
            }
        }

        // Cria usuário
        [HttpPost]
        public async Task<IActionResult> CriarAsync(
            [FromBody]
            UsuarioCriarDataTransferObject
            usuarioCriarDataTransferObject)
        {
            try
            {
                await usuarioService.CriarAsync(
                    usuarioCriarDataTransferObject);

                return Ok(
                    "Usuário cadastrado com sucesso."
                );
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message
                );
            }
        }

        // Atualiza usuário
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarAsync(
            int id,
            [FromBody]
            UsuarioAtualizarDataTransferObject
            usuarioAtualizarDataTransferObject)
        {
            try
            {
                await usuarioService.AtualizarAsync(
                    id,
                    usuarioAtualizarDataTransferObject);

                return Ok(
                    "Usuário atualizado com sucesso."
                );
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message
                );
            }
        }

        // Remove usuário de forma lógica
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverAsync(
            int id)
        {
            try
            {
                await usuarioService.RemoverAsync(id);

                return Ok(
                    "Usuário removido com sucesso."
                );
            }
            catch (Exception excecao)
            {
                return BadRequest(
                    excecao.Message
                );
            }
        }
    }
}