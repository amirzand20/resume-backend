import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationRepository } from './education.repository';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ReadEducationDto } from './dto/read-education.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EducationService {
  constructor(private readonly repository: EducationRepository) {}

  async create(data: CreateEducationDto): Promise<ReadEducationDto> {
    const education = await this.repository.create(data);
    return this.mapToReadDto(education);
  }

  async update(id: number, data: UpdateEducationDto): Promise<ReadEducationDto> {
    const education = await this.repository.update(id, data);
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return this.mapToReadDto(education);
  }

  async deleteById(id: number): Promise<ReadEducationDto> {
    const education = await this.repository.deleteById(id);
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return this.mapToReadDto(education);
  }

  async getById(id: number): Promise<ReadEducationDto> {
    const education = await this.repository.getById(id);
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return this.mapToReadDto(education);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEducationDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(education: any): ReadEducationDto {
    return {
      id: education.id,
      personId: education.personId,
      gradeId: education.gradeId,
      levelId: education.levelId,
      fieldId: education.fieldId,
      instituteId: education.instituteId,
      graduationDate: education.graduationDate,
      adjusted: education.adjusted,
      createdMethodId: education.createdMethodId,
      tableId: education.tableId,
      isActive: education.isActive,
      createdDate: education.createdDate,
      modifiedDate: education.updatedDate,
      createdBy: parseInt(education.createdBy),
      modifiedBy: education.updatedBy ? parseInt(education.updatedBy) : 0,
    };
  }
} 