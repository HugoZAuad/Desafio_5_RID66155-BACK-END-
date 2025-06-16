import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Books1749955850358 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books")
    }
}
