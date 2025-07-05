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
export class ForcePriorityRepository extends Repository<ForcePriority> {
  constructor(
    @InjectRepository(ForcePriority)
    private readonly repository: Repository<ForcePriority>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[ForcePriority[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('forcePriority');

    // Apply filters
    if (filter.applicantId) {
      queryBuilder.andWhere('forcePriority.applicantId = :applicantId', { applicantId: filter.applicantId });
    }
    if (filter.forceId) {
      queryBuilder.andWhere('forcePriority.forceId = :forceId', { forceId: filter.forceId });
    }
    if (filter.priorityNumber) {
      queryBuilder.andWhere('forcePriority.priorityNumber = :priorityNumber', { priorityNumber: filter.priorityNumber });
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

    return await queryBuilder.getManyAndCount();
  }
} 