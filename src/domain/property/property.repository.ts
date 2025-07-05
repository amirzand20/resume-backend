import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '@/entities/property.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertyRepository extends Repository<Property> {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Property[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('property');

    // Apply filters
    if (filter.name) {
      queryBuilder.andWhere('property.name LIKE :name', { name: `%${filter.name}%` });
    }
    if (filter.code) {
      queryBuilder.andWhere('property.code LIKE :code', { code: `%${filter.code}%` });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('property.isActive = :isActive', { isActive: filter.isActive });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`property.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('property.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 