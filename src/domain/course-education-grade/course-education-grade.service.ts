import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEducationGradeRepository } from './course-education-grade.repository';
import { CreateCourseEducationGradeDto } from './dto/create-course-education-grade.dto';
import { UpdateCourseEducationGradeDto } from './dto/update-course-education-grade.dto';
import { ReadCourseEducationGradeDto } from './dto/read-course-education-grade.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseEducationGradeService {
  constructor(private readonly repository: CourseEducationGradeRepository) {}

  async create(data: CreateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.create(data);
    return this.mapToReadDto(courseEducationGrade);
  }

  async update(id: number, data: UpdateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.update(id, data);
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    return this.mapToReadDto(courseEducationGrade);
  }

  async deleteById(id: number): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.deleteById(id);
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    return this.mapToReadDto(courseEducationGrade);
  }

  async getById(id: number): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.getById(id);
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    return this.mapToReadDto(courseEducationGrade);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseEducationGradeDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(courseEducationGrade: any): ReadCourseEducationGradeDto {
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