// Entity Framework
using Microsoft.EntityFrameworkCore;

// Interfaces
using StockMind.Application.Interfaces;

// Services
using StockMind.Application.Services;

// Contexto do banco
using StockMind.Infrastructure.Data;

// Repositories
using StockMind.Infrastructure.Repositories;

// Serviços de infraestrutura
using StockMind.Infrastructure.Services;

// Configuração para evitar problemas de serialização
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


// =====================================================
// CONFIGURAÇÃO DOS CONTROLLERS
// =====================================================
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Evita erro de referência circular
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });


// =====================================================
// SWAGGER
// =====================================================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// =====================================================
// BANCO DE DADOS
// SQL SERVER
// =====================================================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));


// =====================================================
// REPOSITORIES (ENTITY FRAMEWORK)
// =====================================================
builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();

builder.Services.AddScoped<IProdutoEstoqueRepository,
    ProdutoEstoqueRepository>();

builder.Services.AddScoped<IMovimentacaoEstoqueRepository,
    MovimentacaoEstoqueRepository>();

builder.Services.AddScoped<IAlertaEstoqueRepository,
    AlertaEstoqueRepository>();

builder.Services.AddScoped<IVendaRepository,
    VendaRepository>();

builder.Services.AddScoped<IDashboardRepository,
    DashboardRepository>();

builder.Services.AddScoped<IEstoqueDapperRepository,
     EstoqueDapperRepository>();

// Repository Dapper responsável pela Procedure de Venda
builder.Services.AddScoped<IVendaDapperRepository,
    VendaDapperRepository>();

// =====================================================
// REPOSITORY DAPPER
// Responsável por consultas utilizando:
// Views
// Procedures
// Functions
// =====================================================
builder.Services.AddScoped<IRelatorioDapperRepository,
    RelatorioDapperRepository>();


// =====================================================
// SERVIÇO DE IA (GEMINI)
// =====================================================
builder.Services.AddHttpClient<IInteligenciaEstoqueService,
    InteligenciaEstoqueService>();


// =====================================================
// SERVICES
// =====================================================
builder.Services.AddScoped<ProdutoService>();

builder.Services.AddScoped<EstoqueService>();

builder.Services.AddScoped<AlertaEstoqueService>();

builder.Services.AddScoped<VendaService>();

builder.Services.AddScoped<DashboardService>();

// Serviço responsável pelos relatórios
builder.Services.AddScoped<RelatorioService>();


// =====================================================
// CORS
// Permite que o React acesse a API
// =====================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", politica =>
    {
        politica.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});


// =====================================================
// BUILD DA APLICAÇÃO
// =====================================================
var app = builder.Build();


// =====================================================
// SWAGGER SOMENTE EM DESENVOLVIMENTO
// =====================================================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// =====================================================
// CORS
// =====================================================
app.UseCors("PermitirFrontend");


// =====================================================
// HTTPS
// Atualmente desabilitado para facilitar testes
// =====================================================
// app.UseHttpsRedirection();


// =====================================================
// AUTORIZAÇÃO
// =====================================================
app.UseAuthorization();


// =====================================================
// MAPEAMENTO DOS CONTROLLERS
// =====================================================
app.MapControllers();


// =====================================================
// INICIA A API
// =====================================================
app.Run();