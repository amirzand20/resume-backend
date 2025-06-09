import { DataSource } from 'typeorm';
import { BaseTable } from '../../entity/base-table.entity';
import { BaseItem } from '../../entity/base-item.entity';
import { User } from '../../entity/user.entity';
import { Person } from '../../entity/Person.entity';
import { ContactInfo } from '../../entity/contact-info.entity';
import { AdditionalInformation } from '../../entity/additional-information.entity';
import { Document } from '../../entity/document.entity';
import { Education } from '../../entity/education.entity';
import { Experience } from '../../entity/experience.entity';
import { LanguageInfo } from '../../entity/language-info.entity';
import { Properties } from '../../entity/properties.entity';
import { Property } from '../../entity/property.entity';
import { Skill } from '../../entity/skill.entity';
import { Certificate } from '../../entity/certificate.entity';
import { Applicant } from '../../entity/applicant.entity';
import { EmployeeApplicant } from '../../entity/employee-applicant.entity';
import { ForcePriority } from '../../entity/force-priority.entity';
import { Course } from '../../entity/course.entity';
import { CourseEducationGrade } from '../../entity/course-education-grade.entity';
import { CourseField } from '../../entity/course-field.entity';
import { PersonnelInCourse } from '../../entity/personnel-in-course.entity';
import { EmployeeTest } from '../../entity/employee-test.entity';
import { EmployeeFieldTest } from '../../entity/employee-field-test.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export class AllSeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    // 1. Seed Base Tables
    await this.seedBaseTables();
    
    // 2. Seed Users
    await this.seedUsers();
    
    // 3. Seed Persons and related entities
    await this.seedPersons();
    
    // 4. Seed Applicants and related entities
    await this.seedApplicants();
    
    // 5. Seed Courses and related entities
    await this.seedCourses();
    
    // 6. Seed Employee Tests
    await this.seedEmployeeTests();
  }

  private async seedBaseTables() {
    const baseTableRepo = this.dataSource.getRepository(BaseTable);
    const baseItemRepo = this.dataSource.getRepository(BaseItem);

    // Create base tables
    const tables = [
      { tableName: 'education_grades' },
      { tableName: 'education_fields' },
      { tableName: 'languages' },
      { tableName: 'skills' },
      { tableName: 'certificate_types' },
      { tableName: 'document_types' },
      { tableName: 'employee_types' },
      { tableName: 'employee_forces' },
      { tableName: 'test_types' },
      { tableName: 'recruitment_statuses' },
      { tableName: 'applicant_statuses' },
      { tableName: 'job_types' },
      { tableName: 'organizations' },
      { tableName: 'income_levels' },
      { tableName: 'locations' },
      { tableName: 'sex_types' },
    ];

    const savedTables = await baseTableRepo.save(tables);

    // Create base items for each table
    for (const table of savedTables) {
      const items = Array.from({ length: 5 }, (_, i) => ({
        tableId: table.id,
        itemName: `${table.tableName}_item_${i + 1}`,
        itemCode: `CODE${i + 1}`,
        isActive: true,
      }));
      await baseItemRepo.save(items);
    }
  }

  private async seedUsers() {
    const userRepo = this.dataSource.getRepository(User);
    
    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        isActive: true,
      },
      {
        username: 'user',
        email: 'user@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user',
        isActive: true,
      },
    ];

    await userRepo.save(users);
  }

  private async seedPersons() {
    const personRepo = this.dataSource.getRepository(Person);
    const contactInfoRepo = this.dataSource.getRepository(ContactInfo);
    const additionalInfoRepo = this.dataSource.getRepository(AdditionalInformation);
    const documentRepo = this.dataSource.getRepository(Document);
    const educationRepo = this.dataSource.getRepository(Education);
    const experienceRepo = this.dataSource.getRepository(Experience);
    const languageInfoRepo = this.dataSource.getRepository(LanguageInfo);
    const propertiesRepo = this.dataSource.getRepository(Properties);
    const propertyRepo = this.dataSource.getRepository(Property);
    const skillRepo = this.dataSource.getRepository(Skill);
    const certificateRepo = this.dataSource.getRepository(Certificate);

    // Create sample persons
    const persons = Array.from({ length: 5 }, (_, i) => ({
      national_no: `123456789${i}`,
      first_name: `First${i}`,
      last_name: `Last${i}`,
      birth_date: new Date(1990, 0, 1),
      birth_place_id: 1,
      location_place_id: 1,
      sex_id: 1,
      aboaut_me: `About me ${i}`,
      mobile_number: `0912345678${i}`,
      telephone_number: `0211234567${i}`,
      email_address: `person${i}@example.com`,
      address: `Address ${i}`,
      post_code: `123456789${i}`,
      profile_image: `profile${i}.jpg`,
      created_date: new Date(),
    }));

    const savedPersons = await personRepo.save(persons);

    // Create related entities for each person
    for (const person of savedPersons) {
      // Contact Info
      await contactInfoRepo.save({
        personId: person.id,
        locationPlaceId: 1,
        locationAddress: `Address ${person.id}`,
        mobileNumber: person.mobile_number,
        telephoneNumber: person.telephone_number,
        postCode: person.post_code,
        emailAddress: person.email_address,
        createdMethodId: 1,
        tableId: uuidv4(),
        isActive: true,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Additional Information
      await additionalInfoRepo.save({
        personId: person.id,
        fatherJobId: 1,
        fatherJobOrganId: 1,
        motherJobId: 1,
        motherJobOrganId: 1,
        childCount: 2,
        incomeLevelId: 1,
        brotherCount: 1,
        sisterCount: 1,
        fatherEducationGradeId: 1,
        motherEducationGradeId: 1,
        childNumber: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        isActive: true,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Documents
      await documentRepo.save({
        personId: person.id,
        documentTypeId: 1,
        documentName: `Document ${person.id}`,
        documentTitle: `Title ${person.id}`,
        documentId: `DOC${person.id}`,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Education
      await educationRepo.save({
        personId: person.id,
        gradeId: 1,
        levelId: 1,
        fieldId: 1,
        instituteId: 1,
        graduationDate: new Date(),
        adjusted: 1.0,
        createdMethodId: 1,
        tableId: uuidv4(),
        isActive: true,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Experience
      await experienceRepo.save({
        personId: person.id,
        jobTitle: `Job Title ${person.id}`,
        companyName: `Company ${person.id}`,
        companyLocationId: 1,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2023, 0, 1),
        tableId: uuidv4(),
        createdMethodId: 1,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Language Info
      await languageInfoRepo.save({
        personId: person.id,
        languageId: 1,
        readingLevelId: 1,
        writingLevelId: 1,
        conversationLevelId: 1,
        comment: 1,
        tableId: uuidv4(),
        createdMethodId: 1,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Properties
      await propertiesRepo.save({
        personId: person.id,
        propertyId: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Property
      await propertyRepo.save({
        personId: person.id,
        propertyTypeId: 1,
        propertyInfo: { key: 'value' },
        createdMethodId: 1,
        tableId: uuidv4(),
        isActive: true,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Skills
      await skillRepo.save({
        personId: person.id,
        skillId: 1,
        levelId: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Certificates
      await certificateRepo.save({
        personId: person.id,
        certificateTypeId: 1,
        comment: `Certificate ${person.id}`,
        grantDate: new Date(),
        createdMethodId: 1,
        tableId: uuidv4(),
        certificateIssuer: `Issuer ${person.id}`,
        createdBy: uuidv4(),
        createdDate: new Date(),
      });
    }
  }

  private async seedApplicants() {
    const applicantRepo = this.dataSource.getRepository(Applicant);
    const employeeApplicantRepo = this.dataSource.getRepository(EmployeeApplicant);
    const forcePriorityRepo = this.dataSource.getRepository(ForcePriority);

    // Get all persons
    const persons = await this.dataSource.getRepository(Person).find();

    // Create applicants for each person
    for (const person of persons) {
      const applicant = await applicantRepo.save({
        personId: person.id,
        applicantStatusId: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Create employee applicants
      await employeeApplicantRepo.save({
        applicantId: applicant.id,
        employeeTypeId: 1,
        priorityNumber: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Create force priorities
      await forcePriorityRepo.save({
        applicantId: applicant.id,
        forceId: 1,
        priorityNumber: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });
    }
  }

  private async seedCourses() {
    const courseRepo = this.dataSource.getRepository(Course);
    const courseEducationGradeRepo = this.dataSource.getRepository(CourseEducationGrade);
    const courseFieldRepo = this.dataSource.getRepository(CourseField);
    const personnelInCourseRepo = this.dataSource.getRepository(PersonnelInCourse);

    // Create courses
    const courses = Array.from({ length: 3 }, (_, i) => ({
      employeeTypeId: 1,
      employeeForceId: 1,
      title: `Course ${i + 1}`,
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 11, 31),
      recruitmentStatusId: 1,
      createdMethodId: 1,
      tableId: uuidv4(),
      createdBy: uuidv4(),
      createdDate: new Date(),
    }));

    const savedCourses = await courseRepo.save(courses);

    // Create course education grades and fields
    for (const course of savedCourses) {
      // Education grades
      await courseEducationGradeRepo.save({
        courseId: course.id,
        educationGradeId: 1,
        educationFieldId: 1,
        adjustedMin: 1,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Course fields
      const courseField = await courseFieldRepo.save({
        courseId: course.id,
        courseFieldId: 1,
        capacity: 30,
        createdMethodId: 1,
        tableId: uuidv4(),
        createdBy: uuidv4(),
        createdDate: new Date(),
      });

      // Get some applicants
      const applicants = await this.dataSource.getRepository(Applicant).find({ take: 5 });

      // Add personnel to course
      for (const applicant of applicants) {
        await personnelInCourseRepo.save({
          courseFieldId: courseField.id,
          applicantId: applicant.id,
          volunteerCode: 1,
          createdMethodId: 1,
          tableId: uuidv4(),
          createdBy: uuidv4(),
          createdDate: new Date(),
        });
      }
    }
  }

  private async seedEmployeeTests() {
    const employeeTestRepo = this.dataSource.getRepository(EmployeeTest);
    const employeeFieldTestRepo = this.dataSource.getRepository(EmployeeFieldTest);

    // Create employee tests
    const employeeTests = Array.from({ length: 3 }, (_, i) => ({
      employeeTypeId: 1,
      testTypeId: 1,
      isActive: true,
      createdBy: uuidv4(),
      createdDate: new Date(),
    }));

    await employeeTestRepo.save(employeeTests);

    // Create employee field tests
    const employeeFieldTests = Array.from({ length: 3 }, (_, i) => ({
      employeeTypeId: 1,
      employeeFieldId: 1,
      testTypeId: 1,
      isActive: true,
      createdBy: uuidv4(),
      createdDate: new Date(),
    }));

    await employeeFieldTestRepo.save(employeeFieldTests);
  }
} 