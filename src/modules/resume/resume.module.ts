import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeController } from './presentation/resume.controller';
import { ResumeService } from './application/resume.service';
import { ResumeRepository } from './infrastructure/resume.repository';
import { Person } from '../../entity/Person.entity';
import { Education } from '../../entity/education.entity';
import { Experience } from '../../entity/experience.entity';
import { Skill } from '../../entity/skill.entity';
import { Certificate } from '../../entity/certificate.entity';
import { AdditionalInformation } from '../../entity/additional-information.entity';
import { LanguageInfo } from '../../entity/language-info.entity';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { Resume } from './domain/entities/resume.entity';
import { PersonalInfo } from './domain/entities/step1-personal-info.entity';
import { Step1Controller } from './presentation/controllers/step1.controller';
import { Step1Service } from './application/services/step1.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Education,
      Experience,
      Skill,
      Certificate,
      AdditionalInformation,
      LanguageInfo,
      UserEntity,
      Resume,
      PersonalInfo,
    ]),
  ],
  controllers: [ResumeController, Step1Controller],
  providers: [
    ResumeRepository,
    {
      provide: 'IResumeRepository',
      useClass: ResumeRepository,
    },
    {
      provide: ResumeService,
      useFactory: (resumeRepository, personRepository, educationRepository, experienceRepository, skillRepository, certificateRepository, additionalInformationRepository) => {
        return new ResumeService(resumeRepository, personRepository, educationRepository, experienceRepository, skillRepository, certificateRepository, additionalInformationRepository);
      },
      inject: ['IResumeRepository', 'PersonRepository', 'EducationRepository', 'ExperienceRepository', 'SkillRepository', 'CertificateRepository', 'AdditionalInformationRepository'],
    },
    Step1Service,
  ],
  exports: [Step1Service],
})
export class ResumeModule {} 