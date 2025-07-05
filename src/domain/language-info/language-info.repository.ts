import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageInfo } from '@/entities/language-info.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class LanguageInfoRepository extends Repository<LanguageInfo> {
  constructor(
    @InjectRepository(LanguageInfo)
    private readonly repository: Repository<LanguageInfo>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[LanguageInfo[], number]> {
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

    return await queryBuilder.getManyAndCount();
  }
} 