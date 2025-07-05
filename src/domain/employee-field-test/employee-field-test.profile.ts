import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeFieldTestDto } from './dto/create-employee-field-test.dto';
import { EmployeeFieldTest } from '@/entities/employee-field-test.entity';
import { ReadEmployeeFieldTestDto } from './dto/read-employee-field-test.dto';
import { UpdateEmployeeFieldTestDto } from './dto/update-employee-field-test.dto';

@Injectable()
export class EmployeeFieldTestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, EmployeeFieldTest, ReadEmployeeFieldTestDto);
      createMap(mapper, ReadEmployeeFieldTestDto, EmployeeFieldTest);
      createMap(mapper, CreateEmployeeFieldTestDto, EmployeeFieldTest);
      createMap(mapper, UpdateEmployeeFieldTestDto, EmployeeFieldTest);
    };
  }
} 