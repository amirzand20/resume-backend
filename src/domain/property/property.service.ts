import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ReadPropertyDto } from './dto/read-property.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Property } from '@/entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    private readonly repository: PropertyRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreatePropertyDto): Promise<ReadPropertyDto> {
    const property = await this.mapper.mapAsync(
      data,
      CreatePropertyDto,
      Property,
    );
    const saveResult = await this.repository.save(property);
    return this.mapper.map(saveResult, Property, ReadPropertyDto);
  }

  async update(id: number, data: UpdatePropertyDto): Promise<ReadPropertyDto> {
    const property = await this.repository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    
    const updatedProperty = await this.mapper.mapAsync(
      data,
      UpdatePropertyDto,
      Property,
    );
    Object.assign(property, updatedProperty);
    
    const saveResult = await this.repository.save(property);
    return this.mapper.map(saveResult, Property, ReadPropertyDto);
  }

  async deleteById(id: number): Promise<ReadPropertyDto> {
    const property = await this.repository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    await this.repository.remove(property);
    return this.mapper.map(property, Property, ReadPropertyDto);
  }

  async getById(id: number): Promise<ReadPropertyDto> {
    const property = await this.repository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return this.mapper.map(property, Property, ReadPropertyDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPropertyDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Property, ReadPropertyDto),
    };
  }
} 