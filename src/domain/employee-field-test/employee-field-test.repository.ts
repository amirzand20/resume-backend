import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeFieldTest } from '@/entities/employee-field-test.entity';
import { CreateEmployeeFieldTestDto } from './dto/create-employee-field-test.dto';
import { UpdateEmployeeFieldTestDto } from './dto/update-employee-field-test.dto';
import { ReadEmployeeFieldTestDto } from './dto/read-employee-field-test.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EmployeeFieldTestRepository {
  constructor(
    @InjectRepository(EmployeeFieldTest)
    private readonly repository: Repository<EmployeeFieldTest>,
  ) {}

  async create(data: CreateEmployeeFieldTestDto): Promise<EmployeeFieldTest> {
    const employeeFieldTest = this.repository.create(data);
    return await this.repository.save(employeeFieldTest);
  }

  async update(id: number, data: UpdateEmployeeFieldTestDto): Promise<EmployeeFieldTest> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<EmployeeFieldTest> {
    const employeeFieldTest = await this.repository.findOne({ where: { id } });
    if (employeeFieldTest) {
      await this.repository.delete(id);
    }
    return employeeFieldTest;
  }

  async getById(id: number): Promise<EmployeeFieldTest> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEmployeeFieldTestDto>> {
    const queryBuilder = this.repository.createQueryBuilder('employeeFieldTest');

    // Apply filters
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('employeeFieldTest.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.employeeFieldId) {
      queryBuilder.andWhere('employeeFieldTest.employeeFieldId = :employeeFieldId', { employeeFieldId: filter.employeeFieldId });
    }
    if (filter.testTypeId) {
      queryBuilder.andWhere('employeeFieldTest.testTypeId = :testTypeId', { testTypeId: filter.testTypeId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('employeeFieldTest.isActive = :isActive', { isActive: filter.isActive });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`employeeFieldTest.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('employeeFieldTest.id', 'DESC');
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

  private mapToReadDto(employeeFieldTest: EmployeeFieldTest): ReadEmployeeFieldTestDto {
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