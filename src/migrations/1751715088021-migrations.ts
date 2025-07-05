import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1751715088021 implements MigrationInterface {
    name = 'Migrations1751715088021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tb_users" (
                "Id" BIGSERIAL NOT NULL,
                "Username" character varying(50) NOT NULL,
                "Email" character varying(100) NOT NULL,
                "Password" character varying(255) NOT NULL,
                "Role" character varying(20) NOT NULL DEFAULT 'user',
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_9e89830ea09419ed0dafce40024" UNIQUE ("Username"),
                CONSTRAINT "UQ_5b44440211d7faa6eb4bbc6f620" UNIQUE ("Email"),
                CONSTRAINT "PK_277a91048a0adb2aae1a71bfa6c" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_certificate" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "certificate_type_id" integer NOT NULL,
                "Comment" character varying(300),
                "grant_date" date,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "certificate_issuer" character varying(300),
                CONSTRAINT "PK_51c0b9162b1abadae979822c887" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_additional_information" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "father_job_id" integer NOT NULL,
                "father_job_organ_id" integer NOT NULL,
                "mother_job_id" integer NOT NULL,
                "mother_job_organ_id" integer NOT NULL,
                "wife_job_id" integer NOT NULL,
                "wife_job_organ_id" integer NOT NULL,
                "child_count" integer NOT NULL,
                "income_level_id" integer NOT NULL,
                "brother_count" integer NOT NULL,
                "sister_count" integer NOT NULL,
                "father_education_grade_id" integer NOT NULL,
                "mother_education_grade_id" integer NOT NULL,
                "child_number" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_a596416b9cbaa5451ef3d6234c6" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_contact_info" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "location_place_id" integer NOT NULL,
                "email_address" character varying NOT NULL,
                "familiar_mobile_number" character varying NOT NULL,
                "location_address" character varying NOT NULL,
                "mobile_number" character varying NOT NULL,
                "telephone_number" character varying NOT NULL,
                "post_code" character varying NOT NULL,
                "father_mobile_number" character varying NOT NULL,
                "mother_mobile_number" character varying NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_6dca03016bd5477baa9aa4cded5" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_employee_applicant" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "applicant_id" bigint NOT NULL,
                "employee_type_id" integer NOT NULL,
                "priority_number" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_107cb1de63fe416644dfeb99949" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_force_priority" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "applicant_id" bigint NOT NULL,
                "force_id" integer NOT NULL,
                "priority_number" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_5d34c9821daef2d902bf3f128aa" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_applicant" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "applicant_status_id" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_fa8b250632a468716a5dec4d3f9" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_document" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "document_type_id" integer NOT NULL,
                "document_number" character varying NOT NULL,
                "issue_date" date NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_fc63eaae6f21bffbc698fa90590" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_education" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "education_grade_id" integer NOT NULL,
                "education_field_id" integer NOT NULL,
                "education_institution_id" integer NOT NULL,
                "education_country_id" integer NOT NULL,
                "education_province_id" integer NOT NULL,
                "education_city_id" integer NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_0c1b909dc9ce3964d0fe9ada1f3" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_experience" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "job_type_id" integer NOT NULL,
                "job_organ_id" integer NOT NULL,
                "job_title" character varying NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_ba615dc2adea4bca5d7309f4dd0" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_language_info" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "language_id" integer NOT NULL,
                "reading_level" integer NOT NULL,
                "writing_level" integer NOT NULL,
                "speaking_level" integer NOT NULL,
                "listening_level" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_4c7a68e21465d564c1d735b64ca" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_properties" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "property_type_id" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_30cd9f18bff467843ea1d099157" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_property" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "property_type_id" integer NOT NULL,
                "property_title" character varying NOT NULL,
                "property_address" character varying NOT NULL,
                "property_value" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_79c5c165edac5670423e84a63e9" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_person" (
                "Id" BIGSERIAL NOT NULL,
                "national_no" character varying(10) NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50) NOT NULL,
                "birth_date" date NOT NULL,
                "birth_place_id" integer NOT NULL,
                "location_place_id" integer,
                "sex_id" integer NOT NULL,
                "about_me" character varying(500),
                "mobile_number" character varying(15) NOT NULL,
                "telephone_number" character varying(20),
                "email_address" character varying(50),
                "address" character varying(200),
                "post_code" character(10),
                "profile_image" character varying(100),
                "created_date" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_9cfb3a57c5ad8e65380d9fedb2d" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_recruitment_tb_person_national_no" ON "tb_person" ("national_no")
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_skill" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "person_id" bigint NOT NULL,
                "skill_type_id" integer NOT NULL,
                "skill_level" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_7cfa7be62d4f3f7a8d738af2dc3" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_course_education_grade" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "course_id" bigint NOT NULL,
                "education_grade_id" integer NOT NULL,
                "education_field_id" integer,
                "adjusted_min" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                "courseId" bigint,
                CONSTRAINT "PK_82831aeaa7caaa9ddc4791fd661" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_course" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "employee_type_id" integer NOT NULL,
                "employee_force_id" integer NOT NULL,
                "Title" character varying NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "recruitment_status_id" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_639880b324b08697d1daa8c54fa" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_course_field" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "course_id" bigint NOT NULL,
                "course_field_id" integer NOT NULL,
                "Capacity" integer NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_37b525e0d07277874fdb5713b1d" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_personnel_in_course" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "course_field_id" bigint NOT NULL,
                "applicant_id" bigint NOT NULL,
                "volunteer_code" character varying NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_157fc4f3d52b7c7b4ed2469270c" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_employee_test" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "employee_type_id" integer NOT NULL,
                "test_type_id" integer NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_7a23d623472b010381b8ece04bd" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_employee_field_test" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "employee_type_id" integer NOT NULL,
                "employee_field_id" integer,
                "test_type_id" integer NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_08240b2d5dfb36232fe4ab8beac" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_base_item" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "table_id" bigint NOT NULL,
                "parent_id" bigint,
                "Title" character varying NOT NULL,
                "created_method_id" integer NOT NULL,
                CONSTRAINT "PK_fd00942b748dc674b758cf15b5a" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tb_base_table" (
                "created_by" uuid NOT NULL,
                "created_date" TIMESTAMP NOT NULL,
                "updated_by" uuid,
                "updated_date" TIMESTAMP,
                "deleted_at" TIMESTAMP,
                "Id" BIGSERIAL NOT NULL,
                "parent_id" bigint,
                "Title" character varying NOT NULL,
                "created_method_id" integer NOT NULL,
                "table_id" uuid NOT NULL,
                CONSTRAINT "PK_19f920b8b5b5fdca3748abea8f0" PRIMARY KEY ("Id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD CONSTRAINT "FK_be064d2024e2454848b2d10a9e1" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD CONSTRAINT "FK_638d522f3e106971b2042def744" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD CONSTRAINT "FK_3348840c8988c3d402ccc62eea0" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD CONSTRAINT "FK_558aaf00ba1984f028ee4e8cb3a" FOREIGN KEY ("applicant_id") REFERENCES "tb_applicant"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD CONSTRAINT "FK_617d758b5ff02e511a8b3c9b886" FOREIGN KEY ("applicant_id") REFERENCES "tb_applicant"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD CONSTRAINT "FK_2c269780f9bb3f8725bded2de73" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD CONSTRAINT "FK_ce38acedc1ff95d6a5911b664f3" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD CONSTRAINT "FK_b176263e601729d60ecfcf32312" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD CONSTRAINT "FK_a40f645aed694e0508f902c3d41" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD CONSTRAINT "FK_0fe1327148abe121a3a8703fc2a" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD CONSTRAINT "FK_2ca831471c46872f972826a45cf" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD CONSTRAINT "FK_347d23d5e2ab670a82d1d83389e" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD CONSTRAINT "FK_befc14a91ed67d9eff96aed1253" FOREIGN KEY ("person_id") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD CONSTRAINT "FK_55dd4f815c4a4cd611fbac262a8" FOREIGN KEY ("courseId") REFERENCES "tb_course"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD CONSTRAINT "FK_34fe344a703780ca56e43771aad" FOREIGN KEY ("course_id") REFERENCES "tb_course"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD CONSTRAINT "FK_e95d2c76cc068beb8966d912935" FOREIGN KEY ("course_field_id") REFERENCES "tb_course_field"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_e2d07794dbeeb0fc2a815308e61" FOREIGN KEY ("table_id") REFERENCES "tb_base_table"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_ba2ba2625afb98edda75ce8eb9a" FOREIGN KEY ("parent_id") REFERENCES "tb_base_item"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD CONSTRAINT "FK_5db1f08425691d431107bbc303a" FOREIGN KEY ("parent_id") REFERENCES "tb_base_table"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP CONSTRAINT "FK_5db1f08425691d431107bbc303a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_ba2ba2625afb98edda75ce8eb9a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_e2d07794dbeeb0fc2a815308e61"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP CONSTRAINT "FK_e95d2c76cc068beb8966d912935"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP CONSTRAINT "FK_34fe344a703780ca56e43771aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP CONSTRAINT "FK_55dd4f815c4a4cd611fbac262a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP CONSTRAINT "FK_befc14a91ed67d9eff96aed1253"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP CONSTRAINT "FK_347d23d5e2ab670a82d1d83389e"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP CONSTRAINT "FK_2ca831471c46872f972826a45cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP CONSTRAINT "FK_0fe1327148abe121a3a8703fc2a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP CONSTRAINT "FK_a40f645aed694e0508f902c3d41"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP CONSTRAINT "FK_b176263e601729d60ecfcf32312"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP CONSTRAINT "FK_ce38acedc1ff95d6a5911b664f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP CONSTRAINT "FK_2c269780f9bb3f8725bded2de73"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP CONSTRAINT "FK_617d758b5ff02e511a8b3c9b886"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP CONSTRAINT "FK_558aaf00ba1984f028ee4e8cb3a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP CONSTRAINT "FK_3348840c8988c3d402ccc62eea0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP CONSTRAINT "FK_638d522f3e106971b2042def744"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP CONSTRAINT "FK_be064d2024e2454848b2d10a9e1"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_base_table"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_base_item"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_employee_field_test"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_employee_test"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_personnel_in_course"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_course_field"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_course"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_course_education_grade"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_skill"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."ix_recruitment_tb_person_national_no"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_person"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_property"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_properties"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_language_info"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_experience"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_education"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_document"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_applicant"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_force_priority"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_employee_applicant"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_contact_info"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_additional_information"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_certificate"
        `);
        await queryRunner.query(`
            DROP TABLE "tb_users"
        `);
    }

}
