import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740984203231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question"
        ADD CONSTRAINT "UQ_03d974d1515910cd0d603728df7" UNIQUE ("Id")
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question" DROP CONSTRAINT "UQ_03d974d1515910cd0d603728df7"
    `);
    }

}
