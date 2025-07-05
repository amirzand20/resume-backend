import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageInfo } from '@/entities/language-info.entity';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class LanguageInfoRepository {
  constructor(
    @InjectRepository(LanguageInfo)
    private readonly repository: Repository<LanguageInfo>,
  ) {}

  async create(data: CreateLanguageInfoDto): Promise<LanguageInfo> {
    const languageInfo = this.repository.create(data);
    return await this.repository.save(languageInfo);
  }

  async update(id: number, data: UpdateLanguageInfoDto): Promise<LanguageInfo> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<LanguageInfo> {
    const languageInfo = await this.repository.findOne({ where: { id } });
    if (languageInfo) {
      await this.repository.delete(id);
    }
    return languageInfo;
  }

  async getById(id: number): Promise<LanguageInfo> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadLanguageInfoDto>> {
    const queryBuilder = this.repository.createQueryBuilder('languageInfo');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('languageInfo.personId = :personId', { personId: filter.personId });
    }
    if (filter.languageId) {
      queryBuilder.andWhere('languageInfo.languageId = :languageId', { languageId: filter.languageId });
    }
    if (filter.readingLevelId) {
      queryBuilder.andWhere('languageInfo.readingLevelId = :readingLevelId', { readingLevelId: filter.readingLevelId });
    }
    if (filter.writingLevelId) {
      queryBuilder.andWhere('languageInfo.writingLevelId = :writingLevelId', { writingLevelId: filter.writingLevelId });
    }
    if (filter.conversationLevelId) {
      queryBuilder.andWhere('languageInfo.conversationLevelId = :conversationLevelId', { conversationLevelId: filter.conversationLevelId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('languageInfo.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`languageInfo.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('languageInfo.id', 'DESC');
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

  private mapToReadDto(languageInfo: LanguageInfo): ReadLanguageInfoDto {
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