import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { LanguageInfoRepository } from './language-info.repository';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { LanguageInfo } from '@/entities/language-info.entity';

@Injectable()
export class LanguageInfoService {
  constructor(
    private readonly repository: LanguageInfoRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.mapper.mapAsync(
      data,
      CreateLanguageInfoDto,
      LanguageInfo,
    );
    const saveResult = await this.repository.save(languageInfo);
    return this.mapper.map(saveResult, LanguageInfo, ReadLanguageInfoDto);
  }

  async update(id: number, data: UpdateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.findOne({ where: { id } });
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    
    const updatedLanguageInfo = await this.mapper.mapAsync(
      data,
      UpdateLanguageInfoDto,
      LanguageInfo,
    );
    Object.assign(languageInfo, updatedLanguageInfo);
    
    const saveResult = await this.repository.save(languageInfo);
    return this.mapper.map(saveResult, LanguageInfo, ReadLanguageInfoDto);
  }

  async deleteById(id: number): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.findOne({ where: { id } });
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    await this.repository.remove(languageInfo);
    return this.mapper.map(languageInfo, LanguageInfo, ReadLanguageInfoDto);
  }

  async getById(id: number): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.findOne({ where: { id } });
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    return this.mapper.map(languageInfo, LanguageInfo, ReadLanguageInfoDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadLanguageInfoDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, LanguageInfo, ReadLanguageInfoDto),
    };
  }
} 