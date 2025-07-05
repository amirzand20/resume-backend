import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '@/entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ReadCertificateDto } from './dto/read-certificate.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CertificateRepository {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {}

  async create(data: CreateCertificateDto): Promise<Certificate> {
    const certificate = this.repository.create(data);
    return await this.repository.save(certificate);
  }

  async update(id: number, data: UpdateCertificateDto): Promise<Certificate> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<Certificate> {
    const certificate = await this.repository.findOne({ where: { id } });
    if (certificate) {
      await this.repository.delete(id);
    }
    return certificate;
  }

  async getById(id: number): Promise<Certificate> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCertificateDto>> {
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(certificate: Certificate): ReadCertificateDto {
    return {
      id: certificate.id,
      personId: certificate.personId,
      certificateTypeId: certificate.certificateTypeId,
      comment: certificate.comment,
      grantDate: certificate.grantDate,
      createdMethodId: certificate.createdMethodId,
      tableId: certificate.tableId,
      certificateIssuer: certificate.certificateIssuer,
      createdDate: certificate.createdDate,
      modifiedDate: certificate.updatedDate,
      createdBy: parseInt(certificate.createdBy),
      modifiedBy: certificate.updatedBy ? parseInt(certificate.updatedBy) : 0,
    };
  }
} 