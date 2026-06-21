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