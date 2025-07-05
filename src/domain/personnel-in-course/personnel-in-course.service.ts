import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonnelInCourseRepository } from './personnel-in-course.repository';
import { CreatePersonnelInCourseDto } from './dto/create-personnel-in-course.dto';
import { UpdatePersonnelInCourseDto } from './dto/update-personnel-in-course.dto';
import { ReadPersonnelInCourseDto } from './dto/read-personnel-in-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PersonnelInCourseService {
  constructor(private readonly repository: PersonnelInCourseRepository) {}

  async create(data: CreatePersonnelInCourseDto): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.create(data);
    return this.mapToReadDto(personnelInCourse);
  }

  async update(id: number, data: UpdatePersonnelInCourseDto): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.update(id, data);
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    return this.mapToReadDto(personnelInCourse);
  }

  async deleteById(id: number): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.deleteById(id);
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    return this.mapToReadDto(personnelInCourse);
  }

  async getById(id: number): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.getById(id);
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    return this.mapToReadDto(personnelInCourse);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPersonnelInCourseDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(personnelInCourse: any): ReadPersonnelInCourseDto {
    return {
      id: personnelInCourse.id,
      courseFieldId: personnelInCourse.courseFieldId,
      applicantId: personnelInCourse.applicantId,
      volunteerCode: personnelInCourse.volunteerCode,
      tableId: personnelInCourse.tableId,
      createdMethodId: personnelInCourse.createdMethodId,
      createdDate: personnelInCourse.createdDate,
      modifiedDate: personnelInCourse.updatedDate,
      createdBy: parseInt(personnelInCourse.createdBy),
      modifiedBy: personnelInCourse.updatedBy ? parseInt(personnelInCourse.updatedBy) : 0,
    };
  }
} 