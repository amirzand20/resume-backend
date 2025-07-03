import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1741760950844 implements MigrationInterface {
  name = 'Migrations1741760950844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP COLUMN "AnswerSubmissionTime"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD "ExamId" bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo"
            ADD CONSTRAINT "UQ_b150036c42f23ed6121d31bf1de" UNIQUE ("Id")
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "UQ_999ed9bc9efc9a82da14ebe448a" UNIQUE ("Id")
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "UQ_ca200175e1f2792a5e7c57b1498" UNIQUE ("Id")
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_1c1f90b612abe0c78ee9b147b26" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_1c1f90b612abe0c78ee9b147b26"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "UQ_ca200175e1f2792a5e7c57b1498"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "UQ_999ed9bc9efc9a82da14ebe448a"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo" DROP CONSTRAINT "UQ_b150036c42f23ed6121d31bf1de"
        `);
    await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem" DROP CONSTRAINT "UQ_b09efe0751c8b4c28f25f6f5d42"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP COLUMN "ExamId"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD "AnswerSubmissionTime" TIMESTAMP DEFAULT now()
        `);
  }
}
