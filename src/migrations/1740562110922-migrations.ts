import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1740562110922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      ALTER TABLE "exam"."tb_ExamSubject" DROP CONSTRAINT "FK_4089e97e7acd42e6fb7ded37a30"
      `);
      await queryRunner.query(`
      ALTER TABLE "exam"."tb_Question" DROP CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e"
  `);
    await queryRunner.query(`
DROP TABLE "exam"."tb_ExamSubject"
`);
    await queryRunner.query(`
        CREATE TABLE "exam"."tb_QuestionSubject" (
            "Id" SERIAL NOT NULL,
            "Title" character varying(1000) NOT NULL,
            "nsleft" integer NOT NULL DEFAULT '1',
            "nsright" integer NOT NULL DEFAULT '2',
            "parentId" integer,
            CONSTRAINT "PK_39cac2373c6d7ba41b3a02f4c37" PRIMARY KEY ("Id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_QuestionSubject"
        ADD CONSTRAINT "FK_c52bc253c6df966830eaf0ed9c8" FOREIGN KEY ("parentId") REFERENCES "exam"."tb_QuestionSubject"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Question"
        ADD CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e" FOREIGN KEY ("ExamSubjectId") REFERENCES "exam"."tb_QuestionSubject"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_QuestionSubject" DROP CONSTRAINT "FK_c52bc253c6df966830eaf0ed9c8"
    `);
    await queryRunner.query(`
        DROP TABLE "exam"."tb_QuestionSubject"
    `);
  }
}
