using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockMind.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarTipoAlerta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TipoAlerta",
                table: "AlertasEstoque",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoAlerta",
                table: "AlertasEstoque");
        }
    }
}
