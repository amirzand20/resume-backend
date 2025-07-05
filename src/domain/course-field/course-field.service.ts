import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseFieldRepository } from './course-field.repository';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';
import { ReadCourseFieldDto } from './dto/read-course-field.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseFieldService {
  constructor(private readonly repository: CourseFieldRepository) {}

  async create(data: CreateCourseFieldDto): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.create(data);
    return this.mapToReadDto(courseField);
  }

  async update(id: number, data: UpdateCourseFieldDto): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.update(id, data);
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    return this.mapToReadDto(courseField);
  }

  async deleteById(id: number): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.deleteById(id);
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    return this.mapToReadDto(courseField);
  }

  async getById(id: number): Promise<ReadCourseFieldDto> {
    const courseField = await this.repository.getById(id);
    if (!courseField) {
      throw new NotFoundException(`CourseField with ID ${id} not found`);
    }
    return this.mapToReadDto(courseField);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseFieldDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(courseField: any): ReadCourseFieldDto {
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