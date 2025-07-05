import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ExperienceRepository } from './experience.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Experience } from '@/entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly repository: ExperienceRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateExperienceDto): Promise<ReadExperienceDto> {
    const experience = await this.mapper.mapAsync(
      data,
      CreateExperienceDto,
      Experience,
    );
    const saveResult = await this.repository.save(experience);
    return this.mapper.map(saveResult, Experience, ReadExperienceDto);
  }

  async update(id: number, data: UpdateExperienceDto): Promise<ReadExperienceDto> {
    const experience = await this.repository.findOne({ where: { id } });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    
    const updatedExperience = await this.mapper.mapAsync(
      data,
      UpdateExperienceDto,
      Experience,
    );
    Object.assign(experience, updatedExperience);
    
    const saveResult = await this.repository.save(experience);
    return this.mapper.map(saveResult, Experience, ReadExperienceDto);
  }

  async deleteById(id: number): Promise<ReadExperienceDto> {
    const experience = await this.repository.findOne({ where: { id } });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    await this.repository.remove(experience);
    return this.mapper.map(experience, Experience, ReadExperienceDto);
  }

  async getById(id: number): Promise<ReadExperienceDto> {
    const experience = await this.repository.findOne({ where: { id } });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return this.mapper.map(experience, Experience, ReadExperienceDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadExperienceDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Experience, ReadExperienceDto),
    };
  }
} 