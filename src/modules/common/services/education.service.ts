import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Education } from '../../../entity/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<Education> {
    const education = await this.educationRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    
    return education;
  }

  async findByPersonId(personId: number): Promise<Education[]> {
    return this.educationRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<Education>): Promise<Education> {
    const education = this.educationRepository.create(data);
    return this.educationRepository.save(education);
  }

  async update(id: number, data: DeepPartial<Education>): Promise<Education> {
    const education = await this.findOne(id);
    Object.assign(education, data);
    return this.educationRepository.save(education);
  }

  async remove(id: number): Promise<void> {
    const education = await this.findOne(id);
    await this.educationRepository.remove(education);
  }
} 