import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740982188879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_7db476e5be2efe4c7068ee7367c"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_8aad02be8cb1b83c02abfcf2a52"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_79326249a1ab65488f8541bf23d"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_AnswerSubmission"
ADD CONSTRAINT "FK_79326249a1ab65488f8541bf23d" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_Question"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "VolunteerInfoId"
`);
await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "PersonnelId"
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion"
        ADD "PersonnelId" bigint NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion"
        ADD "VolunteerInfoId" bigint NOT NULL
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_79326249a1ab65488f8541bf23d"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_AnswerSubmission"
    ADD CONSTRAINT "FK_79326249a1ab65488f8541bf23d" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion"
    ADD CONSTRAINT "FK_8aad02be8cb1b83c02abfcf2a52" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion"
    ADD CONSTRAINT "FK_7db476e5be2efe4c7068ee7367c" FOREIGN KEY ("PersonnelId") REFERENCES "exam"."tb_Personnel"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    }

}
