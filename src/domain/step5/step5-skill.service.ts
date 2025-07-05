import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Step5SkillRepository } from './step5-skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/Person.entity';

@Injectable()
export class Step5SkillService {
  constructor(
    private readonly skillRepository: Step5SkillRepository,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(dto: CreateSkillDto): Promise<ReadSkillDto> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: dto.personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }

    // Check if skill already exists for this person and skill type
    const existingSkill = await this.skillRepository.findByPersonIdAndSkillTypeId(
      dto.personId,
      dto.skillTypeId,
    );
    if (existingSkill.length > 0) {
      throw new ConflictException('مهارت با این نوع برای این فرد قبلاً ثبت شده است');
    }

    // Set created date
    const skillData = {
      ...dto,
      createdDate: new Date(),
    };

    const skill = await this.skillRepository.create(skillData);
    return this.mapToReadDto(skill);
  }

  async findAll(): Promise<ReadSkillDto[]> {
    const skills = await this.skillRepository.findAll();
    return skills.map(skill => this.mapToReadDto(skill));
  }

  async findById(id: number): Promise<ReadSkillDto> {
    const skill = await this.skillRepository.findById(id);
    if (!skill) {
      throw new NotFoundException('مهارت مورد نظر یافت نشد');
    }
    return this.mapToReadDto(skill);
  }

  async findByPersonId(personId: number): Promise<ReadSkillDto[]> {
    // Check if person exists
    const person = await this.personRepository.findOne({ where: { id: personId } });
    if (!person) {
      throw new BadRequestException('فرد مورد نظر یافت نشد');
    }

    const skills = await this.skillRepository.findByPersonId(personId);
    return skills.map(skill => this.mapToReadDto(skill));
  }

  async update(id: number, dto: UpdateSkillDto): Promise<ReadSkillDto> {
    // Check if skill exists
    const existingSkill = await this.skillRepository.findById(id);
    if (!existingSkill) {
      throw new NotFoundException('مهارت مورد نظر یافت نشد');
    }

    // If personId is being updated, check if person exists
    if (dto.personId && dto.personId !== existingSkill.personId) {
      const person = await this.personRepository.findOne({ where: { id: dto.personId } });
      if (!person) {
        throw new BadRequestException('فرد مورد نظر یافت نشد');
      }
    }

    // If skillTypeId is being updated, check for duplicates
    if (dto.skillTypeId && dto.skillTypeId !== existingSkill.skillTypeId) {
      const duplicateSkill = await this.skillRepository.findByPersonIdAndSkillTypeId(
        dto.personId || existingSkill.personId,
        dto.skillTypeId,
      );
      if (duplicateSkill.length > 0) {
        throw new ConflictException('مهارت با این نوع برای این فرد قبلاً ثبت شده است');
      }
    }

    // Set updated date
    const updateData: any = {};
    if (dto.personId !== undefined) updateData.personId = dto.personId;
    if (dto.skillTypeId !== undefined) updateData.skillTypeId = dto.skillTypeId;
    if (dto.skillLevel !== undefined) updateData.skillLevel = dto.skillLevel;
    if (dto.createdMethodId !== undefined) updateData.createdMethodId = dto.createdMethodId;
    if (dto.tableId !== undefined) updateData.tableId = dto.tableId;
    if (dto.updatedBy !== undefined) updateData.updatedBy = dto.updatedBy;
    
    updateData.updatedDate = new Date();

    const updatedSkill = await this.skillRepository.update(id, updateData);
    if (!updatedSkill) {
      throw new NotFoundException('مهارت مورد نظر یافت نشد');
    }
    return this.mapToReadDto(updatedSkill);
  }

  async delete(id: number): Promise<{ message: string }> {
    // Check if skill exists
    const existingSkill = await this.skillRepository.findById(id);
    if (!existingSkill) {
      throw new NotFoundException('مهارت مورد نظر یافت نشد');
    }

    const deleted = await this.skillRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('مهارت مورد نظر یافت نشد');
    }

    return { message: 'مهارت با موفقیت حذف شد' };
  }

  private mapToReadDto(skill: any): ReadSkillDto {
    return {
      id: skill.id,
      personId: skill.personId,
      skillTypeId: skill.skillTypeId,
      skillLevel: skill.skillLevel,
      createdMethodId: skill.createdMethodId,
      tableId: skill.tableId,
      createdBy: skill.createdBy,
      createdDate: skill.createdDate,
      updatedBy: skill.updatedBy,
      updatedDate: skill.updatedDate,
    };
  }
} 