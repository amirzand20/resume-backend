import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ReadCourseDto } from './dto/read-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async create(data: CreateCourseDto): Promise<ReadCourseDto> {
    const course = await this.repository.create(data);
    return this.mapToReadDto(course);
  }

  async update(id: number, data: UpdateCourseDto): Promise<ReadCourseDto> {
    const course = await this.repository.update(id, data);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.mapToReadDto(course);
  }

  async deleteById(id: number): Promise<ReadCourseDto> {
    const course = await this.repository.deleteById(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.mapToReadDto(course);
  }

  async getById(id: number): Promise<ReadCourseDto> {
    const course = await this.repository.getById(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return this.mapToReadDto(course);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCourseDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(course: any): ReadCourseDto {
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