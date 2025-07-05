import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '@/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ReadCourseDto } from './dto/read-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {}

  async create(data: CreateCourseDto): Promise<Course> {
    const course = this.repository.create(data);
    return await this.repository.save(course);
  }

  async update(id: number, data: UpdateCourseDto): Promise<Course> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<Course> {
    const course = await this.repository.findOne({ where: { id } });
    if (course) {
      await this.repository.delete(id);
    }
    return course;
  }

  async getById(id: number): Promise<Course> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseDto>> {
    const queryBuilder = this.repository.createQueryBuilder('course');

    // Apply filters
    if (filter.employeeTypeId) {
      queryBuilder.andWhere('course.employeeTypeId = :employeeTypeId', { employeeTypeId: filter.employeeTypeId });
    }
    if (filter.employeeForceId) {
      queryBuilder.andWhere('course.employeeForceId = :employeeForceId', { employeeForceId: filter.employeeForceId });
    }
    if (filter.recruitmentStatusId) {
      queryBuilder.andWhere('course.recruitmentStatusId = :recruitmentStatusId', { recruitmentStatusId: filter.recruitmentStatusId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('course.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }
    if (filter.title) {
      queryBuilder.andWhere('course.title LIKE :title', { title: `%${filter.title}%` });
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(course: Course): ReadCourseDto {
    return {
      id: course.id,
      employeeTypeId: course.employeeTypeId,
      employeeForceId: course.employeeForceId,
      title: course.title,
      startDate: course.startDate,
      endDate: course.endDate,
      recruitmentStatusId: course.recruitmentStatusId,
      createdMethodId: course.createdMethodId,
      tableId: course.tableId,
      createdDate: course.createdDate,
      modifiedDate: course.updatedDate,
      createdBy: parseInt(course.createdBy),
      modifiedBy: course.updatedBy ? parseInt(course.updatedBy) : 0,
    };
  }
} 