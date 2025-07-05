import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForcePriority } from '@/entities/force-priority.entity';
import { CreateForcePriorityDto } from './dto/create-force-priority.dto';
import { UpdateForcePriorityDto } from './dto/update-force-priority.dto';
import { ReadForcePriorityDto } from './dto/read-force-priority.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ForcePriorityRepository {
  constructor(
    @InjectRepository(ForcePriority)
    private readonly repository: Repository<ForcePriority>,
  ) {}

  async create(data: CreateForcePriorityDto): Promise<ForcePriority> {
    const forcePriority = this.repository.create(data);
    return await this.repository.save(forcePriority);
  }

  async update(id: number, data: UpdateForcePriorityDto): Promise<ForcePriority> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<ForcePriority> {
    const forcePriority = await this.repository.findOne({ where: { id } });
    if (forcePriority) {
      await this.repository.delete(id);
    }
    return forcePriority;
  }

  async getById(id: number): Promise<ForcePriority> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadForcePriorityDto>> {
    const queryBuilder = this.repository.createQueryBuilder('forcePriority');

    // Apply filters
    if (filter.applicantId) {
      queryBuilder.andWhere('forcePriority.applicantId = :applicantId', { applicantId: filter.applicantId });
    }
    if (filter.forceId) {
      queryBuilder.andWhere('forcePriority.forceId = :forceId', { forceId: filter.forceId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('forcePriority.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`forcePriority.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('forcePriority.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(forcePriority: ForcePriority): ReadForcePriorityDto {
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