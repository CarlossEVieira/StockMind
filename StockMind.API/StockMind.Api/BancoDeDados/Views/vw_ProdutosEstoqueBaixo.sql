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