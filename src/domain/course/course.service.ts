import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ReadCourseDto } from './dto/read-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Course } from '@/entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    private readonly repository: CourseRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateCourseDto): Promise<ReadCourseDto> {
    const course = await this.mapper.mapAsync(
      data,
      CreateCourseDto,
      Course,
    );
    const saveResult = await this.repository.save(course);
    return this.mapper.map(saveResult, Course, ReadCourseDto);
  }

  async update(id: number, data: UpdateCourseDto): Promise<ReadCourseDto> {
    const course = await this.repository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    
    const updatedCourse = await this.mapper.mapAsync(
      data,
      UpdateCourseDto,
      Course,
    );
    Object.assign(course, updatedCourse);
    
    const saveResult = await this.repository.save(course);
    return this.mapper.map(saveResult, Course, ReadCourseDto);
  }

  async deleteById(id: number): Promise<ReadCourseDto> {
    const course = await this.repository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    await this.repository.remove(course);
    return this.mapper.map(course, Course, ReadCourseDto);
  }

  async getById(id: number): Promise<ReadCourseDto> {
    const course = await this.repository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.mapper.map(course, Course, ReadCourseDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Course, ReadCourseDto),
    };
  }
} 