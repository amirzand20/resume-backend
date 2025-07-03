import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1740549764452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_3319c835cfd57e741f8712ca076"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4886cca6e19155560dd295e9076"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4d7343fb2741369c15e52406736"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_56e6286547730f4619c3f7a4260"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_5daa1954c33cccba501ee99a69f"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_9fddc584be8955119b199de8a19"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c9659b14b13f50c00be04e45951"
    `);
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "IdNo"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "BirthPlaceId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "IssuePlaceId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "LocationId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "BirthDate"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "IssueDate"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "Address"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "TelephoneNumber"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "MobileNumber"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "PostalCode"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "NationalityId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "MotherTongueId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "ReligionId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "AccentId"
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "Height"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "Weight"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "ClothingSizeId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "HatSizeId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "ShoeSizeId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "BloodGroupId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "EyeColorId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "BrotherCount"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "SisterCount"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel" DROP COLUMN "ImageId"
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "UQ_f13d02fc2c910cb3f24fec2a78b" UNIQUE ("Id")
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "UQ_f13d02fc2c910cb3f24fec2a78b"
    `);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "ImageId" character varying
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "SisterCount" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "BrotherCount" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "EyeColorId" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "BloodGroupId" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "ShoeSizeId" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "HatSizeId" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "ClothingSizeId" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "Weight" integer
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "Height" double precision
`);
    await queryRunner.query(`
    ALTER TABLE "exam"."tb_Personnel"
    ADD "AccentId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "ReligionId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "MotherTongueId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "NationalityId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "PostalCode" character varying(10)
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "MobileNumber" character varying
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "TelephoneNumber" character varying
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "Address" character varying(1000) NOT NULL
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "IssueDate" date
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "BirthDate" date NOT NULL
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "LocationId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "IssuePlaceId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "BirthPlaceId" integer
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD "IdNo" character varying(30)
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e" FOREIGN KEY ("HatSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_c9659b14b13f50c00be04e45951" FOREIGN KEY ("BloodGroupId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d" FOREIGN KEY ("ClothingSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d" FOREIGN KEY ("AccentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_9fddc584be8955119b199de8a19" FOREIGN KEY ("BirthPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_5daa1954c33cccba501ee99a69f" FOREIGN KEY ("ReligionId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_56e6286547730f4619c3f7a4260" FOREIGN KEY ("NationalityId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_4d7343fb2741369c15e52406736" FOREIGN KEY ("LocationId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_4886cca6e19155560dd295e9076" FOREIGN KEY ("ShoeSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_3319c835cfd57e741f8712ca076" FOREIGN KEY ("IssuePlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd" FOREIGN KEY ("EyeColorId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
    await queryRunner.query(`
ALTER TABLE "exam"."tb_Personnel"
ADD CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a" FOREIGN KEY ("MotherTongueId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
`);
  }
}
