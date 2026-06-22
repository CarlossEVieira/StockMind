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
