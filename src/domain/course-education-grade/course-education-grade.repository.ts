import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEducationGrade } from '@/entities/course-education-grade.entity';
import { CreateCourseEducationGradeDto } from './dto/create-course-education-grade.dto';
import { UpdateCourseEducationGradeDto } from './dto/update-course-education-grade.dto';
import { ReadCourseEducationGradeDto } from './dto/read-course-education-grade.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseEducationGradeRepository {
  constructor(
    @InjectRepository(CourseEducationGrade)
    private readonly repository: Repository<CourseEducationGrade>,
  ) {}

  async create(data: CreateCourseEducationGradeDto): Promise<CourseEducationGrade> {
    const courseEducationGrade = this.repository.create(data);
    return await this.repository.save(courseEducationGrade);
  }

  async update(id: number, data: UpdateCourseEducationGradeDto): Promise<CourseEducationGrade> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<CourseEducationGrade> {
    const courseEducationGrade = await this.repository.findOne({ where: { id } });
    if (courseEducationGrade) {
      await this.repository.delete(id);
    }
    return courseEducationGrade;
  }

  async getById(id: number): Promise<CourseEducationGrade> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseEducationGradeDto>> {
    const queryBuilder = this.repository.createQueryBuilder('courseEducationGrade');

    // Apply filters
    if (filter.courseId) {
      queryBuilder.andWhere('courseEducationGrade.courseId = :courseId', { courseId: filter.courseId });
    }
    if (filter.educationGradeId) {
      queryBuilder.andWhere('courseEducationGrade.educationGradeId = :educationGradeId', { educationGradeId: filter.educationGradeId });
    }
    if (filter.educationFieldId) {
      queryBuilder.andWhere('courseEducationGrade.educationFieldId = :educationFieldId', { educationFieldId: filter.educationFieldId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('courseEducationGrade.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`courseEducationGrade.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('courseEducationGrade.id', 'DESC');
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

  private mapToReadDto(courseEducationGrade: CourseEducationGrade): ReadCourseEducationGradeDto {
    return {
      id: courseEducationGrade.id,
      courseId: courseEducationGrade.courseId,
      educationGradeId: courseEducationGrade.educationGradeId,
      educationFieldId: courseEducationGrade.educationFieldId,
      adjustedMin: courseEducationGrade.adjustedMin,
      createdMethodId: courseEducationGrade.createdMethodId,
      tableId: courseEducationGrade.tableId,
      createdDate: courseEducationGrade.createdDate,
      modifiedDate: courseEducationGrade.updatedDate,
      createdBy: parseInt(courseEducationGrade.createdBy),
      modifiedBy: courseEducationGrade.updatedBy ? parseInt(courseEducationGrade.updatedBy) : 0,
    };
  }
} 