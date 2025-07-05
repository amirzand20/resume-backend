import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step7ApplicantController } from './step7-applicant.controller';
import { Step7ApplicantService } from './step7-applicant.service';
import { Step7ApplicantRepository } from './step7-applicant.repository';
import { Applicant } from '../../entities/applicant.entity';
import { Person } from '../../entities/Person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicant, Person]),
  ],
  controllers: [Step7ApplicantController],
  providers: [Step7ApplicantService, Step7ApplicantRepository],
  exports: [Step7ApplicantService, Step7ApplicantRepository],
})
export class Step7Module {} 