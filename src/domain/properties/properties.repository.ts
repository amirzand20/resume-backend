import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Properties } from '@/entities/properties.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertiesRepository extends Repository<Properties> {
  constructor(
    @InjectRepository(Properties)
    private readonly repository: Repository<Properties>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Properties[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('properties');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('properties.personId = :personId', { personId: filter.personId });
    }
    if (filter.propertyId) {
      queryBuilder.andWhere('properties.propertyId = :propertyId', { propertyId: filter.propertyId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('properties.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`properties.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('properties.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 