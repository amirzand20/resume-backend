import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';
import { ReadEmployeeApplicantDto } from './dto/read-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';

@Injectable()
export class EmployeeApplicantProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, EmployeeApplicant, ReadEmployeeApplicantDto);
      createMap(mapper, ReadEmployeeApplicantDto, EmployeeApplicant);
      createMap(mapper, CreateEmployeeApplicantDto, EmployeeApplicant);
      createMap(mapper, UpdateEmployeeApplicantDto, EmployeeApplicant);
    };
  }
} 