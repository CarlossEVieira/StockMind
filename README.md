# 🚀 StockMind

Sistema inteligente de gestão de estoque desenvolvido com **ASP.NET Core**, **React**, **SQL Server**, **Dapper** e **Inteligência Artificial (Google Gemini)**.

O StockMind foi criado para auxiliar empresas no controle de estoque, vendas, movimentações e reposições inteligentes, oferecendo informações em tempo real para tomada de decisão.

---

## 📸 Demonstração

### Funcionalidades disponíveis

* Dashboard Gerencial
* Gestão de Produtos
* Controle de Estoque por Tamanho
* Controle de Entradas e Vendas
* Alertas Inteligentes
* Sugestões de Reposição com IA
* Relatórios Avançados com Dapper
* Procedures, Views e Functions no SQL Server

---

## 🎯 Objetivo

O objetivo do projeto é transformar o controle de estoque tradicional em uma solução inteligente, capaz de:

* Controlar entradas e saídas de produtos
* Identificar estoques críticos
* Gerar alertas automáticos
* Sugerir reposições utilizando IA
* Monitorar demanda de produtos
* Fornecer indicadores para tomada de decisão

---

## 🧠 Inteligência Artificial

O StockMind possui integração com o Google Gemini para auxiliar na tomada de decisão.

A IA analisa:

* Quantidade atual em estoque
* Estoque mínimo configurado
* Localização do produto
* Histórico de movimentações
* Demanda recente

E gera sugestões como:

> Prioridade: Alta
> Repor: 20 unidades
> Motivo: Estoque abaixo do mínimo e alta demanda recente.

---

## 📊 Funcionalidades

### Produtos

* Cadastro de produtos
* Edição de produtos
* Exclusão lógica
* Controle por categoria
* Controle por localização

### Estoque

* Controle por tamanho (PP, P, M, G e GG)
* Entrada de estoque
* Baixa automática de estoque
* Histórico de movimentações

### Vendas

* Registro de vendas
* Atualização automática do estoque
* Controle de saída por produto
* Geração automática de movimentações

### Alertas Inteligentes

* Estoque baixo
* Demanda alta
* Sugestão automática de reposição utilizando IA
* Controle de alertas pendentes

### Dashboard

* Total de produtos ativos
* Total em estoque
* Alertas pendentes
* Menor estoque

### Relatórios

* Produtos com estoque baixo
* Produto mais vendido
* Total de produtos ativos
* Cálculo de reposição

---

## 🏗️ Arquitetura

O projeto segue arquitetura em camadas:

```text
StockMind.API
│
├── StockMind.Api
├── StockMind.Application
├── StockMind.Domain
├── StockMind.Infrastructure
│
├── BancoDeDados
│   ├── Procedures
│   ├── Functions
│   ├── Views
│   └── Scripts
│
└── stockmind-frontend
```

---

## Backend

* ASP.NET Core 9
* Entity Framework Core
* Dapper
* SQL Server
* Swagger

### SQL Server

#### Views

* vw_ProdutosEstoqueBaixo

#### Functions

* fn_CalcularQuantidadeReposicao

#### Stored Procedures

* sp_ListarProdutosEstoqueBaixo
* sp_RegistrarEntradaEstoque
* sp_RegistrarVendaEstoque
* sp_ProdutoMaisVendido

---

## Frontend

* React
* React Router
* Axios
* Bootstrap

---

## Inteligência Artificial

* Google Gemini API

---

## 🚀 Como Executar

### Backend

```bash
dotnet restore
dotnet build
dotnet run --project StockMind.Api
```

### Swagger

```text
http://localhost:5180/swagger
```

### Frontend

```bash
npm install
npm start
```

---

## 📚 Conceitos Aplicados

* Arquitetura em Camadas
* Repository Pattern
* Dependency Injection
* Entity Framework Core
* Dapper
* SQL Server
* Stored Procedures
* Views
* Functions
* REST API
* Swagger
* Integração com Inteligência Artificial

---

## 🔮 Evoluções Futuras

* Controle de usuários
* Login e autenticação
* Dashboard analítico com gráficos
* Deploy em nuvem
* Aplicativo mobile
* Integração com ERP
* Multiempresa
* Previsão de estoque utilizando IA

---

## 👨‍💻 Autor

Carlos Eduardo de Oliveira Vieira

GitHub:
https://github.com/CarlossEVieira

Projeto desenvolvido para aprendizado de desenvolvimento Full Stack, arquitetura de software, SQL Server, Dapper e integração com Inteligência Artificial.


------------------------------------------------------------------------------------------------------------------

//Histórico para consultas

# HISTÓRICO COMPLETO - STOCKMIND

## Informações Gerais

Nome do Projeto: StockMind

Autor: Carlos Eduardo de Oliveira Vieira

Objetivo:
Sistema inteligente de gestão de estoque para controle de produtos, entradas, vendas, movimentações e alertas inteligentes utilizando Inteligência Artificial.

---

# Tecnologias Utilizadas

## Backend

* ASP.NET Core 9
* Entity Framework Core
* Dapper
* SQL Server
* Swagger

## Frontend

