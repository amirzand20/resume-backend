import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeTestRepository } from './employee-test.repository';
import { CreateEmployeeTestDto } from './dto/create-employee-test.dto';
import { UpdateEmployeeTestDto } from './dto/update-employee-test.dto';
import { ReadEmployeeTestDto } from './dto/read-employee-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeTestService {
  constructor(private readonly repository: EmployeeTestRepository) {}

  async create(data: CreateEmployeeTestDto): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.create(data);
    return this.mapToReadDto(employeeTest);
  }

  async update(id: number, data: UpdateEmployeeTestDto): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.update(id, data);
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeTest);
  }

  async deleteById(id: number): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.deleteById(id);
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeTest);
  }

  async getById(id: number): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.getById(id);
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeTest);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeTestDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(employeeTest: any): ReadEmployeeTestDto {
    return {
      id: employeeTest.id,
      employeeTypeId: employeeTest.employeeTypeId,
      testTypeId: employeeTest.testTypeId,
      isActive: employeeTest.isActive,
      createdDate: employeeTest.createdDate,
      modifiedDate: employeeTest.updatedDate,
      createdBy: parseInt(employeeTest.createdBy),
      modifiedBy: employeeTest.updatedBy ? parseInt(employeeTest.updatedBy) : 0,
    };
  }
} 