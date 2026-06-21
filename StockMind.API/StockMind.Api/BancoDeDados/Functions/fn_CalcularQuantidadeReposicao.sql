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