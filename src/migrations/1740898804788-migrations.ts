import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740898804788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question" DROP CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e"
    `);
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question" DROP COLUMN "ExamSubjectId"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question"
        ADD "QuestionSubjectId" integer NOT NULL
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Question"
    ADD CONSTRAINT "FK_46b01a380df7869fa9c1fd25f7c" FOREIGN KEY ("QuestionSubjectId") REFERENCES "exam"."tb_QuestionSubject"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question" DROP CONSTRAINT "FK_46b01a380df7869fa9c1fd25f7c"
    `);
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question" DROP COLUMN "QuestionSubjectId"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question"
        ADD "ExamSubjectId" integer
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Question"
    ADD CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e" FOREIGN KEY ("ExamSubjectId") REFERENCES "exam"."tb_QuestionSubject"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
    }

}
