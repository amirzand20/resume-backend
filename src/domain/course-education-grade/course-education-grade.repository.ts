import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEducationGrade } from '@/entities/course-education-grade.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseEducationGradeRepository extends Repository<CourseEducationGrade> {
  constructor(
    @InjectRepository(CourseEducationGrade)
    private readonly repository: Repository<CourseEducationGrade>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
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
  ): Promise<[CourseEducationGrade[], number]> {
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

    return await queryBuilder.getManyAndCount();
  }
} 