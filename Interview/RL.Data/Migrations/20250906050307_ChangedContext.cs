using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RL.Data.Migrations
{
    public partial class ChangedContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsersUserId",
                table: "Procedures",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Procedures_UsersUserId",
                table: "Procedures",
                column: "UsersUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Procedures_Users_UsersUserId",
                table: "Procedures",
                column: "UsersUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Procedures_Users_UsersUserId",
                table: "Procedures");

            migrationBuilder.DropIndex(
                name: "IX_Procedures_UsersUserId",
                table: "Procedures");

            migrationBuilder.DropColumn(
                name: "UsersUserId",
                table: "Procedures");
        }
    }
}
