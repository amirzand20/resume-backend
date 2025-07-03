import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740548349468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "exam"."tb_ExamSubject" (
            "Id" SERIAL NOT NULL,
            "Title" character varying(1000) NOT NULL,
            "nsleft" integer NOT NULL DEFAULT '1',
            "nsright" integer NOT NULL DEFAULT '2',
            "parentId" integer,
            CONSTRAINT "PK_e1162f7ffb78309bd6e4577c6fd" PRIMARY KEY ("Id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "exam"."tb_Question" (
            "Id" BIGSERIAL NOT NULL,
            "QuestionTitle" character varying NOT NULL,
            "Order" integer,
            "IsDescriptive" boolean,
            "DifficultyLevel" text NOT NULL,
            "AnswerDescription" text NOT NULL,
            "ExamSubjectId" integer NOT NULL,
            CONSTRAINT "UQ_03d974d1515910cd0d603728df7" UNIQUE ("Id"),
            CONSTRAINT "PK_03d974d1515910cd0d603728df7" PRIMARY KEY ("Id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "QuestionTitle"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "Order"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "IsDescriptive"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "DifficultyLevel"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "AnswerDescription"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion"
        ADD "VolunteerInfoId" bigint NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion"
        ADD "PersonnelId" bigint NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion"
        ADD "QuestionId" bigint NOT NULL
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion"
    ADD CONSTRAINT "UQ_94095f1f11cbb9104f5223e1ea8" UNIQUE ("Id")
`);
await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamSubject"
ADD CONSTRAINT "FK_4089e97e7acd42e6fb7ded37a30" FOREIGN KEY ("parentId") REFERENCES "exam"."tb_ExamSubject"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_Question"
ADD CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e" FOREIGN KEY ("ExamSubjectId") REFERENCES "exam"."tb_ExamSubject"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD CONSTRAINT "FK_8aad02be8cb1b83c02abfcf2a52" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD CONSTRAINT "FK_7db476e5be2efe4c7068ee7367c" FOREIGN KEY ("PersonnelId") REFERENCES "exam"."tb_Personnel"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD CONSTRAINT "FK_922a6f4b34bcc41b606d51093ca" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_Question"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_922a6f4b34bcc41b606d51093ca"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_7db476e5be2efe4c7068ee7367c"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_8aad02be8cb1b83c02abfcf2a52"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Question" DROP CONSTRAINT "FK_7dd416cc57d35a2168849c0be2e"
`);
await queryRunner.query(`
    ALTER TABLE "exam"."tb_ExamSubject" DROP CONSTRAINT "FK_4089e97e7acd42e6fb7ded37a30"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "UQ_94095f1f11cbb9104f5223e1ea8"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "QuestionId"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "PersonnelId"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion" DROP COLUMN "VolunteerInfoId"
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD "AnswerDescription" text NOT NULL
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD "DifficultyLevel" text NOT NULL
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD "IsDescriptive" boolean
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD "Order" integer
`);
await queryRunner.query(`
ALTER TABLE "exam"."tb_ExamQuestion"
ADD "QuestionTitle" character varying NOT NULL
`);
await queryRunner.query(`
DROP TABLE "exam"."tb_Question"
`);
await queryRunner.query(`
DROP TABLE "exam"."tb_ExamSubject"
`);
    }

}
