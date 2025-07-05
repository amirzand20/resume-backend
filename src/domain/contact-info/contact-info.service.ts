import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ContactInfoRepository } from './contact-info.repository';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ReadContactInfoDto } from './dto/read-contact-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { ContactInfo } from '@/entities/contact-info.entity';

@Injectable()
export class ContactInfoService {
  constructor(
    private readonly repository: ContactInfoRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateContactInfoDto): Promise<ReadContactInfoDto> {
    const contactInfo = await this.mapper.mapAsync(
      data,
      CreateContactInfoDto,
      ContactInfo,
    );
    const saveResult = await this.repository.save(contactInfo);
    return this.mapper.map(saveResult, ContactInfo, ReadContactInfoDto);
  }

  async update(id: number, data: UpdateContactInfoDto): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.findOne({ where: { id } });
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    
    const updatedContactInfo = await this.mapper.mapAsync(
      data,
      UpdateContactInfoDto,
      ContactInfo,
    );
    Object.assign(contactInfo, updatedContactInfo);
    
    const saveResult = await this.repository.save(contactInfo);
    return this.mapper.map(saveResult, ContactInfo, ReadContactInfoDto);
  }

  async deleteById(id: number): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.findOne({ where: { id } });
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    await this.repository.remove(contactInfo);
    return this.mapper.map(contactInfo, ContactInfo, ReadContactInfoDto);
  }

  async getById(id: number): Promise<ReadContactInfoDto> {
    const contactInfo = await this.repository.findOne({ where: { id } });
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    return this.mapper.map(contactInfo, ContactInfo, ReadContactInfoDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadContactInfoDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, ContactInfo, ReadContactInfoDto),
    };
  }
} 