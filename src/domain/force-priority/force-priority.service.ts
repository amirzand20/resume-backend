import { Injectable, NotFoundException } from '@nestjs/common';
import { ForcePriorityRepository } from './force-priority.repository';
import { CreateForcePriorityDto } from './dto/create-force-priority.dto';
import { UpdateForcePriorityDto } from './dto/update-force-priority.dto';
import { ReadForcePriorityDto } from './dto/read-force-priority.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ForcePriorityService {
  constructor(private readonly repository: ForcePriorityRepository) {}

  async create(data: CreateForcePriorityDto): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.create(data);
    return this.mapToReadDto(forcePriority);
  }

  async update(id: number, data: UpdateForcePriorityDto): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.update(id, data);
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    return this.mapToReadDto(forcePriority);
  }

  async deleteById(id: number): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.deleteById(id);
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    return this.mapToReadDto(forcePriority);
  }

  async getById(id: number): Promise<ReadForcePriorityDto> {
    const forcePriority = await this.repository.getById(id);
    if (!forcePriority) {
      throw new NotFoundException(`ForcePriority with ID ${id} not found`);
    }
    return this.mapToReadDto(forcePriority);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadForcePriorityDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(forcePriority: any): ReadForcePriorityDto {
    return {
      id: forcePriority.id,
      applicantId: forcePriority.applicantId,
      forceId: forcePriority.forceId,
      priorityNumber: forcePriority.priorityNumber,
      createdMethodId: forcePriority.createdMethodId,
      tableId: forcePriority.tableId,
      createdDate: forcePriority.createdDate,
      modifiedDate: forcePriority.updatedDate,
      createdBy: parseInt(forcePriority.createdBy),
      modifiedBy: forcePriority.updatedBy ? parseInt(forcePriority.updatedBy) : 0,
    };
  }
} 