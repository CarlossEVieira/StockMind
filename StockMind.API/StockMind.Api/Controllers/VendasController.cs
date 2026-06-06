using Microsoft.AspNetCore.Mvc;
using StockMind.Application.DataTransferObjects;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendasController : ControllerBase
    {
        private readonly VendaService vendaService;

        public VendasController(VendaService vendaService)
        {
            this.vendaService = vendaService;
        }

        [HttpPost]
        public async Task<IActionResult> RegistrarVendaAsync([FromBody] RegistrarVendaDataTransferObject registrarVendaDataTransferObject)
        {
            try
            {
                await vendaService.RegistrarVendaAsync(registrarVendaDataTransferObject);
                return Ok("Venda registrada com sucesso.");
            }
            catch (Exception excecao)
            {
                return BadRequest(excecao.Message);
            }
        }
    }
}