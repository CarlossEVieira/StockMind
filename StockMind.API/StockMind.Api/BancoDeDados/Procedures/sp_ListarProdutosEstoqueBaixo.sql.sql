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