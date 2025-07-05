import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CourseFieldRepository } from './course-field.repository';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';
import { ReadCourseFieldDto } from './dto/read-course-field.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { CourseField } from '@/entities/course-field.entity';

@Injectable()
export class CourseFieldService {
  constructor(
    private readonly repository: CourseFieldRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateCourseFieldDto): Promise<ReadCourseFieldDto> {
    const courseField = await this.mapper.mapAsync(
      data,
      CreateCourseFieldDto,
      CourseField,
    );
    const saveResult = await this.repository.save(courseField);
    return this.mapper.map(saveResult, CourseField, ReadCourseFieldDto);
  }

  async update(id: number, data: UpdateCourseFieldDto): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.findOne({ where: { id } });
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    
    const updatedCourseField = await this.mapper.mapAsync(
      data,
      UpdateCourseFieldDto,
      CourseField,
    );
    Object.assign(courseField, updatedCourseField);
    
    const saveResult = await this.repository.save(courseField);
    return this.mapper.map(saveResult, CourseField, ReadCourseFieldDto);
  }

  async deleteById(id: number): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.findOne({ where: { id } });
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    await this.repository.remove(courseField);
    return this.mapper.map(courseField, CourseField, ReadCourseFieldDto);
  }

  async getById(id: number): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.findOne({ where: { id } });
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    return this.mapper.map(courseField, CourseField, ReadCourseFieldDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseFieldDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, CourseField, ReadCourseFieldDto),
    };
  }
} 