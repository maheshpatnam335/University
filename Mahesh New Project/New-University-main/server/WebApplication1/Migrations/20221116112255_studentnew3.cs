using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class studentnew3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Section",
                table: "University_Student");

            migrationBuilder.AddColumn<int>(
                name: "SectionId",
                table: "University_Student",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "University_Student");

            migrationBuilder.AddColumn<string>(
                name: "Section",
                table: "University_Student",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
