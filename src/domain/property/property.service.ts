import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ReadPropertyDto } from './dto/read-property.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertyService {
  constructor(private readonly repository: PropertyRepository) {}

  async create(data: CreatePropertyDto): Promise<ReadPropertyDto> {
    const property = await this.repository.create(data);
    return this.mapToReadDto(property);
  }

  async update(id: number, data: UpdatePropertyDto): Promise<ReadPropertyDto> {
    const property = await this.repository.update(id, data);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return this.mapToReadDto(property);
  }

  async deleteById(id: number): Promise<ReadPropertyDto> {
    const property = await this.repository.deleteById(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return this.mapToReadDto(property);
  }

  async getById(id: number): Promise<ReadPropertyDto> {
    const property = await this.repository.getById(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return this.mapToReadDto(property);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertyDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(property: any): ReadPropertyDto {
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