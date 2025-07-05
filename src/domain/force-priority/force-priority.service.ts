import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ForcePriorityRepository } from './force-priority.repository';
import { CreateForcePriorityDto } from './dto/create-force-priority.dto';
import { UpdateForcePriorityDto } from './dto/update-force-priority.dto';
import { ReadForcePriorityDto } from './dto/read-force-priority.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { ForcePriority } from '@/entities/force-priority.entity';

@Injectable()
export class ForcePriorityService {
  constructor(
    private readonly repository: ForcePriorityRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateForcePriorityDto): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.mapper.mapAsync(
      data,
      CreateForcePriorityDto,
      ForcePriority,
    );
    const saveResult = await this.repository.save(forcePriority);
    return this.mapper.map(saveResult, ForcePriority, ReadForcePriorityDto);
  }

  async update(id: number, data: UpdateForcePriorityDto): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.findOne({ where: { id } });
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    
    const updatedForcePriority = await this.mapper.mapAsync(
      data,
      UpdateForcePriorityDto,
      ForcePriority,
    );
    Object.assign(forcePriority, updatedForcePriority);
    
    const saveResult = await this.repository.save(forcePriority);
    return this.mapper.map(saveResult, ForcePriority, ReadForcePriorityDto);
  }

  async deleteById(id: number): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.findOne({ where: { id } });
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    await this.repository.remove(forcePriority);
    return this.mapper.map(forcePriority, ForcePriority, ReadForcePriorityDto);
  }

  async getById(id: number): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.findOne({ where: { id } });
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    return this.mapper.map(forcePriority, ForcePriority, ReadForcePriorityDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadForcePriorityDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, ForcePriority, ReadForcePriorityDto),
    };
  }
} 