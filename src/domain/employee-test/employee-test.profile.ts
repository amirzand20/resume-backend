import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeTestDto } from './dto/create-employee-test.dto';
import { EmployeeTest } from '@/entities/employee-test.entity';
import { ReadEmployeeTestDto } from './dto/read-employee-test.dto';
import { UpdateEmployeeTestDto } from './dto/update-employee-test.dto';

@Injectable()
export class EmployeeTestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, EmployeeTest, ReadEmployeeTestDto);
      createMap(mapper, ReadEmployeeTestDto, EmployeeTest);
      createMap(mapper, CreateEmployeeTestDto, EmployeeTest);
      createMap(mapper, UpdateEmployeeTestDto, EmployeeTest);
    };
  }
} 