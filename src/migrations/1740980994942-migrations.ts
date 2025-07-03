import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740980994942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_QuestionAttachment" DROP CONSTRAINT "FK_345405683879757676319c58b22"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_QuestionAttachment"
    ADD CONSTRAINT "FK_345405683879757676319c58b22" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_Question"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_QuestionOption" DROP CONSTRAINT "FK_c669a2bce5734fdfb08673169e8"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_QuestionOption"
    ADD CONSTRAINT "FK_c669a2bce5734fdfb08673169e8" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_Question"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_QuestionOption" DROP CONSTRAINT "FK_c669a2bce5734fdfb08673169e8"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_QuestionOption"
    ADD CONSTRAINT "FK_c669a2bce5734fdfb08673169e8" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_QuestionAttachment" DROP CONSTRAINT "FK_345405683879757676319c58b22"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_QuestionAttachment"
ADD CONSTRAINT "FK_345405683879757676319c58b22" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
    }

}
