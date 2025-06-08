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
import { LanguageInfo } from '../../entity/language-info.entity';
import { AdditionalInformation } from '../../entity/additional-information.entity';

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
    ]),
  ],
  controllers: [ResumeController],
  providers: [
    {
      provide: 'IResumeRepository',
      useClass: ResumeRepository,
    },
    {
      provide: ResumeService,
      useFactory: (resumeRepository) => {
        return new ResumeService(resumeRepository);
      },
      inject: ['IResumeRepository'],
    },
  ],
  exports: [ResumeService],
})
export class ResumeModule {} 