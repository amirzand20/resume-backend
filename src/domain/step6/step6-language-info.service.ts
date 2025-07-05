import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Step6LanguageInfoRepository } from './step6-language-info.repository';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/Person.entity';

@Injectable()
export class Step6LanguageInfoService {
  constructor(
    private readonly languageInfoRepository: Step6LanguageInfoRepository,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(dto: CreateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: dto.personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }

    // Check if language already exists for this person
    const existing = await this.languageInfoRepository.findByPersonIdAndLanguageId(dto.personId, dto.languageId);
    if (existing.length > 0) {
      throw new ConflictException('اطلاعات زبان برای این فرد قبلاً ثبت شده است');
    }

    // Set created date
    const data = {
      ...dto,
      createdDate: new Date(),
    };
    const entity = await this.languageInfoRepository.create(data);
    return this.mapToReadDto(entity);
  }

  async findAll(): Promise<ReadLanguageInfoDto[]> {
    const list = await this.languageInfoRepository.findAll();
    return list.map(item => this.mapToReadDto(item));
  }

  async findById(id: number): Promise<ReadLanguageInfoDto> {
    const entity = await this.languageInfoRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('اطلاعات زبان مورد نظر یافت نشد');
    }
    return this.mapToReadDto(entity);
  }

  async findByPersonId(personId: number): Promise<ReadLanguageInfoDto[]> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }
    const list = await this.languageInfoRepository.findByPersonId(personId);
    return list.map(item => this.mapToReadDto(item));
  }

  async update(id: number, dto: UpdateLanguageInfoDto): Promise<ReadLanguageInfoDto> {
    // Check if exists
    const existing = await this.languageInfoRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('اطلاعات زبان مورد نظر یافت نشد');
    }
    // If personId is being updated, check if person exists
    if (dto.personId && dto.personId !== existing.personId) {
      const person = await this.personRepository.findOne({ where: { id: dto.personId } });
      if (!person) {
        throw new BadRequestException('فرد مورد نظر یافت نشد');
      }
    }
    // If languageId is being updated, check for duplicates
    if (dto.languageId && dto.languageId !== existing.languageId) {
      const duplicate = await this.languageInfoRepository.findByPersonIdAndLanguageId(
        dto.personId || existing.personId,
        dto.languageId,
      );
      if (duplicate.length > 0) {
        throw new ConflictException('اطلاعات زبان برای این فرد قبلاً ثبت شده است');
      }
    }
    // Set updated date
    const updateData: any = {};
    if (dto.personId !== undefined) updateData.personId = dto.personId;
    if (dto.languageId !== undefined) updateData.languageId = dto.languageId;
    if (dto.readingLevel !== undefined) updateData.readingLevel = dto.readingLevel;
    if (dto.writingLevel !== undefined) updateData.writingLevel = dto.writingLevel;
    if (dto.speakingLevel !== undefined) updateData.speakingLevel = dto.speakingLevel;
    if (dto.listeningLevel !== undefined) updateData.listeningLevel = dto.listeningLevel;
    if (dto.createdMethodId !== undefined) updateData.createdMethodId = dto.createdMethodId;
    if (dto.tableId !== undefined) updateData.tableId = dto.tableId;
    if (dto.updatedBy !== undefined) updateData.updatedBy = dto.updatedBy;
    updateData.updatedDate = new Date();
    const updated = await this.languageInfoRepository.update(id, updateData);
    if (!updated) {
      throw new NotFoundException('اطلاعات زبان مورد نظر یافت نشد');
    }
    return this.mapToReadDto(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    // Check if exists
    const existing = await this.languageInfoRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('اطلاعات زبان مورد نظر یافت نشد');
    }
    const deleted = await this.languageInfoRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('اطلاعات زبان مورد نظر یافت نشد');
    }
    return { message: 'اطلاعات زبان با موفقیت حذف شد' };
  }

  private mapToReadDto(entity: any): ReadLanguageInfoDto {
    return {
      id: entity.id,
      personId: entity.personId,
      languageId: entity.languageId,
      readingLevel: entity.readingLevel,
      writingLevel: entity.writingLevel,
      speakingLevel: entity.speakingLevel,
      listeningLevel: entity.listeningLevel,
      createdMethodId: entity.createdMethodId,
      tableId: entity.tableId,
      createdBy: entity.createdBy,
      createdDate: entity.createdDate,
      updatedBy: entity.updatedBy,
      updatedDate: entity.updatedDate,
    };
  }
} 