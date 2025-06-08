import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { LanguageInfo } from '../../../entity/language-info.entity';

@Injectable()
export class LanguageInfoService {
  constructor(
    @InjectRepository(LanguageInfo)
    private readonly languageInfoRepository: Repository<LanguageInfo>,
  ) {}

  async findAll(): Promise<LanguageInfo[]> {
    return this.languageInfoRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<LanguageInfo> {
    const languageInfo = await this.languageInfoRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!languageInfo) {
      throw new NotFoundException(`LanguageInfo with ID ${id} not found`);
    }
    
    return languageInfo;
  }

  async findByPersonId(personId: number): Promise<LanguageInfo[]> {
    return this.languageInfoRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<LanguageInfo>): Promise<LanguageInfo> {
    const languageInfo = this.languageInfoRepository.create(data);
    return this.languageInfoRepository.save(languageInfo);
  }

  async update(id: number, data: DeepPartial<LanguageInfo>): Promise<LanguageInfo> {
    const languageInfo = await this.findOne(id);
    Object.assign(languageInfo, data);
    return this.languageInfoRepository.save(languageInfo);
  }

  async remove(id: number): Promise<void> {
    const languageInfo = await this.findOne(id);
    await this.languageInfoRepository.remove(languageInfo);
  }
} 