* React
* React Router
* Axios
* Bootstrap

## Inteligência Artificial

* Google Gemini API

---

# Arquitetura

O projeto segue Arquitetura em Camadas:

StockMind.API

* StockMind.Api
* StockMind.Application
* StockMind.Domain
* StockMind.Infrastructure
* BancoDeDados
* stockmind-frontend

---

# Entidades Principais

## Produto

Responsável pelo cadastro de produtos.

Campos principais:

* Id
* Nome
* Descricao
* Categoria
* Localizacao
* Ativo
* DataCadastro

---

## ProdutoEstoque

Responsável pelo controle de estoque por tamanho.

Campos principais:

* ProdutoId
* Tamanho
* Quantidade
* QuantidadeMinimaAlerta

Tamanhos utilizados:

* PP
* P
* M
* G
* GG

---

## MovimentacaoEstoque

Responsável pelo histórico de entradas e saídas.

Tipos:

* Entrada
* Saida

Origens:

* Reposicao
* Venda
* Procedure

---

## Venda

Representa uma venda realizada.

---

## VendaItem

Itens pertencentes a uma venda.

---

## AlertaEstoque

Responsável pelos alertas gerados pelo sistema.

Tipos:

* EstoqueBaixo
* DemandaAlta

---

# Funcionalidades Implementadas

## Produtos

* Cadastro
* Edição
* Exclusão lógica
* Consulta

---

## Estoque

* Entrada de estoque
* Controle por tamanho
* Consulta de estoque

---

## Vendas

* Registro de venda
* Baixa automática de estoque
* Registro de movimentação

---

## Alertas Inteligentes

* Estoque baixo
* Demanda alta
* Sugestão automática de reposição

---

# Inteligência Artificial

Integração com Google Gemini.

Utilizada para gerar:

* Sugestão de reposição
* Prioridade de compra
* Justificativa baseada em demanda e estoque

---

# Dapper

Foi implementado para consultas e Procedures.

Repositories:

* RelatorioDapperRepository
* EstoqueDapperRepository
* VendaDapperRepository

---

# SQL Server

## View

vw_ProdutosEstoqueBaixo

Retorna todos os produtos abaixo da quantidade mínima.

---

## Function

fn_CalcularQuantidadeReposicao

Calcula automaticamente a quantidade sugerida para reposição.

Parâmetros:

* QuantidadeAtual
* QuantidadeMinima

Retorno:

* Quantidade sugerida para compra

---

## Procedures

### sp_ListarProdutosEstoqueBaixo

Retorna produtos abaixo do estoque mínimo.

Consumida pelo Dapper.

---

### sp_RegistrarEntradaEstoque

Responsável por:

* Atualizar estoque
* Registrar movimentação de entrada

Consumida pelo EstoqueDapperRepository.

---

### sp_RegistrarVendaEstoque

Responsável por:

* Baixar estoque
* Registrar movimentação de saída

Consumida pelo VendaDapperRepository.

---

### sp_ProdutoMaisVendido

Retorna:

* Nome do produto
* Quantidade total vendida

Consumida pelo RelatorioDapperRepository.

---

# Dashboard

Indicadores implementados:

* TotalProdutos
* TotalEstoque
* AlertasPendentes
* MenorEstoque

---

# Relatórios

Endpoints:

GET /api/Relatorios/estoque-baixo

GET /api/Relatorios/total-produtos-ativos

GET /api/Relatorios/calcular-reposicao

GET /api/Relatorios/produto-mais-vendido

---

# Controllers

* ProdutosController
* EstoquesController
* VendasController
* RelatoriosController
* DashboardController

---

# Services

* ProdutoService
* EstoqueService
* VendaService
* AlertaEstoqueService
* DashboardService
* RelatorioService

---

# Repositories Entity Framework

* ProdutoRepository
* ProdutoEstoqueRepository
* MovimentacaoEstoqueRepository
* VendaRepository
* AlertaEstoqueRepository
* DashboardRepository

---

# Repositories Dapper

* RelatorioDapperRepository
* EstoqueDapperRepository
* VendaDapperRepository

---

# BancoDeDados

Estrutura criada para entrega:

BancoDeDados

* Procedures
* Functions
* Views
* Scripts

Arquivo principal:

ScriptCompletoBanco.sql

Contém:

* View
* Function
* Procedures

---

# Decisões Importantes

Durante o projeto foi decidido:

* Utilizar SQL Server ao invés de SQLite.
* Manter Entity Framework para CRUD.
* Utilizar Dapper para relatórios e Procedures.
* Utilizar Procedures para entrada e venda.
* Utilizar IA Gemini para reposição.
* Utilizar arquitetura em camadas.
* Manter nomes de variáveis completos sem abreviações.
* Comentar os arquivos principais para facilitar manutenção.

---

# Status Final

Projeto entregue com:

* ASP.NET Core
* Entity Framework
* Dapper
* SQL Server
* Swagger
* React
* Gemini AI
* Views
* Functions
* Procedures
* Dashboard
* Relatórios
* Alertas Inteligentes

Projeto considerado concluído e pronto para apresentação, portfólio e evolução futura.

Fim do histórico.
