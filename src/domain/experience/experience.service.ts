import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ExperienceService {
  constructor(private readonly repository: ExperienceRepository) {}

  async create(data: CreateExperienceDto): Promise<ReadExperienceDto> {
    const experience = await this.repository.create(data);
    return this.mapToReadDto(experience);
  }

  async update(id: number, data: UpdateExperienceDto): Promise<ReadExperienceDto> {
    const experience = await this.repository.update(id, data);
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return this.mapToReadDto(experience);
  }

  async deleteById(id: number): Promise<ReadExperienceDto> {
    const experience = await this.repository.deleteById(id);
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return this.mapToReadDto(experience);
  }

  async getById(id: number): Promise<ReadExperienceDto> {
    const experience = await this.repository.getById(id);
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return this.mapToReadDto(experience);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadExperienceDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(experience: any): ReadExperienceDto {
    return {
      id: experience.id,
      personId: experience.personId,
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      companyLocationId: experience.companyLocationId,
      startDate: experience.startDate,
      endDate: experience.endDate,
      tableId: experience.tableId,
      createdMethodId: experience.createdMethodId,
      createdDate: experience.createdDate,
      modifiedDate: experience.updatedDate,
      createdBy: parseInt(experience.createdBy),
      modifiedBy: experience.updatedBy ? parseInt(experience.updatedBy) : 0,
    };
  }
} 