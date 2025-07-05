import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageInfo } from '../../entities/language-info.entity';

@Injectable()
export class Step6LanguageInfoRepository {
  constructor(
    @InjectRepository(LanguageInfo)
    private readonly languageInfoRepository: Repository<LanguageInfo>,
  ) {}

  async create(languageInfo: Partial<LanguageInfo>): Promise<LanguageInfo> {
    const newLanguageInfo = this.languageInfoRepository.create(languageInfo);
    return await this.languageInfoRepository.save(newLanguageInfo);
  }

  async findAll(): Promise<LanguageInfo[]> {
    return await this.languageInfoRepository.find({ relations: ['person'] });
  }

  async findById(id: number): Promise<LanguageInfo | null> {
    return await this.languageInfoRepository.findOne({ where: { id }, relations: ['person'] });
  }

  async findByPersonId(personId: number): Promise<LanguageInfo[]> {
    return await this.languageInfoRepository.find({ where: { personId }, relations: ['person'] });
  }

  async findByPersonIdAndLanguageId(personId: number, languageId: number): Promise<LanguageInfo[]> {
    return await this.languageInfoRepository.find({ where: { personId, languageId }, relations: ['person'] });
  }

  async update(id: number, languageInfo: Partial<LanguageInfo>): Promise<LanguageInfo | null> {
    await this.languageInfoRepository.update(id, languageInfo);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.languageInfoRepository.delete(id);
    return result.affected > 0;
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.languageInfoRepository.count({ where: { id } });
    return count > 0;
  }

  async countByPersonId(personId: number): Promise<number> {
    return await this.languageInfoRepository.count({ where: { personId } });
  }
} 