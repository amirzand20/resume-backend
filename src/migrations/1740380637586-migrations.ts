import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740380637586 implements MigrationInterface {
    name = 'Migrations1740380637586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "base"."tb_BaseTable" (
                "Id" SERIAL NOT NULL,
                "SystemId" integer,
                "TableName" character varying(50) NOT NULL,
                "ParentTableId" integer,
                "IsEditable" boolean NOT NULL,
                CONSTRAINT "PK_49147bb7db26ab9b4f4eed1f279" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_SystemBaseItem" (
                "Id" SERIAL NOT NULL,
                "SystemId" integer NOT NULL,
                "BaseItemId" integer NOT NULL,
                CONSTRAINT "PK_aec3905e6de6a82350ef09de7c4" PRIMARY KEY ("Id", "SystemId", "BaseItemId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_SystemProcessDocument" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" SERIAL NOT NULL,
                "SystemProcessId" integer NOT NULL,
                "DocumentId" integer NOT NULL,
                CONSTRAINT "PK_c85866058252ce1889eb6dcf622" PRIMARY KEY ("Id", "SystemProcessId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_OrganAccessScopeWithDetail" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer,
                "AccessOrganId" integer,
                CONSTRAINT "PK_11a25757ef9054b96dbcfcb71fc" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_GeographicalPlace" (
                "Id" SERIAL NOT NULL,
                "ParentId" integer,
                "Title" character varying(255),
                "TypeId" integer,
                "ItemCode" character varying(4),
                "BaseCode" character varying(15),
                "LeftId" integer,
                "RightId" integer,
                "LevelNumber" integer,
                "DeActiveDate" date,
                "nsleft" integer NOT NULL DEFAULT '1',
                "nsright" integer NOT NULL DEFAULT '2',
                CONSTRAINT "UQ_54d8f24dc9eff0d600cecd486f2" UNIQUE ("Id"),
                CONSTRAINT "PK_54d8f24dc9eff0d600cecd486f2" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganProperty" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "ChangeDate" date NOT NULL,
                "GeographicalPlaceId" integer NOT NULL,
                "DeprivationDegreeId" integer,
                "BadWeatherDegreeId" integer,
                "AreaTypeId" integer NOT NULL,
                CONSTRAINT "PK_273080e689d8f404a14370c8f82" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualPost" (
                "Id" SERIAL NOT NULL,
                "Title" character varying NOT NULL,
                CONSTRAINT "PK_36a093afd2ae4daec237af5db9b" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganPost" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "PostId" integer NOT NULL,
                "Priority" smallint NOT NULL,
                "PostTypeId" integer,
                CONSTRAINT "PK_20622cfb1e40fb694362bbe3a9c" PRIMARY KEY ("Id", "PostId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrgan" (
                "Id" SERIAL NOT NULL,
                "ParentId" integer,
                "OrganTypeId" integer,
                "LeftId" integer,
                "RightId" integer,
                "nsright" integer,
                "nsleft" integer,
                "LevelNumber" integer,
                "SerialNumber" character(8),
                "ParagraphNumber" character(4),
                "Title" character varying(1000) NOT NULL,
                "ForceId" integer,
                "DeactivateDate" TIMESTAMP,
                "RowVersion" TIMESTAMP NOT NULL,
                "OrganCode" character varying(20),
                "OrganAddress" character varying(1000),
                "TelephoneNumber" character varying(50),
                CONSTRAINT "PK_cb982cb6e1a8c394f7b9426f006" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "organ"."tb_VirtualOrganOperational" (
                "Id" SERIAL NOT NULL,
                "OrganId" integer NOT NULL,
                "OperationalId" integer,
                CONSTRAINT "PK_307af066eb008bee8cdb9f85a8b" PRIMARY KEY ("Id", "OrganId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "base"."tb_BaseItem" (
                "Id" SERIAL NOT NULL,
                "ItemCode" integer NOT NULL,
                "ItemName" character varying(200) NOT NULL,
                "ParentId" integer,
                "TableId" integer NOT NULL,
                "IsActive" boolean NOT NULL,
                CONSTRAINT "UQ_b09efe0751c8b4c28f25f6f5d42" UNIQUE ("Id"),
                CONSTRAINT "PK_b09efe0751c8b4c28f25f6f5d42" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "recruitment"."tb_VolunteerInfo" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "EmploymentSpectrumId" integer NOT NULL,
                "EmploymentTypeId" integer NOT NULL,
                "ForceId" integer NOT NULL,
                "NationalNo" character varying NOT NULL,
                "FirstName" character varying NOT NULL,
                "LastName" character varying NOT NULL,
                "NickName" character varying NOT NULL,
                "PreviousLastName" character varying NOT NULL,
                "GenderId" integer NOT NULL,
                "FatherName" character varying NOT NULL,
                "TelephoneNumber" character varying,
                "MobileNumber" character varying,
                "IdNo" character varying(30),
                "IdSerial" character varying(6),
                "IdSeri" character varying(1),
                "BirthPlaceId" integer,
                "BirthDate" date NOT NULL,
                "LocationId" integer,
                "Address" character varying(1000) NOT NULL,
                "PostalCode" character varying(10),
                "EducationLevelId" integer NOT NULL,
                "EducationFieldId" integer NOT NULL,
                "EducationGradeId" integer NOT NULL,
                "ApplyPlaceId" integer,
                "IssuePlaceId" integer,
                "IssueDate" date,
                "MarriageStatusId" integer,
                "WorkingStatusId" integer,
                "JobTitle" character varying(1000) NOT NULL,
                "PhysicalStatusId" integer,
                "ReligionId" integer,
                "NationalityId" integer,
                "LastDegreeMean" double precision,
                "Height" double precision,
                "Weight" integer,
                "ChildCount" integer,
                "EyeColorId" integer,
                "InstituteId" integer,
                "BloodGroupId" integer,
                "DutyStatusId" integer,
                "VolunteerCode" character varying NOT NULL,
                "Vaccination" character varying NOT NULL,
                "isInCommitteeEmdad" boolean,
                "IsInBehzisti" boolean,
                "IsElite" boolean,
                "IsChampion" boolean,
                "IsHafez" boolean,
                "BasijStatusId" integer,
                "BasijDuration" integer,
                CONSTRAINT "UQ_c929371ab6b4e347a627d0b30d7" UNIQUE ("Id"),
                CONSTRAINT "PK_c929371ab6b4e347a627d0b30d7" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamInfo" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "ExamTitle" character varying NOT NULL,
                "ExamTypeId" integer NOT NULL,
                "ExamHoldId" integer,
                "Duration" integer,
                "FromDate" TIMESTAMP,
                "ToDate" TIMESTAMP,
                CONSTRAINT "UQ_b150036c42f23ed6121d31bf1de" UNIQUE ("Id"),
                CONSTRAINT "PK_b150036c42f23ed6121d31bf1de" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_QuestionAttachment" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionId" bigint NOT NULL,
                "FileName" character varying(500) NOT NULL,
                "AttachmentId" uuid NOT NULL,
                CONSTRAINT "UQ_4c92c1a1c761b423a4e97f0333a" UNIQUE ("Id"),
                CONSTRAINT "PK_4c92c1a1c761b423a4e97f0333a" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamQuestion" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionTitle" character varying NOT NULL,
                "Order" integer,
                "IsDescriptive" boolean,
                "DifficultyLevel" text NOT NULL,
                "AnswerDescription" text NOT NULL,
                "ExamId" bigint NOT NULL,
                CONSTRAINT "UQ_94095f1f11cbb9104f5223e1ea8" UNIQUE ("Id"),
                CONSTRAINT "PK_94095f1f11cbb9104f5223e1ea8" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_OptionAttachment" (
                "Id" BIGSERIAL NOT NULL,
                "OptionId" bigint NOT NULL,
                "FileName" character varying(500) NOT NULL,
                "AttachmentId" uuid NOT NULL,
                CONSTRAINT "UQ_e6b20c2def3c1321121e7a10743" UNIQUE ("Id"),
                CONSTRAINT "PK_e6b20c2def3c1321121e7a10743" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_QuestionOption" (
                "Id" BIGSERIAL NOT NULL,
                "QuestionId" bigint NOT NULL,
                "OptionDesc" character varying NOT NULL,
                "Order" integer,
                "IsCorrect" boolean NOT NULL,
                CONSTRAINT "UQ_1cfee998a5708e83c906f9350a5" UNIQUE ("Id"),
                CONSTRAINT "PK_1cfee998a5708e83c906f9350a5" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_Personnel" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "NationalNo" character varying NOT NULL,
                "PersonnelNo" character varying NOT NULL,
                "FirstName" character varying NOT NULL,
                "LastName" character varying NOT NULL,
                "FatherName" character varying NOT NULL,
                "IdNo" character varying(30),
                "BirthPlaceId" integer,
                "IssuePlaceId" integer,
                "LocationId" integer,
                "BirthDate" date NOT NULL,
                "IssueDate" date,
                "Address" character varying(1000) NOT NULL,
                "TelephoneNumber" character varying,
                "MobileNumber" character varying,
                "PostalCode" character varying(10),
                "NationalityId" integer,
                "MotherTongueId" integer,
                "ReligionId" integer,
                "AccentId" integer,
                "Height" double precision,
                "Weight" integer,
                "ClothingSizeId" integer,
                "HatSizeId" integer,
                "ShoeSizeId" integer,
                "BloodGroupId" integer,
                "EyeColorId" integer,
                "BrotherCount" integer,
                "SisterCount" integer,
                "ImageId" character varying,
                CONSTRAINT "UQ_f13d02fc2c910cb3f24fec2a78b" UNIQUE ("Id"),
                CONSTRAINT "PK_f13d02fc2c910cb3f24fec2a78b" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_ExamPerson" (
                "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "CreatedBy" integer NOT NULL,
                "ModifiedDate" TIMESTAMP,
                "ModifiedBy" integer,
                "Id" BIGSERIAL NOT NULL,
                "VolunteerInfoId" bigint NOT NULL,
                "PersonnelId" bigint NOT NULL,
                "ExamId" bigint NOT NULL,
                "ExamStartTime" TIMESTAMP,
                "ExamEndTime" TIMESTAMP,
                "Score" integer,
                "IsPresent" boolean,
                CONSTRAINT "UQ_999ed9bc9efc9a82da14ebe448a" UNIQUE ("Id"),
                CONSTRAINT "PK_999ed9bc9efc9a82da14ebe448a" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "exam"."tb_AnswerSubmission" (
                "Id" BIGSERIAL NOT NULL,
                "AnswerSubmissionTime" TIMESTAMP NOT NULL,
                "QuestionId" bigint NOT NULL,
                "VolunteerInfoId" bigint NOT NULL,
                "OptionId" bigint NOT NULL,
                "AnswerDescription" character varying(1000) NOT NULL,
                CONSTRAINT "UQ_ca200175e1f2792a5e7c57b1498" UNIQUE ("Id"),
                CONSTRAINT "PK_ca200175e1f2792a5e7c57b1498" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseTable"
            ADD CONSTRAINT "FK_ecff53cc2570cac8adeb994f36c" FOREIGN KEY ("ParentTableId") REFERENCES "base"."tb_BaseTable"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemBaseItem"
            ADD CONSTRAINT "FK_93043116eb43d47bdc23f7a6733" FOREIGN KEY ("BaseItemId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemProcessDocument"
            ADD CONSTRAINT "FK_0d479bdc8a247942d5d67fec8e1" FOREIGN KEY ("DocumentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail"
            ADD CONSTRAINT "FK_67988f5a62b9ae6371a62861253" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail"
            ADD CONSTRAINT "FK_a7733407cc73ba00bfe8ee6c4f3" FOREIGN KEY ("AccessOrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace"
            ADD CONSTRAINT "FK_dfbf84b9735b03d76fd81d08253" FOREIGN KEY ("ParentId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace"
            ADD CONSTRAINT "FK_ccbaf959d58518fb97cdf67fb3c" FOREIGN KEY ("TypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_d5619b602efd417c3868a8c3e85" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_0211db93cd2e7705a2291c68def" FOREIGN KEY ("GeographicalPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_04398850295f36280377adab5e8" FOREIGN KEY ("DeprivationDegreeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_bfc155bf7e368511a60df4dd374" FOREIGN KEY ("BadWeatherDegreeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty"
            ADD CONSTRAINT "FK_c1dc6db60ae86f415a8e82ecb77" FOREIGN KEY ("AreaTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_6f378d09a01261410d751a70145" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_f541cad8a3880101d75809a82a9" FOREIGN KEY ("PostId") REFERENCES "organ"."tb_VirtualPost"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost"
            ADD CONSTRAINT "FK_4120acba827dc366b669a38ab82" FOREIGN KEY ("PostTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_10a7c5a61282766a433ad260f77" FOREIGN KEY ("ParentId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_3d86be392f56bb0c2b17d80b030" FOREIGN KEY ("OrganTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan"
            ADD CONSTRAINT "FK_b1201b750c21edfe665fd514583" FOREIGN KEY ("ForceId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational"
            ADD CONSTRAINT "FK_8781f496d04bb4152686363ec9a" FOREIGN KEY ("OrganId") REFERENCES "organ"."tb_VirtualOrgan"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational"
            ADD CONSTRAINT "FK_6eec1dfb55570810439dca83012" FOREIGN KEY ("OperationalId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem"
            ADD CONSTRAINT "FK_6572b5466bd8467c065f0420db7" FOREIGN KEY ("ParentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem"
            ADD CONSTRAINT "FK_02c344a8a70a62e617e6f2d8b46" FOREIGN KEY ("TableId") REFERENCES "base"."tb_BaseTable"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_c2545fa14a8d0fd9d961e4a24c6" FOREIGN KEY ("EmploymentSpectrumId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_62cf33c2686eb7dcd4f8d6e5818" FOREIGN KEY ("EmploymentTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_6e326bd9031fae5925ffb450bc4" FOREIGN KEY ("ForceId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_815b1512ff2784431c15cfa6b29" FOREIGN KEY ("GenderId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_90feea1585b18263aaaea042c67" FOREIGN KEY ("BirthPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_3b3df0ab149de62647a15dd7d33" FOREIGN KEY ("LocationId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_96ee1eedf17a8ffa36b245f145c" FOREIGN KEY ("EducationLevelId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_4c1458a3d9d05a4194edde79e2d" FOREIGN KEY ("EducationFieldId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_aea2b9996ddecdd511b9cf5553e" FOREIGN KEY ("EducationGradeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_be068dc60b74ea3001b9042dbef" FOREIGN KEY ("ApplyPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_5714e377732f73a49defcd184fa" FOREIGN KEY ("IssuePlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_920aa8871bbbef146c6b33f68a3" FOREIGN KEY ("MarriageStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_f6ae94afc9c33047dab41ac5d07" FOREIGN KEY ("WorkingStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_9db97e0ad9ff230c145d84f7da8" FOREIGN KEY ("PhysicalStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_c505b85e74acb3fa87b38996f81" FOREIGN KEY ("ReligionId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_77b6620a53896c95dcacc99210d" FOREIGN KEY ("NationalityId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_b4c1a469698d8ca4f0e1cca23c3" FOREIGN KEY ("EyeColorId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_38fbf34c88163c36c24838ab1ee" FOREIGN KEY ("InstituteId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_e1f57967083d272c19cf60e60c7" FOREIGN KEY ("BloodGroupId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_5a4096a40d16db7f70b0731d607" FOREIGN KEY ("DutyStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo"
            ADD CONSTRAINT "FK_8cf4e4d81033d850e300e0ffebc" FOREIGN KEY ("BasijStatusId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo"
            ADD CONSTRAINT "FK_18b94e5f6bcdadd7864ff45809d" FOREIGN KEY ("ExamTypeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo"
            ADD CONSTRAINT "FK_e995ce7e819b4e342187d67b036" FOREIGN KEY ("ExamHoldId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionAttachment"
            ADD CONSTRAINT "FK_345405683879757676319c58b22" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamQuestion"
            ADD CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_OptionAttachment"
            ADD CONSTRAINT "FK_99bd1b86f3abeb82837c2226282" FOREIGN KEY ("OptionId") REFERENCES "exam"."tb_QuestionOption"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionOption"
            ADD CONSTRAINT "FK_c669a2bce5734fdfb08673169e8" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_9fddc584be8955119b199de8a19" FOREIGN KEY ("BirthPlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_3319c835cfd57e741f8712ca076" FOREIGN KEY ("IssuePlaceId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_4d7343fb2741369c15e52406736" FOREIGN KEY ("LocationId") REFERENCES "base"."tb_GeographicalPlace"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_56e6286547730f4619c3f7a4260" FOREIGN KEY ("NationalityId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a" FOREIGN KEY ("MotherTongueId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_5daa1954c33cccba501ee99a69f" FOREIGN KEY ("ReligionId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d" FOREIGN KEY ("AccentId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d" FOREIGN KEY ("ClothingSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e" FOREIGN KEY ("HatSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_4886cca6e19155560dd295e9076" FOREIGN KEY ("ShoeSizeId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_c9659b14b13f50c00be04e45951" FOREIGN KEY ("BloodGroupId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel"
            ADD CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd" FOREIGN KEY ("EyeColorId") REFERENCES "base"."tb_BaseItem"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_d528668df74a40d8972c0aa3e76" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_dd9ad34f6aea7d3de4fde23251a" FOREIGN KEY ("PersonnelId") REFERENCES "exam"."tb_Personnel"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson"
            ADD CONSTRAINT "FK_8ec37184e3b9acc427dfc397f10" FOREIGN KEY ("ExamId") REFERENCES "exam"."tb_ExamInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_79326249a1ab65488f8541bf23d" FOREIGN KEY ("QuestionId") REFERENCES "exam"."tb_ExamQuestion"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_fb4fe0ad1f6ce3df651a2a1eedb" FOREIGN KEY ("VolunteerInfoId") REFERENCES "recruitment"."tb_VolunteerInfo"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission"
            ADD CONSTRAINT "FK_9b93246d5db89b2ad24b22d5d2a" FOREIGN KEY ("OptionId") REFERENCES "exam"."tb_QuestionOption"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_9b93246d5db89b2ad24b22d5d2a"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_fb4fe0ad1f6ce3df651a2a1eedb"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_AnswerSubmission" DROP CONSTRAINT "FK_79326249a1ab65488f8541bf23d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_8ec37184e3b9acc427dfc397f10"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_dd9ad34f6aea7d3de4fde23251a"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamPerson" DROP CONSTRAINT "FK_d528668df74a40d8972c0aa3e76"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_28180ebe088e8b124e4a2f31ddd"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c9659b14b13f50c00be04e45951"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4886cca6e19155560dd295e9076"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_eb27a4ba5c7dc2dd9f5a074ee3e"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_c4dd3f47c314dde3be83ec4705d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_a523bcce8b0078d96c75f5c0a8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_5daa1954c33cccba501ee99a69f"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_251bc5af57e5b6f9eb2df21282a"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_56e6286547730f4619c3f7a4260"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_4d7343fb2741369c15e52406736"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_3319c835cfd57e741f8712ca076"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_Personnel" DROP CONSTRAINT "FK_9fddc584be8955119b199de8a19"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionOption" DROP CONSTRAINT "FK_c669a2bce5734fdfb08673169e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_OptionAttachment" DROP CONSTRAINT "FK_99bd1b86f3abeb82837c2226282"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamQuestion" DROP CONSTRAINT "FK_6cb5b8ebf5bc085f33632488bdf"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_QuestionAttachment" DROP CONSTRAINT "FK_345405683879757676319c58b22"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo" DROP CONSTRAINT "FK_e995ce7e819b4e342187d67b036"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"."tb_ExamInfo" DROP CONSTRAINT "FK_18b94e5f6bcdadd7864ff45809d"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_8cf4e4d81033d850e300e0ffebc"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_5a4096a40d16db7f70b0731d607"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_e1f57967083d272c19cf60e60c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_38fbf34c88163c36c24838ab1ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_b4c1a469698d8ca4f0e1cca23c3"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_77b6620a53896c95dcacc99210d"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_c505b85e74acb3fa87b38996f81"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_9db97e0ad9ff230c145d84f7da8"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_f6ae94afc9c33047dab41ac5d07"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_920aa8871bbbef146c6b33f68a3"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_5714e377732f73a49defcd184fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_be068dc60b74ea3001b9042dbef"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_aea2b9996ddecdd511b9cf5553e"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_4c1458a3d9d05a4194edde79e2d"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_96ee1eedf17a8ffa36b245f145c"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_3b3df0ab149de62647a15dd7d33"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_90feea1585b18263aaaea042c67"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_815b1512ff2784431c15cfa6b29"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_6e326bd9031fae5925ffb450bc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_62cf33c2686eb7dcd4f8d6e5818"
        `);
        await queryRunner.query(`
            ALTER TABLE "recruitment"."tb_VolunteerInfo" DROP CONSTRAINT "FK_c2545fa14a8d0fd9d961e4a24c6"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem" DROP CONSTRAINT "FK_02c344a8a70a62e617e6f2d8b46"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseItem" DROP CONSTRAINT "FK_6572b5466bd8467c065f0420db7"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational" DROP CONSTRAINT "FK_6eec1dfb55570810439dca83012"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganOperational" DROP CONSTRAINT "FK_8781f496d04bb4152686363ec9a"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_b1201b750c21edfe665fd514583"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_3d86be392f56bb0c2b17d80b030"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrgan" DROP CONSTRAINT "FK_10a7c5a61282766a433ad260f77"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_4120acba827dc366b669a38ab82"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_f541cad8a3880101d75809a82a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganPost" DROP CONSTRAINT "FK_6f378d09a01261410d751a70145"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_c1dc6db60ae86f415a8e82ecb77"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_bfc155bf7e368511a60df4dd374"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_04398850295f36280377adab5e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_0211db93cd2e7705a2291c68def"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_VirtualOrganProperty" DROP CONSTRAINT "FK_d5619b602efd417c3868a8c3e85"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace" DROP CONSTRAINT "FK_ccbaf959d58518fb97cdf67fb3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_GeographicalPlace" DROP CONSTRAINT "FK_dfbf84b9735b03d76fd81d08253"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail" DROP CONSTRAINT "FK_a7733407cc73ba00bfe8ee6c4f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "organ"."tb_OrganAccessScopeWithDetail" DROP CONSTRAINT "FK_67988f5a62b9ae6371a62861253"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemProcessDocument" DROP CONSTRAINT "FK_0d479bdc8a247942d5d67fec8e1"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_SystemBaseItem" DROP CONSTRAINT "FK_93043116eb43d47bdc23f7a6733"
        `);
        await queryRunner.query(`
            ALTER TABLE "base"."tb_BaseTable" DROP CONSTRAINT "FK_ecff53cc2570cac8adeb994f36c"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_AnswerSubmission"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamPerson"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_Personnel"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_QuestionOption"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_OptionAttachment"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamQuestion"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_QuestionAttachment"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"."tb_ExamInfo"
        `);
        await queryRunner.query(`
            DROP TABLE "recruitment"."tb_VolunteerInfo"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_BaseItem"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganOperational"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrgan"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganPost"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualPost"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_VirtualOrganProperty"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_GeographicalPlace"
        `);
        await queryRunner.query(`
            DROP TABLE "organ"."tb_OrganAccessScopeWithDetail"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_SystemProcessDocument"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_SystemBaseItem"
        `);
        await queryRunner.query(`
            DROP TABLE "base"."tb_BaseTable"
        `);
    }

}
