import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeTest } from '@/entities/employee-test.entity';
import { CreateEmployeeTestDto } from './dto/create-employee-test.dto';
import { UpdateEmployeeTestDto } from './dto/update-employee-test.dto';
import { ReadEmployeeTestDto } from './dto/read-employee-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeTestRepository extends Repository<EmployeeTest> {
  constructor(
    @InjectRepository(EmployeeTest)
    private readonly repository: Repository<EmployeeTest>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async deleteById(id: number): Promise<EmployeeTest> {
    const employeeTest = await this.repository.findOne({ where: { id } });
    if (employeeTest) {
      await this.repository.delete(id);
    }
    return employeeTest;
  }

  async getById(id: number): Promise<EmployeeTest> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[EmployeeTest[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('employeeTest');

    // Apply filters
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('employeeTest.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.testTypeId) {
      queryBuilder.andWhere('employeeTest.testTypeId = :testTypeId', { testTypeId: filter.testTypeId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('employeeTest.isActive = :isActive', { isActive: filter.isActive });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`employeeTest.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('employeeTest.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 