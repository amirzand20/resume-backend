import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EmployeeApplicantRepository } from './employee-applicant.repository';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';
import { ReadEmployeeApplicantDto } from './dto/read-employee-applicant.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';

@Injectable()
export class EmployeeApplicantService {
  constructor(
    private readonly repository: EmployeeApplicantRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateEmployeeApplicantDto): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.mapper.mapAsync(
      data,
      CreateEmployeeApplicantDto,
      EmployeeApplicant,
    );
    const saveResult = await this.repository.save(employeeApplicant);
    return this.mapper.map(saveResult, EmployeeApplicant, ReadEmployeeApplicantDto);
  }

  async update(id: number, data: UpdateEmployeeApplicantDto): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.findOne({ where: { id } });
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    
    const updatedEmployeeApplicant = await this.mapper.mapAsync(
      data,
      UpdateEmployeeApplicantDto,
      EmployeeApplicant,
    );
    Object.assign(employeeApplicant, updatedEmployeeApplicant);
    
    const saveResult = await this.repository.save(employeeApplicant);
    return this.mapper.map(saveResult, EmployeeApplicant, ReadEmployeeApplicantDto);
  }

  async deleteById(id: number): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.findOne({ where: { id } });
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    await this.repository.remove(employeeApplicant);
    return this.mapper.map(employeeApplicant, EmployeeApplicant, ReadEmployeeApplicantDto);
  }

  async getById(id: number): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.findOne({ where: { id } });
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    return this.mapper.map(employeeApplicant, EmployeeApplicant, ReadEmployeeApplicantDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeApplicantDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, EmployeeApplicant, ReadEmployeeApplicantDto),
    };
  }
} 