import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseField } from '@/entities/course-field.entity';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseFieldRepository extends Repository<CourseField> {
  constructor(
    @InjectRepository(CourseField)
    private readonly repository: Repository<CourseField>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
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
  ): Promise<[CourseField[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('courseField');

    // Apply filters
    if (filter.courseId) {
      queryBuilder.andWhere('courseField.courseId = :courseId', { courseId: filter.courseId });
    }
    if (filter.courseFieldId) {
      queryBuilder.andWhere('courseField.courseFieldId = :courseFieldId', { courseFieldId: filter.courseFieldId });
    }
    if (filter.capacity) {
      queryBuilder.andWhere('courseField.capacity = :capacity', { capacity: filter.capacity });
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

    return await queryBuilder.getManyAndCount();
  }
} 