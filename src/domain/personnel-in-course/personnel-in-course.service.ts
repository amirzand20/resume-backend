import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PersonnelInCourseRepository } from './personnel-in-course.repository';
import { CreatePersonnelInCourseDto } from './dto/create-personnel-in-course.dto';
import { UpdatePersonnelInCourseDto } from './dto/update-personnel-in-course.dto';
import { ReadPersonnelInCourseDto } from './dto/read-personnel-in-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { PersonnelInCourse } from '@/entities/personnel-in-course.entity';

@Injectable()
export class PersonnelInCourseService {
  constructor(
    private readonly repository: PersonnelInCourseRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreatePersonnelInCourseDto): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.mapper.mapAsync(
      data,
      CreatePersonnelInCourseDto,
      PersonnelInCourse,
    );
    const saveResult = await this.repository.save(personnelInCourse);
    return this.mapper.map(saveResult, PersonnelInCourse, ReadPersonnelInCourseDto);
  }

  async update(id: number, data: UpdatePersonnelInCourseDto): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.findOne({ where: { id } });
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    
    const updatedPersonnelInCourse = await this.mapper.mapAsync(
      data,
      UpdatePersonnelInCourseDto,
      PersonnelInCourse,
    );
    Object.assign(personnelInCourse, updatedPersonnelInCourse);
    
    const saveResult = await this.repository.save(personnelInCourse);
    return this.mapper.map(saveResult, PersonnelInCourse, ReadPersonnelInCourseDto);
  }

  async deleteById(id: number): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.findOne({ where: { id } });
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    await this.repository.remove(personnelInCourse);
    return this.mapper.map(personnelInCourse, PersonnelInCourse, ReadPersonnelInCourseDto);
  }

  async getById(id: number): Promise<ReadPersonnelInCourseDto> {
    const personnelInCourse = await this.repository.findOne({ where: { id } });
    if (!personnelInCourse) {
      throw new NotFoundException(`PersonnelInCourse with ID ${id} not found`);
    }
    return this.mapper.map(personnelInCourse, PersonnelInCourse, ReadPersonnelInCourseDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPersonnelInCourseDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, PersonnelInCourse, ReadPersonnelInCourseDto),
    };
  }
} 