import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1751713810835 implements MigrationInterface {
    name = 'Migrations1751713810835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP CONSTRAINT "FK_be064d2024e2454848b2d10a9e1"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP CONSTRAINT "FK_638d522f3e106971b2042def744"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP CONSTRAINT "FK_3348840c8988c3d402ccc62eea0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP CONSTRAINT "FK_558aaf00ba1984f028ee4e8cb3a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP CONSTRAINT "FK_617d758b5ff02e511a8b3c9b886"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP CONSTRAINT "FK_2c269780f9bb3f8725bded2de73"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP CONSTRAINT "FK_ce38acedc1ff95d6a5911b664f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP CONSTRAINT "FK_b176263e601729d60ecfcf32312"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP CONSTRAINT "FK_a40f645aed694e0508f902c3d41"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP CONSTRAINT "FK_0fe1327148abe121a3a8703fc2a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP CONSTRAINT "FK_2ca831471c46872f972826a45cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP CONSTRAINT "FK_347d23d5e2ab670a82d1d83389e"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP CONSTRAINT "FK_befc14a91ed67d9eff96aed1253"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP CONSTRAINT "FK_b9f1e9382d5b01e04f7c3475196"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP CONSTRAINT "FK_34fe344a703780ca56e43771aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP CONSTRAINT "FK_e95d2c76cc068beb8966d912935"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP CONSTRAINT "FK_5db1f08425691d431107bbc303a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_e2d07794dbeeb0fc2a815308e61"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_ba2ba2625afb98edda75ce8eb9a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."ix_recruitment_tb_person_national_no"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_person"
                RENAME COLUMN "id" TO "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_person"
                RENAME CONSTRAINT "PK_e95b86d54f9eea67ba5ba07369a" TO "PK_9cfb3a57c5ad8e65380d9fedb2d"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "tb_person_id_seq"
            RENAME TO "tb_person_Id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP CONSTRAINT "PK_b44721945062c4742301fd83d5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "certificateTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "grantDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "certificateIssuer"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP CONSTRAINT "PK_33c41443922af7dc4546fc7e6d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "fatherJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "fatherJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "motherJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "motherJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "wifeJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "wifeJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "childCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "incomeLevelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "brotherCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "sisterCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "fatherEducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "motherEducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "childNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP CONSTRAINT "PK_8805079183d8c75988687f85c86"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "locationPlaceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "emailAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "familiarMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "locationAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "mobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "telephoneNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "postCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "fatherMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "motherMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP CONSTRAINT "PK_b68bebe7e7aab8fbaf4fde614fb"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "employeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "priorityNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "applicant_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP CONSTRAINT "PK_8112e9d1a0ea5adbb92dc00d236"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "forceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "priorityNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "applicant_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP CONSTRAINT "PK_2c72fac1ec60173bed8e604a83d"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "applicantStatusId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP CONSTRAINT "PK_63b6048166c9a0262963f23cc81"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "documentTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "documentName"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "documentTitle"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "documentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP CONSTRAINT "PK_4a82bef45c37dd8bbf1d24f96a5"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "gradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "levelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "fieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "instituteId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "graduationDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "adjusted"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP CONSTRAINT "PK_e1e42c40ca1d8832395dd7c38ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "companyLocationId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "startDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "endDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "jobTitle"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "companyName"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP CONSTRAINT "PK_4071c9c56af529dced221fecf02"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "languageId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "readingLevelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "writingLevelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "conversationLevelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP CONSTRAINT "PK_988371d7f028a73c3093db18b78"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "propertyId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP CONSTRAINT "PK_5df17afbd1998c6b025028edebb"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "propertyTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "propertyInfo"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP CONSTRAINT "PK_5a0f86871b9dd4dd652fee44a4f"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "skillId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "levelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "person_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP CONSTRAINT "PK_4846bbc19a62409e35ad9837abf"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "educationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "educationFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "adjustedMin"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "course_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP CONSTRAINT "PK_f425517e4b6b688b9d2083ced0c"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "employeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "employeeForceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "startDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "endDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "recruitmentStatusId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP CONSTRAINT "PK_be4ddad5c7064c801ea3f1445ac"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "courseFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "capacity"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "course_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP CONSTRAINT "PK_f2b98fd03b3fe1ecd0b1be4efb2"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "applicantId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "volunteerCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "createdMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "course_field_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP CONSTRAINT "PK_19242f1c04f593bf03fc5a5c3a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "employeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "testTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP CONSTRAINT "PK_5b8760c111c9ac0cdafe39196fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "employeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "employeeFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "testTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP CONSTRAINT "PK_ed013967236c9d6ad515f095ef6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "parent_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "tableName"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "parent_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "PK_d049a01502f66d4ffe7fcdd93ca"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "table_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "itemName"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "itemCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD CONSTRAINT "PK_51c0b9162b1abadae979822c887" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "CertificateTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "Comment" character varying(300)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "GrantDate" date
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "CertificateIssuer" character varying(300)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD CONSTRAINT "PK_a596416b9cbaa5451ef3d6234c6" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "FatherJobId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "FatherJobOrganId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "MotherJobId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "MotherJobOrganId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "WifeJobId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "WifeJobOrganId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "ChildCount" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "IncomeLevelId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "BrotherCount" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "SisterCount" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "FatherEducationGradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "MotherEducationGradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "ChildNumber" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD CONSTRAINT "PK_6dca03016bd5477baa9aa4cded5" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "LocationPlaceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "EmailAddress" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "FamiliarMobileNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "LocationAddress" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "MobileNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "TelephoneNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "PostCode" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "FatherMobileNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "MotherMobileNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD CONSTRAINT "PK_107cb1de63fe416644dfeb99949" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "ApplicantId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "EmployeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "PriorityNumber" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD CONSTRAINT "PK_5d34c9821daef2d902bf3f128aa" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "ApplicantId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "ForceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "PriorityNumber" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD CONSTRAINT "PK_fa8b250632a468716a5dec4d3f9" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "ApplicantStatusId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD CONSTRAINT "PK_fc63eaae6f21bffbc698fa90590" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "DocumentTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "DocumentNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "IssueDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD CONSTRAINT "PK_0c1b909dc9ce3964d0fe9ada1f3" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationGradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationFieldId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationInstitutionId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationCountryId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationProvinceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EducationCityId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "StartDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "EndDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD CONSTRAINT "PK_ba615dc2adea4bca5d7309f4dd0" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "JobTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "JobOrganId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "JobTitle" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "StartDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "EndDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD CONSTRAINT "PK_4c7a68e21465d564c1d735b64ca" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "LanguageId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "ReadingLevel" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "WritingLevel" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "SpeakingLevel" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "ListeningLevel" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD CONSTRAINT "PK_30cd9f18bff467843ea1d099157" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "PropertyTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD CONSTRAINT "PK_79c5c165edac5670423e84a63e9" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "PropertyTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "PropertyTitle" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "PropertyAddress" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "PropertyValue" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD CONSTRAINT "PK_7cfa7be62d4f3f7a8d738af2dc3" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "PersonId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "SkillTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "SkillLevel" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD CONSTRAINT "PK_82831aeaa7caaa9ddc4791fd661" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "CourseId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "EducationGradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "EducationFieldId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "AdjustedMin" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD CONSTRAINT "PK_639880b324b08697d1daa8c54fa" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "EmployeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "EmployeeForceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "Title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "StartDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "EndDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "RecruitmentStatusId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD CONSTRAINT "PK_37b525e0d07277874fdb5713b1d" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "CourseId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "CourseFieldId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "Capacity" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD CONSTRAINT "PK_157fc4f3d52b7c7b4ed2469270c" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "CourseFieldId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "ApplicantId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "VolunteerCode" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD CONSTRAINT "PK_7a23d623472b010381b8ece04bd" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "EmployeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "TestTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD CONSTRAINT "PK_08240b2d5dfb36232fe4ab8beac" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "EmployeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "EmployeeFieldId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "TestTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "IsActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD CONSTRAINT "PK_19f920b8b5b5fdca3748abea8f0" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "ParentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "Title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "CreatedBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "CreatedDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "UpdatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "UpdatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "DeletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "Id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "PK_fd00942b748dc674b758cf15b5a" PRIMARY KEY ("Id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "TableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "ParentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "Title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "CreatedMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ALTER COLUMN "applicantId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ALTER COLUMN "applicantId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ALTER COLUMN "personId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ALTER COLUMN "courseId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ALTER COLUMN "courseId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ALTER COLUMN "courseFieldId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "parentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "parentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "tableId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "parentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "parentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD CONSTRAINT "FK_de5424e421856094612973f2343" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD CONSTRAINT "FK_9c7fdd78082777dce4db0043ed5" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD CONSTRAINT "FK_c7001e91f5833a3119659d91b31" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD CONSTRAINT "FK_747f713f5e45a2435a21a8d6e7d" FOREIGN KEY ("applicantId") REFERENCES "tb_applicant"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD CONSTRAINT "FK_eabbe9ce9c5ed856fcd51aa56d4" FOREIGN KEY ("applicantId") REFERENCES "tb_applicant"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD CONSTRAINT "FK_94548224a30178460578ab10f74" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD CONSTRAINT "FK_a87dd64aec11d6389755a505059" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD CONSTRAINT "FK_c3b8b7076b4ba45552d7e339be5" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD CONSTRAINT "FK_a311c52683699143e111e252099" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD CONSTRAINT "FK_035dc80dceca23991bd6985d4a6" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD CONSTRAINT "FK_bbfd41f59f5dc559ff7032673af" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD CONSTRAINT "FK_e7daaef55216dabf6920cc91cbb" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD CONSTRAINT "FK_ec47e89c18e613469b072321fef" FOREIGN KEY ("personId") REFERENCES "tb_person"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD CONSTRAINT "FK_55dd4f815c4a4cd611fbac262a8" FOREIGN KEY ("courseId") REFERENCES "tb_course"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD CONSTRAINT "FK_d56e681cc294cd689901fc14659" FOREIGN KEY ("courseId") REFERENCES "tb_course"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD CONSTRAINT "FK_f439720f4f705472fa9f0ffee34" FOREIGN KEY ("courseFieldId") REFERENCES "tb_course_field"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD CONSTRAINT "FK_157b893bcf13664b64cdf960478" FOREIGN KEY ("parentId") REFERENCES "tb_base_table"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_9151b287dbe2be46a87e33843c1" FOREIGN KEY ("tableId") REFERENCES "tb_base_table"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_ca3d6b564855a08110df946e5db" FOREIGN KEY ("parentId") REFERENCES "tb_base_item"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_ca3d6b564855a08110df946e5db"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "FK_9151b287dbe2be46a87e33843c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP CONSTRAINT "FK_157b893bcf13664b64cdf960478"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP CONSTRAINT "FK_f439720f4f705472fa9f0ffee34"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP CONSTRAINT "FK_d56e681cc294cd689901fc14659"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP CONSTRAINT "FK_55dd4f815c4a4cd611fbac262a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP CONSTRAINT "FK_ec47e89c18e613469b072321fef"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP CONSTRAINT "FK_e7daaef55216dabf6920cc91cbb"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP CONSTRAINT "FK_bbfd41f59f5dc559ff7032673af"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP CONSTRAINT "FK_035dc80dceca23991bd6985d4a6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP CONSTRAINT "FK_a311c52683699143e111e252099"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP CONSTRAINT "FK_c3b8b7076b4ba45552d7e339be5"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP CONSTRAINT "FK_a87dd64aec11d6389755a505059"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP CONSTRAINT "FK_94548224a30178460578ab10f74"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP CONSTRAINT "FK_eabbe9ce9c5ed856fcd51aa56d4"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP CONSTRAINT "FK_747f713f5e45a2435a21a8d6e7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP CONSTRAINT "FK_c7001e91f5833a3119659d91b31"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP CONSTRAINT "FK_9c7fdd78082777dce4db0043ed5"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP CONSTRAINT "FK_de5424e421856094612973f2343"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "parentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "parentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "tableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "tableId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "parentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "parentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ALTER COLUMN "courseFieldId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ALTER COLUMN "courseId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ALTER COLUMN "courseId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ALTER COLUMN "applicantId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ALTER COLUMN "applicantId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ALTER COLUMN "personId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "Title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "ParentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP CONSTRAINT "PK_fd00942b748dc674b758cf15b5a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "Title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "ParentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP CONSTRAINT "PK_19f920b8b5b5fdca3748abea8f0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "TestTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "EmployeeFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "EmployeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP CONSTRAINT "PK_08240b2d5dfb36232fe4ab8beac"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "TestTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "EmployeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP CONSTRAINT "PK_7a23d623472b010381b8ece04bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "VolunteerCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "ApplicantId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "CourseFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP CONSTRAINT "PK_157fc4f3d52b7c7b4ed2469270c"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "Capacity"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "CourseFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "CourseId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP CONSTRAINT "PK_37b525e0d07277874fdb5713b1d"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "RecruitmentStatusId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "EndDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "StartDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "Title"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "EmployeeForceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "EmployeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP CONSTRAINT "PK_639880b324b08697d1daa8c54fa"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "AdjustedMin"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "EducationFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "EducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "CourseId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP CONSTRAINT "PK_82831aeaa7caaa9ddc4791fd661"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "SkillLevel"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "SkillTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP CONSTRAINT "PK_7cfa7be62d4f3f7a8d738af2dc3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "PropertyValue"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "PropertyAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "PropertyTitle"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "PropertyTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP CONSTRAINT "PK_79c5c165edac5670423e84a63e9"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "PropertyTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP CONSTRAINT "PK_30cd9f18bff467843ea1d099157"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "ListeningLevel"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "SpeakingLevel"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "WritingLevel"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "ReadingLevel"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "LanguageId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP CONSTRAINT "PK_4c7a68e21465d564c1d735b64ca"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "EndDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "StartDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "JobTitle"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "JobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "JobTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP CONSTRAINT "PK_ba615dc2adea4bca5d7309f4dd0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EndDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "StartDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationCityId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationProvinceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationCountryId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationInstitutionId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationFieldId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "EducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP CONSTRAINT "PK_0c1b909dc9ce3964d0fe9ada1f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "IssueDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "DocumentNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "DocumentTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP CONSTRAINT "PK_fc63eaae6f21bffbc698fa90590"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "ApplicantStatusId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP CONSTRAINT "PK_fa8b250632a468716a5dec4d3f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "PriorityNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "ForceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "ApplicantId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP CONSTRAINT "PK_5d34c9821daef2d902bf3f128aa"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "PriorityNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "EmployeeTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "ApplicantId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP CONSTRAINT "PK_107cb1de63fe416644dfeb99949"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "MotherMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "FatherMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "PostCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "TelephoneNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "MobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "LocationAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "FamiliarMobileNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "EmailAddress"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "LocationPlaceId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP CONSTRAINT "PK_6dca03016bd5477baa9aa4cded5"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "IsActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "ChildNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "MotherEducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "FatherEducationGradeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "SisterCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "BrotherCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "IncomeLevelId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "ChildCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "WifeJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "WifeJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "MotherJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "MotherJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "FatherJobOrganId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "FatherJobId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP CONSTRAINT "PK_a596416b9cbaa5451ef3d6234c6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "CertificateIssuer"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "TableId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "CreatedMethodId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "GrantDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "Comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "CertificateTypeId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "PersonId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP CONSTRAINT "PK_51c0b9162b1abadae979822c887"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "Id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "DeletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "UpdatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "UpdatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "CreatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate" DROP COLUMN "CreatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "itemCode" character varying(10)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "itemName" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "table_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "PK_d049a01502f66d4ffe7fcdd93ca" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD "parent_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "tableName" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "parent_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD CONSTRAINT "PK_ed013967236c9d6ad515f095ef6" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "testTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "employeeFieldId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "employeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD CONSTRAINT "PK_5b8760c111c9ac0cdafe39196fa" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_field_test"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "testTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "employeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD CONSTRAINT "PK_19242f1c04f593bf03fc5a5c3a0" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_test"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "course_field_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "volunteerCode" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "applicantId" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD CONSTRAINT "PK_f2b98fd03b3fe1ecd0b1be4efb2" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "course_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "capacity" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "courseFieldId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD CONSTRAINT "PK_be4ddad5c7064c801ea3f1445ac" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "recruitmentStatusId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "endDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "startDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "employeeForceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "employeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD CONSTRAINT "PK_f425517e4b6b688b9d2083ced0c" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "course_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "adjustedMin" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "educationFieldId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "educationGradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD CONSTRAINT "PK_4846bbc19a62409e35ad9837abf" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "levelId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "skillId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD CONSTRAINT "PK_5a0f86871b9dd4dd652fee44a4f" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "propertyInfo" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "propertyTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD CONSTRAINT "PK_5df17afbd1998c6b025028edebb" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "propertyId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD CONSTRAINT "PK_988371d7f028a73c3093db18b78" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "comment" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "conversationLevelId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "writingLevelId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "readingLevelId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "languageId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD CONSTRAINT "PK_4071c9c56af529dced221fecf02" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "companyName" character varying(200) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "jobTitle" character varying(200) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "endDate" date
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "startDate" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "companyLocationId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD CONSTRAINT "PK_e1e42c40ca1d8832395dd7c38ab" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "adjusted" double precision
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "graduationDate" date
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "instituteId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "fieldId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "levelId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "gradeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD CONSTRAINT "PK_4a82bef45c37dd8bbf1d24f96a5" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "documentId" character varying(11)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "documentTitle" character varying(15)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "documentName" character varying(300) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "documentTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD CONSTRAINT "PK_63b6048166c9a0262963f23cc81" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "applicantStatusId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD CONSTRAINT "PK_2c72fac1ec60173bed8e604a83d" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "applicant_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "priorityNumber" smallint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "forceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD CONSTRAINT "PK_8112e9d1a0ea5adbb92dc00d236" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "applicant_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "priorityNumber" smallint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "employeeTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD CONSTRAINT "PK_b68bebe7e7aab8fbaf4fde614fb" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "motherMobileNumber" character varying(15)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "fatherMobileNumber" character varying(15)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "postCode" character varying(10)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "telephoneNumber" character varying(11)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "mobileNumber" character varying(15)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "locationAddress" character varying(300) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "familiarMobileNumber" character varying(15)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "emailAddress" character varying(50)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "locationPlaceId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD CONSTRAINT "PK_8805079183d8c75988687f85c86" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "childNumber" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "motherEducationGradeId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "fatherEducationGradeId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "sisterCount" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "brotherCount" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "incomeLevelId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "childCount" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "wifeJobOrganId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "wifeJobId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "motherJobOrganId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "motherJobId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "fatherJobOrganId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "fatherJobId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD CONSTRAINT "PK_33c41443922af7dc4546fc7e6d6" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "certificateIssuer" character varying(300)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "comment" character varying(300)
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "person_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "tableId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "createdMethodId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "grantDate" date
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "certificateTypeId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "id" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD CONSTRAINT "PK_b44721945062c4742301fd83d5f" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "updatedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "updatedBy" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "createdDate" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD "createdBy" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "tb_person_Id_seq"
            RENAME TO "tb_person_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_person"
                RENAME CONSTRAINT "PK_9cfb3a57c5ad8e65380d9fedb2d" TO "PK_e95b86d54f9eea67ba5ba07369a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_person"
                RENAME COLUMN "Id" TO "id"
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_recruitment_tb_person_national_no" ON "tb_person" ("national_no")
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_ba2ba2625afb98edda75ce8eb9a" FOREIGN KEY ("parent_id") REFERENCES "tb_base_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_item"
            ADD CONSTRAINT "FK_e2d07794dbeeb0fc2a815308e61" FOREIGN KEY ("table_id") REFERENCES "tb_base_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_base_table"
            ADD CONSTRAINT "FK_5db1f08425691d431107bbc303a" FOREIGN KEY ("parent_id") REFERENCES "tb_base_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_personnel_in_course"
            ADD CONSTRAINT "FK_e95d2c76cc068beb8966d912935" FOREIGN KEY ("course_field_id") REFERENCES "tb_course_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_field"
            ADD CONSTRAINT "FK_34fe344a703780ca56e43771aad" FOREIGN KEY ("course_id") REFERENCES "tb_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_course_education_grade"
            ADD CONSTRAINT "FK_b9f1e9382d5b01e04f7c3475196" FOREIGN KEY ("course_id") REFERENCES "tb_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_skill"
            ADD CONSTRAINT "FK_befc14a91ed67d9eff96aed1253" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_property"
            ADD CONSTRAINT "FK_347d23d5e2ab670a82d1d83389e" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_properties"
            ADD CONSTRAINT "FK_2ca831471c46872f972826a45cf" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_language_info"
            ADD CONSTRAINT "FK_0fe1327148abe121a3a8703fc2a" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_experience"
            ADD CONSTRAINT "FK_a40f645aed694e0508f902c3d41" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_education"
            ADD CONSTRAINT "FK_b176263e601729d60ecfcf32312" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_document"
            ADD CONSTRAINT "FK_ce38acedc1ff95d6a5911b664f3" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_applicant"
            ADD CONSTRAINT "FK_2c269780f9bb3f8725bded2de73" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_force_priority"
            ADD CONSTRAINT "FK_617d758b5ff02e511a8b3c9b886" FOREIGN KEY ("applicant_id") REFERENCES "tb_applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_employee_applicant"
            ADD CONSTRAINT "FK_558aaf00ba1984f028ee4e8cb3a" FOREIGN KEY ("applicant_id") REFERENCES "tb_applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_contact_info"
            ADD CONSTRAINT "FK_3348840c8988c3d402ccc62eea0" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_additional_information"
            ADD CONSTRAINT "FK_638d522f3e106971b2042def744" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tb_certificate"
            ADD CONSTRAINT "FK_be064d2024e2454848b2d10a9e1" FOREIGN KEY ("person_id") REFERENCES "tb_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
