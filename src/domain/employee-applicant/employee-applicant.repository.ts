import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeApplicant } from '@/entities/employee-applicant.entity';
import { CreateEmployeeApplicantDto } from './dto/create-employee-applicant.dto';
import { UpdateEmployeeApplicantDto } from './dto/update-employee-applicant.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeApplicantRepository extends Repository<EmployeeApplicant> {
  constructor(
    @InjectRepository(EmployeeApplicant)
    private readonly repository: Repository<EmployeeApplicant>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
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
  ): Promise<[EmployeeApplicant[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('employeeApplicant');

    // Apply filters
    if (filter.applicantId) {
      queryBuilder.andWhere('employeeApplicant.applicantId = :applicantId', { applicantId: filter.applicantId });
    }
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('employeeApplicant.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.priorityNumber) {
      queryBuilder.andWhere('employeeApplicant.priorityNumber = :priorityNumber', { priorityNumber: filter.priorityNumber });
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

    return await queryBuilder.getManyAndCount();
  }
} 