using Microsoft.AspNetCore.Mvc;
using StockMind.Application.Services;

namespace StockMind.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> ObterDadosAsync()
        {
            var dados = await dashboardService.ObterDadosAsync();
            return Ok(dados);
        }
    }
}