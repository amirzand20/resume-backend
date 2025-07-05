import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from '@/entities/contact-info.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ContactInfoRepository extends Repository<ContactInfo> {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly repository: Repository<ContactInfo>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[ContactInfo[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('contactInfo');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('contactInfo.personId = :personId', { personId: filter.personId });
    }
    if (filter.locationPlaceId) {
      queryBuilder.andWhere('contactInfo.locationPlaceId = :locationPlaceId', { locationPlaceId: filter.locationPlaceId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('contactInfo.isActive = :isActive', { isActive: filter.isActive });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('contactInfo.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`contactInfo.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('contactInfo.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 