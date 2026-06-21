/* =========================================================
   STOCKMIND
   SCRIPT COMPLETO DE BANCO DE DADOS
   Views + Functions + Procedures
   ========================================================= */


/* =========================================================
   VIEW
   vw_ProdutosEstoqueBaixo
   ========================================================= */

CREATE OR ALTER VIEW vw_ProdutosEstoqueBaixo
AS
SELECT
    p.Id AS ProdutoId,
    p.Nome,
    p.Categoria,
    p.Localizacao,
    pe.Tamanho,
    pe.Quantidade,
    pe.QuantidadeMinimaAlerta
FROM Produtos p
INNER JOIN ProdutosEstoque pe
    ON p.Id = pe.ProdutoId
WHERE pe.Quantidade <= pe.QuantidadeMinimaAlerta;
GO


/* =========================================================
   FUNCTION
   fn_CalcularQuantidadeReposicao
   ========================================================= */

CREATE OR ALTER FUNCTION fn_CalcularQuantidadeReposicao
(
    @QuantidadeAtual INT,
    @QuantidadeMinima INT
)
RETURNS INT
AS
BEGIN

    DECLARE @QuantidadeReposicao INT;

    SET @QuantidadeReposicao =
        (@QuantidadeMinima * 2) - @QuantidadeAtual;

    IF @QuantidadeReposicao < 0
        SET @QuantidadeReposicao = 0;

    RETURN @QuantidadeReposicao;

END;
GO


/* =========================================================
   PROCEDURE
   sp_ListarProdutosEstoqueBaixo
   ========================================================= */

CREATE OR ALTER PROCEDURE sp_ListarProdutosEstoqueBaixo
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        p.Id AS ProdutoId,
        p.Nome,
        p.Categoria,
        p.Localizacao,
        pe.Tamanho,
        pe.Quantidade,
        pe.QuantidadeMinimaAlerta
    FROM Produtos p
    INNER JOIN ProdutosEstoque pe
        ON p.Id = pe.ProdutoId
    WHERE pe.Quantidade <= pe.QuantidadeMinimaAlerta;

END;
GO


/* =========================================================
   PROCEDURE
   sp_RegistrarEntradaEstoque
   ========================================================= */

CREATE OR ALTER PROCEDURE sp_RegistrarEntradaEstoque
(
    @ProdutoId INT,
    @Tamanho VARCHAR(10),
    @Quantidade INT
)
AS
BEGIN

    SET NOCOUNT ON;

    UPDATE ProdutosEstoque
    SET Quantidade = Quantidade + @Quantidade
    WHERE ProdutoId = @ProdutoId
      AND Tamanho = @Tamanho;

    INSERT INTO MovimentacoesEstoque
    (
        ProdutoId,
        ProdutoEstoqueId,
        TipoMovimentacao,
        OrigemMovimentacao,
        Quantidade,
        Observacao,
        DataMovimentacao
    )
    SELECT
        ProdutoId,
        Id,
        'Entrada',
        'Procedure',
        @Quantidade,
        'Entrada via Dapper',
        GETDATE()
    FROM ProdutosEstoque
    WHERE ProdutoId = @ProdutoId
      AND Tamanho = @Tamanho;

END;
GO


/* =========================================================
   PROCEDURE
   sp_RegistrarVendaEstoque
   ========================================================= */

CREATE OR ALTER PROCEDURE sp_RegistrarVendaEstoque
(
    @ProdutoId INT,
    @Tamanho VARCHAR(10),
    @Quantidade INT,
    @Observacao VARCHAR(500)
)
AS
BEGIN

    SET NOCOUNT ON;

    UPDATE ProdutosEstoque
    SET Quantidade = Quantidade - @Quantidade
    WHERE ProdutoId = @ProdutoId
      AND Tamanho = @Tamanho;

    INSERT INTO MovimentacoesEstoque
    (
        ProdutoId,
        ProdutoEstoqueId,
        TipoMovimentacao,
        OrigemMovimentacao,
        Quantidade,
        Observacao,
        DataMovimentacao
    )
    SELECT
        ProdutoId,
        Id,
        'Saida',
        'Procedure',
        @Quantidade,
        @Observacao,
        GETDATE()
    FROM ProdutosEstoque
    WHERE ProdutoId = @ProdutoId
      AND Tamanho = @Tamanho;

END;
GO


/* =========================================================
   PROCEDURE
   sp_ProdutoMaisVendido
   ========================================================= */

CREATE OR ALTER PROCEDURE sp_ProdutoMaisVendido
AS
BEGIN

    SET NOCOUNT ON;

    SELECT TOP 1
        p.Nome,
        SUM(vi.Quantidade) AS QuantidadeVendida
    FROM VendaItens vi
    INNER JOIN Produtos p
        ON p.Id = vi.ProdutoId
    GROUP BY p.Nome
    ORDER BY SUM(vi.Quantidade) DESC;

END;
GO


/* =========================================================
   FIM DO SCRIPT
   ========================================================= */