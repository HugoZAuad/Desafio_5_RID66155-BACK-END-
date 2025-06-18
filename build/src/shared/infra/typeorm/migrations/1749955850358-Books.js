"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books1749955850358 = void 0;
const typeorm_1 = require("typeorm");
class Books1749955850358 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "books",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "titulo",
                    type: "varchar",
                },
                {
                    name: "pages",
                    type: "integer",
                },
                {
                    name: "ISBN",
                    type: "integer",
                },
                {
                    name: "editora",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("books");
    }
}
exports.Books1749955850358 = Books1749955850358;
