import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ContactInfo } from '../../../entity/contact-info.entity';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async findAll(): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<ContactInfo> {
    const contactInfo = await this.contactInfoRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!contactInfo) {
      throw new NotFoundException(`ContactInfo with ID ${id} not found`);
    }
    
    return contactInfo;
  }

  async findByPersonId(personId: number): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<ContactInfo>): Promise<ContactInfo> {
    const contactInfo = this.contactInfoRepository.create(data);
    return this.contactInfoRepository.save(contactInfo);
  }

  async update(id: number, data: DeepPartial<ContactInfo>): Promise<ContactInfo> {
    const contactInfo = await this.findOne(id);
    Object.assign(contactInfo, data);
    return this.contactInfoRepository.save(contactInfo);
  }

  async remove(id: number): Promise<void> {
    const contactInfo = await this.findOne(id);
    await this.contactInfoRepository.remove(contactInfo);
  }
} 