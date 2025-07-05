import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '@/entities/course.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Course[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('course');

    // Apply filters
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('course.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.employeeForceId) {
      queryBuilder.andWhere('course.employeeForceId = :employeeForceId', { employeeForceId: filter.employeeForceId });
    }
    if (filter.title) {
      queryBuilder.andWhere('course.title LIKE :title', { title: `%${filter.title}%` });
    }
    if (filter.recruitmentStatusId) {
      queryBuilder.andWhere('course.recruitmentStatusId = :recruitmentStatusId', { recruitmentStatusId: filter.recruitmentStatusId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('course.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`course.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('course.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 