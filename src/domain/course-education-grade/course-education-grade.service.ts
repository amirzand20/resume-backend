import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CourseEducationGradeRepository } from './course-education-grade.repository';
import { CreateCourseEducationGradeDto } from './dto/create-course-education-grade.dto';
import { UpdateCourseEducationGradeDto } from './dto/update-course-education-grade.dto';
import { ReadCourseEducationGradeDto } from './dto/read-course-education-grade.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { CourseEducationGrade } from '@/entities/course-education-grade.entity';

@Injectable()
export class CourseEducationGradeService {
  constructor(
    private readonly repository: CourseEducationGradeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.mapper.mapAsync(
      data,
      CreateCourseEducationGradeDto,
      CourseEducationGrade,
    );
    const saveResult = await this.repository.save(courseEducationGrade);
    return this.mapper.map(saveResult, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async update(id: number, data: UpdateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.findOne({ where: { id } });
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    
    const updatedCourseEducationGrade = await this.mapper.mapAsync(
      data,
      UpdateCourseEducationGradeDto,
      CourseEducationGrade,
    );
    Object.assign(courseEducationGrade, updatedCourseEducationGrade);
    
    const saveResult = await this.repository.save(courseEducationGrade);
    return this.mapper.map(saveResult, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async deleteById(id: number): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.findOne({ where: { id } });
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    await this.repository.remove(courseEducationGrade);
    return this.mapper.map(courseEducationGrade, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async getById(id: number): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.repository.findOne({ where: { id } });
    if (!courseEducationGrade) {
      throw new NotFoundException(`CourseEducationGrade with ID ${id} not found`);
    }
    return this.mapper.map(courseEducationGrade, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseEducationGradeDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, CourseEducationGrade, ReadCourseEducationGradeDto),
    };
  }
} 