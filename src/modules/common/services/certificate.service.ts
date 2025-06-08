import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Certificate } from '../../../entity/certificate.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  async findAll(): Promise<Certificate[]> {
    return this.certificateRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    
    return certificate;
  }

  async findByPersonId(personId: number): Promise<Certificate[]> {
    return this.certificateRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<Certificate>): Promise<Certificate> {
    const certificate = this.certificateRepository.create(data);
    return this.certificateRepository.save(certificate);
  }

  async update(id: number, data: DeepPartial<Certificate>): Promise<Certificate> {
    const certificate = await this.findOne(id);
    Object.assign(certificate, data);
    return this.certificateRepository.save(certificate);
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    await this.certificateRepository.remove(certificate);
  }
} 