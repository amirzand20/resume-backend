import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '@/entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ReadPropertyDto } from './dto/read-property.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
  ) {}

  async create(data: CreatePropertyDto): Promise<Property> {
    const property = this.repository.create(data);
    return await this.repository.save(property);
  }

  async update(id: number, data: UpdatePropertyDto): Promise<Property> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<Property> {
    const property = await this.repository.findOne({ where: { id } });
    if (property) {
      await this.repository.delete(id);
    }
    return property;
  }

  async getById(id: number): Promise<Property> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertyDto>> {
    const queryBuilder = this.repository.createQueryBuilder('property');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('property.personId = :personId', { personId: filter.personId });
    }
    if (filter.propertyTypeId) {
      queryBuilder.andWhere('property.propertyTypeId = :propertyTypeId', { propertyTypeId: filter.propertyTypeId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('property.isActive = :isActive', { isActive: filter.isActive });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('property.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(property: Property): ReadPropertyDto {
    return {
      id: property.id,
      personId: property.personId,
      propertyTypeId: property.propertyTypeId,
      propertyInfo: property.propertyInfo,
      tableId: property.tableId,
      createdMethodId: property.createdMethodId,
      isActive: property.isActive,
      createdDate: property.createdDate,
      modifiedDate: property.updatedDate,
      createdBy: parseInt(property.createdBy),
      modifiedBy: property.updatedBy ? parseInt(property.updatedBy) : 0,
    };
  }
} 