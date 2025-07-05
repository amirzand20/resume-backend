import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EmployeeTestRepository } from './employee-test.repository';
import { CreateEmployeeTestDto } from './dto/create-employee-test.dto';
import { UpdateEmployeeTestDto } from './dto/update-employee-test.dto';
import { ReadEmployeeTestDto } from './dto/read-employee-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { EmployeeTest } from '@/entities/employee-test.entity';

@Injectable()
export class EmployeeTestService {
  constructor(
    private readonly repository: EmployeeTestRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateEmployeeTestDto): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.mapper.mapAsync(
      data,
      CreateEmployeeTestDto,
      EmployeeTest,
    );
    const saveResult = await this.repository.save(employeeTest);
    return this.mapper.map(saveResult, EmployeeTest, ReadEmployeeTestDto);
  }

  async update(id: number, data: UpdateEmployeeTestDto): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.findOne({ where: { id } });
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    
    const updatedEmployeeTest = await this.mapper.mapAsync(
      data,
      UpdateEmployeeTestDto,
      EmployeeTest,
    );
    Object.assign(employeeTest, updatedEmployeeTest);
    
    const saveResult = await this.repository.save(employeeTest);
    return this.mapper.map(saveResult, EmployeeTest, ReadEmployeeTestDto);
  }

  async deleteById(id: number): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.findOne({ where: { id } });
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    await this.repository.remove(employeeTest);
    return this.mapper.map(employeeTest, EmployeeTest, ReadEmployeeTestDto);
  }

  async getById(id: number): Promise<ReadEmployeeTestDto> {
    const employeeTest = await this.repository.findOne({ where: { id } });
    if (!employeeTest) {
      throw new NotFoundException(`EmployeeTest with ID ${id} not found`);
    }
    return this.mapper.map(employeeTest, EmployeeTest, ReadEmployeeTestDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeTestDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, EmployeeTest, ReadEmployeeTestDto),
    };
  }
} 