import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguageInfoRepository } from './language-info.repository';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class LanguageInfoService {
  constructor(private readonly repository: LanguageInfoRepository) {}

  async create(data: CreateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.create(data);
    return this.mapToReadDto(languageInfo);
  }

  async update(id: number, data: UpdateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.update(id, data);
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(languageInfo);
  }

  async deleteById(id: number): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.deleteById(id);
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(languageInfo);
  }

  async getById(id: number): Promise<ReadLanguageInfoDto> {
    const languageInfo = await this.repository.getById(id);
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    return this.mapToReadDto(languageInfo);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadLanguageInfoDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(languageInfo: any): ReadLanguageInfoDto {
    return {
      id: languageInfo.id,
      personId: languageInfo.personId,
      languageId: languageInfo.languageId,
      readingLevelId: languageInfo.readingLevelId,
      writingLevelId: languageInfo.writingLevelId,
      conversationLevelId: languageInfo.conversationLevelId,
      comment: languageInfo.comment,
      tableId: languageInfo.tableId,
      createdMethodId: languageInfo.createdMethodId,
      createdDate: languageInfo.createdDate,
      modifiedDate: languageInfo.updatedDate,
      createdBy: parseInt(languageInfo.createdBy),
      modifiedBy: languageInfo.updatedBy ? parseInt(languageInfo.updatedBy) : 0,
    };
  }
} 