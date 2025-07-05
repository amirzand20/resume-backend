import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { CreatePropertiesDto } from './dto/create-properties.dto';
import { UpdatePropertiesDto } from './dto/update-properties.dto';
import { ReadPropertiesDto } from './dto/read-properties.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PropertiesService {
  constructor(private readonly repository: PropertiesRepository) {}

  async create(data: CreatePropertiesDto): Promise<ReadPropertiesDto> {
    const properties = await this.repository.create(data);
    return this.mapToReadDto(properties);
  }

  async update(id: number, data: UpdatePropertiesDto): Promise<ReadPropertiesDto> {
    const properties = await this.repository.update(id, data);
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    return this.mapToReadDto(properties);
  }

  async deleteById(id: number): Promise<ReadPropertiesDto> {
    const properties = await this.repository.deleteById(id);
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    return this.mapToReadDto(properties);
  }

  async getById(id: number): Promise<ReadPropertiesDto> {
    const properties = await this.repository.getById(id);
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    return this.mapToReadDto(properties);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertiesDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(properties: any): ReadPropertiesDto {
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