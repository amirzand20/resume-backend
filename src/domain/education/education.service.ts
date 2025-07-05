import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EducationRepository } from './education.repository';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ReadEducationDto } from './dto/read-education.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Education } from '@/entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    private readonly repository: EducationRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateEducationDto): Promise<ReadEducationDto> {
    const education = await this.mapper.mapAsync(
      data,
      CreateEducationDto,
      Education,
    );
    const saveResult = await this.repository.save(education);
    return this.mapper.map(saveResult, Education, ReadEducationDto);
  }

  async update(id: number, data: UpdateEducationDto): Promise<ReadEducationDto> {
    const education = await this.repository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    
    const updatedEducation = await this.mapper.mapAsync(
      data,
      UpdateEducationDto,
      Education,
    );
    Object.assign(education, updatedEducation);
    
    const saveResult = await this.repository.save(education);
    return this.mapper.map(saveResult, Education, ReadEducationDto);
  }

  async deleteById(id: number): Promise<ReadEducationDto> {
    const education = await this.repository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    await this.repository.remove(education);
    return this.mapper.map(education, Education, ReadEducationDto);
  }

  async getById(id: number): Promise<ReadEducationDto> {
    const education = await this.repository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return this.mapper.map(education, Education, ReadEducationDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadEducationDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Education, ReadEducationDto),
    };
  }
} 