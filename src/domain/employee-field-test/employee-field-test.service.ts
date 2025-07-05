import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeFieldTestRepository } from './employee-field-test.repository';
import { CreateEmployeeFieldTestDto } from './dto/create-employee-field-test.dto';
import { UpdateEmployeeFieldTestDto } from './dto/update-employee-field-test.dto';
import { ReadEmployeeFieldTestDto } from './dto/read-employee-field-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeFieldTestService {
  constructor(private readonly repository: EmployeeFieldTestRepository) {}

  async create(data: CreateEmployeeFieldTestDto): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.create(data);
    return this.mapToReadDto(employeeFieldTest);
  }

  async update(id: number, data: UpdateEmployeeFieldTestDto): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.update(id, data);
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeFieldTest);
  }

  async deleteById(id: number): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.deleteById(id);
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeFieldTest);
  }

  async getById(id: number): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.getById(id);
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeFieldTest);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeFieldTestDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(employeeFieldTest: any): ReadEmployeeFieldTestDto {
    return {
      id: employeeFieldTest.id,
      employeeTypeId: employeeFieldTest.employeeTypeId,
      employeeFieldId: employeeFieldTest.employeeFieldId,
      testTypeId: employeeFieldTest.testTypeId,
      isActive: employeeFieldTest.isActive,
      createdDate: employeeFieldTest.createdDate,
      modifiedDate: employeeFieldTest.updatedDate,
      createdBy: parseInt(employeeFieldTest.createdBy),
      modifiedBy: employeeFieldTest.updatedBy ? parseInt(employeeFieldTest.updatedBy) : 0,
    };
  }
} 