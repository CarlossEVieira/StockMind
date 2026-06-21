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