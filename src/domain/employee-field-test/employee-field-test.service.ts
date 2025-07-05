import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EmployeeFieldTestRepository } from './employee-field-test.repository';
import { CreateEmployeeFieldTestDto } from './dto/create-employee-field-test.dto';
import { UpdateEmployeeFieldTestDto } from './dto/update-employee-field-test.dto';
import { ReadEmployeeFieldTestDto } from './dto/read-employee-field-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { EmployeeFieldTest } from '@/entities/employee-field-test.entity';

@Injectable()
export class EmployeeFieldTestService {
  constructor(
    private readonly repository: EmployeeFieldTestRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateEmployeeFieldTestDto): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.mapper.mapAsync(
      data,
      CreateEmployeeFieldTestDto,
      EmployeeFieldTest,
    );
    const saveResult = await this.repository.save(employeeFieldTest);
    return this.mapper.map(saveResult, EmployeeFieldTest, ReadEmployeeFieldTestDto);
  }

  async update(id: number, data: UpdateEmployeeFieldTestDto): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.findOne({ where: { id } });
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    
    const updatedEmployeeFieldTest = await this.mapper.mapAsync(
      data,
      UpdateEmployeeFieldTestDto,
      EmployeeFieldTest,
    );
    Object.assign(employeeFieldTest, updatedEmployeeFieldTest);
    
    const saveResult = await this.repository.save(employeeFieldTest);
    return this.mapper.map(saveResult, EmployeeFieldTest, ReadEmployeeFieldTestDto);
  }

  async deleteById(id: number): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.findOne({ where: { id } });
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    await this.repository.remove(employeeFieldTest);
    return this.mapper.map(employeeFieldTest, EmployeeFieldTest, ReadEmployeeFieldTestDto);
  }

  async getById(id: number): Promise<ReadEmployeeFieldTestDto> {
    const employeeFieldTest = await this.repository.findOne({ where: { id } });
    if (!employeeFieldTest) {
      throw new NotFoundException(`EmployeeFieldTest with ID ${id} not found`);
    }
    return this.mapper.map(employeeFieldTest, EmployeeFieldTest, ReadEmployeeFieldTestDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeFieldTestDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, EmployeeFieldTest, ReadEmployeeFieldTestDto),
    };
  }
} 