import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from '../../entities/contact-info.entity';

@Injectable()
export class Step2Repository {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(contactInfoData: Partial<ContactInfo>): Promise<ContactInfo> {
    const contactInfo = this.contactInfoRepository.create(contactInfoData);
    return await this.contactInfoRepository.save(contactInfo);
  }

  async findById(id: number): Promise<ContactInfo | null> {
    return await this.contactInfoRepository.findOne({
      where: { id },
      relations: ['person']
    });
  }

  async findByPersonId(personId: number): Promise<ContactInfo | null> {
    return await this.contactInfoRepository.findOne({
      where: { personId },
      relations: ['person']
    });
  }

  async findAll(): Promise<ContactInfo[]> {
    return await this.contactInfoRepository.find({
      relations: ['person']
    });
  }

  async update(id: number, contactInfoData: Partial<ContactInfo>): Promise<ContactInfo | null> {
    await this.contactInfoRepository.update(id, contactInfoData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.contactInfoRepository.delete(id);
    return result.affected > 0;
  }

  async findByMobileNumber(mobileNumber: string, excludeId?: number): Promise<ContactInfo | null> {
    const query = this.contactInfoRepository.createQueryBuilder('contactInfo')
      .where('contactInfo.mobileNumber = :mobileNumber', { mobileNumber });
    
    if (excludeId) {
      query.andWhere('contactInfo.id != :excludeId', { excludeId });
    }
    
    return await query.getOne();
  }

  async findByEmail(emailAddress: string, excludeId?: number): Promise<ContactInfo | null> {
    const query = this.contactInfoRepository.createQueryBuilder('contactInfo')
      .where('contactInfo.emailAddress = :emailAddress', { emailAddress });
    
    if (excludeId) {
      query.andWhere('contactInfo.id != :excludeId', { excludeId });
    }
    
    return await query.getOne();
  }

  async findActiveByPersonId(personId: number): Promise<ContactInfo | null> {
    return await this.contactInfoRepository.findOne({
      where: { personId, isActive: true },
      relations: ['person']
    });
  }
} 