import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CertificateRepository } from './certificate.repository';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ReadCertificateDto } from './dto/read-certificate.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Certificate } from '@/entities/certificate.entity';

@Injectable()
export class CertificateService {
  constructor(
    private readonly repository: CertificateRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateCertificateDto): Promise<ReadCertificateDto> {
    const certificate = await this.mapper.mapAsync(
      data,
      CreateCertificateDto,
      Certificate,
    );
    const saveResult = await this.repository.save(certificate);
    return this.mapper.map(saveResult, Certificate, ReadCertificateDto);
  }

  async update(id: number, data: UpdateCertificateDto): Promise<ReadCertificateDto> {
    const certificate = await this.repository.findOne({ where: { id } });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    
    const updatedCertificate = await this.mapper.mapAsync(
      data,
      UpdateCertificateDto,
      Certificate,
    );
    Object.assign(certificate, updatedCertificate);
    
    const saveResult = await this.repository.save(certificate);
    return this.mapper.map(saveResult, Certificate, ReadCertificateDto);
  }

  async deleteById(id: number): Promise<ReadCertificateDto> {
    const certificate = await this.repository.findOne({ where: { id } });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    await this.repository.remove(certificate);
    return this.mapper.map(certificate, Certificate, ReadCertificateDto);
  }

  async getById(id: number): Promise<ReadCertificateDto> {
    const certificate = await this.repository.findOne({ where: { id } });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return this.mapper.map(certificate, Certificate, ReadCertificateDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadCertificateDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Certificate, ReadCertificateDto),
    };
  }
} 