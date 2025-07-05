import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';
import { EmployeeApplicantRepository } from './employee-applicant.repository';
import { EmployeeApplicantService } from './employee-applicant.service';
import { EmployeeApplicantController } from './employee-applicant.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeApplicant]),
  ],
  controllers: [EmployeeApplicantController],
  providers: [
    EmployeeApplicantRepository,
    EmployeeApplicantService,
  ],
  exports: [EmployeeApplicantRepository, EmployeeApplicantService],
})
export class EmployeeApplicantModule {} 