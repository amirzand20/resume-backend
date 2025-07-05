import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';
import { ReadEmployeeApplicantDto } from './dto/read-employee-applicant.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeApplicantRepository {
  constructor(
    @InjectRepository(EmployeeApplicant)
    private readonly repository: Repository<EmployeeApplicant>,
  ) {}

  async create(data: CreateEmployeeApplicantDto): Promise<EmployeeApplicant> {
    const employeeApplicant = this.repository.create(data);
    return await this.repository.save(employeeApplicant);
  }

  async update(id: number, data: UpdateEmployeeApplicantDto): Promise<EmployeeApplicant> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<EmployeeApplicant> {
    const employeeApplicant = await this.repository.findOne({ where: { id } });
    if (employeeApplicant) {
      await this.repository.delete(id);
    }
    return employeeApplicant;
  }

  async getById(id: number): Promise<EmployeeApplicant> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeApplicantDto>> {
    const queryBuilder = this.repository.createQueryBuilder('employeeApplicant');

    // Apply filters
    if (filter.applicantId) {
      queryBuilder.andWhere('employeeApplicant.applicantId = :applicantId', { applicantId: filter.applicantId });
    }
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('employeeApplicant.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('employeeApplicant.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`employeeApplicant.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('employeeApplicant.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(employeeApplicant: EmployeeApplicant): ReadEmployeeApplicantDto {
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