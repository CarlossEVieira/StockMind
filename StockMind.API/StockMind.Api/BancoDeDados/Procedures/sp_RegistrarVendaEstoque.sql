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