import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Experience } from '../../../entity/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    
    return experience;
  }

  async findByPersonId(personId: number): Promise<Experience[]> {
    return this.experienceRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<Experience>): Promise<Experience> {
    const experience = this.experienceRepository.create(data);
    return this.experienceRepository.save(experience);
  }

  async update(id: number, data: DeepPartial<Experience>): Promise<Experience> {
    const experience = await this.findOne(id);
    Object.assign(experience, data);
    return this.experienceRepository.save(experience);
  }

  async remove(id: number): Promise<void> {
    const experience = await this.findOne(id);
    await this.experienceRepository.remove(experience);
  }
} 