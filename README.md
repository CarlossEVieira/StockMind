# 🚀 StockMind

Sistema inteligente de gestão de estoque desenvolvido com **.NET 8**, **React** e **Inteligência Artificial (Google Gemini)**.

O StockMind foi criado para auxiliar empresas no controle de estoque, vendas, movimentações e reposições inteligentes, oferecendo informações em tempo real para tomada de decisão.

---

## 📸 Demonstração

Em breve:

* Dashboard Inteligente
* Gestão de Produtos
* Controle de Estoque por Tamanho
* Alertas Inteligentes
* Sugestões de Reposição com IA

---

## 🎯 Objetivo

O objetivo do projeto é transformar o controle de estoque tradicional em uma solução inteligente, capaz de:

* Controlar entradas e saídas de produtos
* Identificar estoques críticos
* Gerar alertas automáticos
* Sugerir reposições utilizando IA
* Antecipar necessidades futuras com base na demanda

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

* Controle por tamanho
* Entrada de estoque
* Baixa automática
* Histórico de movimentações

### Vendas

* Registro de vendas
* Atualização automática do estoque
* Controle de saída por produto

### Alertas

* Estoque baixo
* Sugestão automática de reposição
* Integração com IA

### Dashboard

* Total de produtos
* Total em estoque
* Alertas pendentes
* Menor estoque
* Movimentações recentes

---

## 🏗️ Arquitetura

O projeto segue arquitetura em camadas:

```text
StockMind.API
│
├── StockMind.Application
├── StockMind.Domain
├── StockMind.Infrastructure
│
└── stockmind-frontend
```

### Backend

* .NET 8
* Entity Framework Core
* SQLite
* Swagger

### Frontend

* React
* React Router
* Axios
* Bootstrap

### IA

* Google Gemini API

---

## 🚀 Como Executar

### Backend

```bash
dotnet restore
dotnet build
dotnet run
```

### Frontend

```bash
npm install
npm start
```

---

## 🔮 Roadmap

### Em desenvolvimento

* [ ] Alerta de demanda alta
* [ ] Dashboard analítico
* [ ] Gráficos de movimentação
* [ ] Controle de usuários
* [ ] Login e autenticação
* [ ] Deploy em nuvem

### Futuro

* [ ] Previsão de estoque utilizando IA
* [ ] Aplicativo mobile
* [ ] Integração com ERP
* [ ] Multiempresa

---

## 👨‍💻 Autor

Carlos Eduardo de Oliveira Vieira

GitHub:
https://github.com/CarlossEVieira

Projeto desenvolvido para aprendizado de desenvolvimento Full Stack, arquitetura de software e integração com Inteligência Artificial.
