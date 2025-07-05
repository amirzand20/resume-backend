import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '@/entities/certificate.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CertificateRepository extends Repository<Certificate> {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Certificate[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('certificate');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('certificate.personId = :personId', { personId: filter.personId });
    }
    if (filter.certificateTypeId) {
      queryBuilder.andWhere('certificate.certificateTypeId = :certificateTypeId', { certificateTypeId: filter.certificateTypeId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('certificate.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`certificate.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('certificate.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 