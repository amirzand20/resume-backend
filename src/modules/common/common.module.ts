import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';
import { EducationController } from './controllers/education.controller';
import { EducationService } from './services/education.service';
import { ExperienceController } from './controllers/experience.controller';
import { ExperienceService } from './services/experience.service';
import { SkillController } from './controllers/skill.controller';
import { SkillService } from './services/skill.service';
import { CertificateController } from './controllers/certificate.controller';
import { CertificateService } from './services/certificate.service';
import { LanguageInfoController } from './controllers/language-info.controller';
import { LanguageInfoService } from './services/language-info.service';
import { ContactInfoController } from './controllers/contact-info.controller';
import { ContactInfoService } from './services/contact-info.service';
import { AdditionalInformationController } from './controllers/additional-information.controller';
import { AdditionalInformationService } from './services/additional-information.service';
import { DocumentController } from './controllers/document.controller';
import { DocumentService } from './services/document.service';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
import { Person } from '../../entity/Person.entity';
import { Education } from '../../entity/education.entity';
import { Experience } from '../../entity/experience.entity';
import { Skill } from '../../entity/skill.entity';
import { Certificate } from '../../entity/certificate.entity';
import { LanguageInfo } from '../../entity/language-info.entity';
import { AdditionalInformation } from '../../entity/additional-information.entity';
import { ContactInfo } from '../../entity/contact-info.entity';
import { Document } from '../../entity/document.entity';
import { Course } from '../../entity/course.entity';
import { CourseEducationGrade } from '../../entity/course-education-grade.entity';
import { CourseField } from '../../entity/course-field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Education,
      Experience,
      Skill,
      Certificate,
      LanguageInfo,
      AdditionalInformation,
      ContactInfo,
      Document,
      Course,
      CourseEducationGrade,
      CourseField,
    ]),
  ],
  controllers: [
    PersonController, 
    EducationController,
    ExperienceController,
    SkillController,
    CertificateController,
    LanguageInfoController,
    ContactInfoController,
    AdditionalInformationController,
    DocumentController,
    CourseController,
  ],
  providers: [
    PersonService, 
    EducationService,
    ExperienceService,
    SkillService,
    CertificateService,
    LanguageInfoService,
    ContactInfoService,
    AdditionalInformationService,
    DocumentService,
    CourseService,
  ],
  exports: [
    PersonService, 
    EducationService,
    ExperienceService,
    SkillService,
    CertificateService,
    LanguageInfoService,
    ContactInfoService,
    AdditionalInformationService,
    DocumentService,
    CourseService,
  ],
})
export class CommonModule {} 