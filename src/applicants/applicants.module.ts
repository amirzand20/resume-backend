import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsController } from './applicants.controller';
import { Applicant } from '../entity/applicant.entity';
import { Person } from '../entity/Person.entity';
import { EmployeeApplicant } from '../entity/employee-applicant.entity';
import { ForcePriority } from '../entity/force-priority.entity';
import { ApplicantsService } from './applicants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant, Person, EmployeeApplicant, ForcePriority])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {} 