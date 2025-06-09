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
    ]),
  ],
  controllers: [ResumeController],
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
  ],
})
export class ResumeModule {} 