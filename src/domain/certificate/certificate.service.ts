import { Injectable, NotFoundException } from '@nestjs/common';
import { CertificateRepository } from './certificate.repository';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ReadCertificateDto } from './dto/read-certificate.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class CertificateService {
  constructor(private readonly repository: CertificateRepository) {}

  async create(data: CreateCertificateDto): Promise<ReadCertificateDto> {
    const certificate = await this.repository.create(data);
    return this.mapToReadDto(certificate);
  }

  async update(id: number, data: UpdateCertificateDto): Promise<ReadCertificateDto> {
    const certificate = await this.repository.update(id, data);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return this.mapToReadDto(certificate);
  }

  async deleteById(id: number): Promise<ReadCertificateDto> {
    const certificate = await this.repository.deleteById(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return this.mapToReadDto(certificate);
  }

  async getById(id: number): Promise<ReadCertificateDto> {
    const certificate = await this.repository.getById(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return this.mapToReadDto(certificate);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCertificateDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(certificate: any): ReadCertificateDto {
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
      modifiedDate: certificate.modifiedDate,
      createdBy: certificate.createdBy,
      modifiedBy: certificate.modifiedBy,
    };
  }
} 