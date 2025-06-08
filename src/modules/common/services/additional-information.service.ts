import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { AdditionalInformation } from '../../../entity/additional-information.entity';

@Injectable()
export class AdditionalInformationService {
  constructor(
    @InjectRepository(AdditionalInformation)
    private readonly additionalInfoRepository: Repository<AdditionalInformation>,
  ) {}

  async findAll(): Promise<AdditionalInformation[]> {
    return this.additionalInfoRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<AdditionalInformation> {
    const additionalInfo = await this.additionalInfoRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!additionalInfo) {
      throw new NotFoundException(`AdditionalInformation with ID ${id} not found`);
    }
    
    return additionalInfo;
  }

  async findByPersonId(personId: number): Promise<AdditionalInformation[]> {
    return this.additionalInfoRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<AdditionalInformation>): Promise<AdditionalInformation> {
    const additionalInfo = this.additionalInfoRepository.create(data);
    return this.additionalInfoRepository.save(additionalInfo);
  }

  async update(id: number, data: DeepPartial<AdditionalInformation>): Promise<AdditionalInformation> {
    const additionalInfo = await this.findOne(id);
    Object.assign(additionalInfo, data);
    return this.additionalInfoRepository.save(additionalInfo);
  }

  async remove(id: number): Promise<void> {
    const additionalInfo = await this.findOne(id);
    await this.additionalInfoRepository.remove(additionalInfo);
  }
} 