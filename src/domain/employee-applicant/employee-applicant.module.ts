import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';
import { EmployeeApplicantRepository } from './employee-applicant.repository';
import { EmployeeApplicantService } from './employee-applicant.service';
import { EmployeeApplicantController } from './employee-applicant.controller';
import { EmployeeApplicantProfile } from './employee-applicant.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeApplicant]),
  ],
  controllers: [EmployeeApplicantController],
  providers: [
    EmployeeApplicantRepository,
    EmployeeApplicantService,
    EmployeeApplicantProfile,
  ],
  exports: [EmployeeApplicantRepository, EmployeeApplicantService],
})
export class EmployeeApplicantModule {} 