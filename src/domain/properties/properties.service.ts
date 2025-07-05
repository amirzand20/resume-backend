import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PropertiesRepository } from './properties.repository';
import { CreatePropertiesDto } from './dto/create-properties.dto';
import { UpdatePropertiesDto } from './dto/update-properties.dto';
import { ReadPropertiesDto } from './dto/read-properties.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Properties } from '@/entities/properties.entity';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly repository: PropertiesRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreatePropertiesDto): Promise<ReadPropertiesDto> {
    const properties = await this.mapper.mapAsync(
      data,
      CreatePropertiesDto,
      Properties,
    );
    const saveResult = await this.repository.save(properties);
    return this.mapper.map(saveResult, Properties, ReadPropertiesDto);
  }

  async update(id: number, data: UpdatePropertiesDto): Promise<ReadPropertiesDto> {
    const properties = await this.repository.findOne({ where: { id } });
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    
    const updatedProperties = await this.mapper.mapAsync(
      data,
      UpdatePropertiesDto,
      Properties,
    );
    Object.assign(properties, updatedProperties);
    
    const saveResult = await this.repository.save(properties);
    return this.mapper.map(saveResult, Properties, ReadPropertiesDto);
  }

  async deleteById(id: number): Promise<ReadPropertiesDto> {
    const properties = await this.repository.findOne({ where: { id } });
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    await this.repository.remove(properties);
    return this.mapper.map(properties, Properties, ReadPropertiesDto);
  }

  async getById(id: number): Promise<ReadPropertiesDto> {
    const properties = await this.repository.findOne({ where: { id } });
    if (!properties) {
      throw new NotFoundException(`Properties with ID ${id} not found`);
    }
    return this.mapper.map(properties, Properties, ReadPropertiesDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertiesDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Properties, ReadPropertiesDto),
    };
  }
} 