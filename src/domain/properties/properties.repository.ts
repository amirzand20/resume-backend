import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Properties } from '@/entities/properties.entity';
import { CreatePropertiesDto } from './dto/create-properties.dto';
import { UpdatePropertiesDto } from './dto/update-properties.dto';
import { ReadPropertiesDto } from './dto/read-properties.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertiesRepository {
  constructor(
    @InjectRepository(Properties)
    private readonly repository: Repository<Properties>,
  ) {}

  async create(data: CreatePropertiesDto): Promise<Properties> {
    const properties = this.repository.create(data);
    return await this.repository.save(properties);
  }

  async update(id: number, data: UpdatePropertiesDto): Promise<Properties> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<Properties> {
    const properties = await this.repository.findOne({ where: { id } });
    if (properties) {
      await this.repository.delete(id);
    }
    return properties;
  }

  async getById(id: number): Promise<Properties> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertiesDto>> {
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(properties: Properties): ReadPropertiesDto {
    return {
      id: properties.id,
      personId: properties.personId,
      propertyId: properties.propertyId,
      tableId: properties.tableId,
      createdMethodId: properties.createdMethodId,
      createdDate: properties.createdDate,
      modifiedDate: properties.updatedDate,
      createdBy: parseInt(properties.createdBy),
      modifiedBy: properties.updatedBy ? parseInt(properties.updatedBy) : 0,
    };
  }
} 