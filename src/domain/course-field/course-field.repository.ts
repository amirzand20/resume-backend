import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseField } from '@/entities/course-field.entity';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';
import { ReadCourseFieldDto } from './dto/read-course-field.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseFieldRepository {
  constructor(
    @InjectRepository(CourseField)
    private readonly repository: Repository<CourseField>,
  ) {}

  async create(data: CreateCourseFieldDto): Promise<CourseField> {
    const courseField = this.repository.create(data);
    return await this.repository.save(courseField);
  }

  async update(id: number, data: UpdateCourseFieldDto): Promise<CourseField> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<CourseField> {
    const courseField = await this.repository.findOne({ where: { id } });
    if (courseField) {
      await this.repository.delete(id);
    }
    return courseField;
  }

  async getById(id: number): Promise<CourseField> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseFieldDto>> {
    const queryBuilder = this.repository.createQueryBuilder('courseField');

    // Apply filters
    if (filter.courseId) {
      queryBuilder.andWhere('courseField.courseId = :courseId', { courseId: filter.courseId });
    }
    if (filter.courseFieldId) {
      queryBuilder.andWhere('courseField.courseFieldId = :courseFieldId', { courseFieldId: filter.courseFieldId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('courseField.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`courseField.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('courseField.id', 'DESC');
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

  private mapToReadDto(courseField: CourseField): ReadCourseFieldDto {
    return {
      id: courseField.id,
      courseId: courseField.courseId,
      courseFieldId: courseField.courseFieldId,
      capacity: courseField.capacity,
      createdMethodId: courseField.createdMethodId,
      tableId: courseField.tableId,
      createdDate: courseField.createdDate,
      modifiedDate: courseField.updatedDate,
      createdBy: parseInt(courseField.createdBy),
      modifiedBy: courseField.updatedBy ? parseInt(courseField.updatedBy) : 0,
    };
  }
} 