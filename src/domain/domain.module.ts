import { Module } from '@nestjs/common';
import { CertificateModule } from './certificate/certificate.module';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { CourseModule } from './course/course.module';
import { CourseEducationGradeModule } from './course-education-grade/course-education-grade.module';
import { CourseFieldModule } from './course-field/course-field.module';
import { EducationModule } from './education/education.module';
import { EmployeeApplicantModule } from './employee-applicant/employee-applicant.module';
import { EmployeeFieldTestModule } from './employee-field-test/employee-field-test.module';
import { EmployeeTestModule } from './employee-test/employee-test.module';
import { ExperienceModule } from './experience/experience.module';
import { ForcePriorityModule } from './force-priority/force-priority.module';
import { LanguageInfoModule } from './language-info/language-info.module';
import { PersonnelInCourseModule } from './personnel-in-course/personnel-in-course.module';
import { SkillModule } from './skill/skill.module';
import { PropertiesModule } from './properties/properties.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    CertificateModule,
    ContactInfoModule,
    CourseModule,
    CourseEducationGradeModule,
    CourseFieldModule,
    EducationModule,
    EmployeeApplicantModule,
    EmployeeFieldTestModule,
    EmployeeTestModule,
    ExperienceModule,
    ForcePriorityModule,
    LanguageInfoModule,
    PersonnelInCourseModule,
    SkillModule,
    PropertiesModule,
    PropertyModule,
  ],
  providers: [],
  exports: [
    CertificateModule,
    ContactInfoModule,
    CourseModule,
    CourseEducationGradeModule,
    CourseFieldModule,
    EducationModule,
    EmployeeApplicantModule,
    EmployeeFieldTestModule,
    EmployeeTestModule,
    ExperienceModule,
    ForcePriorityModule,
    LanguageInfoModule,
    PersonnelInCourseModule,
    SkillModule,
    PropertiesModule,
    PropertyModule,
  ],
})
export class DomainModule {}
