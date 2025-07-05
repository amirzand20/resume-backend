import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeApplicantRepository } from './employee-applicant.repository';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';
import { ReadEmployeeApplicantDto } from './dto/read-employee-applicant.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeApplicantService {
  constructor(private readonly repository: EmployeeApplicantRepository) {}

  async create(data: CreateEmployeeApplicantDto): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.create(data);
    return this.mapToReadDto(employeeApplicant);
  }

  async update(id: number, data: UpdateEmployeeApplicantDto): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.update(id, data);
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeApplicant);
  }

  async deleteById(id: number): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.deleteById(id);
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeApplicant);
  }

  async getById(id: number): Promise<ReadEmployeeApplicantDto> {
    const employeeApplicant = await this.repository.getById(id);
    if (!employeeApplicant) {
      throw new NotFoundException(`EmployeeApplicant with ID ${id} not found`);
    }
    return this.mapToReadDto(employeeApplicant);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeApplicantDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(employeeApplicant: any): ReadEmployeeApplicantDto {
    return {
      id: employeeApplicant.id,
      applicantId: employeeApplicant.applicantId,
      employeeTypeId: employeeApplicant.employeeTypeId,
      priorityNumber: employeeApplicant.priorityNumber,
      createdMethodId: employeeApplicant.createdMethodId,
      tableId: employeeApplicant.tableId,
      createdDate: employeeApplicant.createdDate,
      modifiedDate: employeeApplicant.updatedDate,
      createdBy: parseInt(employeeApplicant.createdBy),
      modifiedBy: employeeApplicant.updatedBy ? parseInt(employeeApplicant.updatedBy) : 0,
    };
  }
} 