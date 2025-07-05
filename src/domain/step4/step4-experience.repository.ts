import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../../entities/experience.entity';

@Injectable()
export class Step4ExperienceRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async create(experienceData: Partial<Experience>): Promise<Experience> {
    const experience = this.experienceRepository.create(experienceData);
    return await this.experienceRepository.save(experience);
  }

  async findById(id: number): Promise<Experience | null> {
    return await this.experienceRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Experience[]> {
    return await this.experienceRepository.find();
  }

  async update(id: number, experienceData: Partial<Experience>): Promise<Experience | null> {
    await this.experienceRepository.update(id, experienceData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.experienceRepository.delete(id);
    return result.affected > 0;
  }

  async findByPersonId(personId: number): Promise<Experience[]> {
    return await this.experienceRepository.find({ where: { personId } });
  }

  async findByJobTitle(jobTitle: string, excludeId?: number): Promise<Experience | null> {
    const query = this.experienceRepository.createQueryBuilder('experience')
      .where('experience.jobTitle = :jobTitle', { jobTitle });
    if (excludeId) {
      query.andWhere('experience.id != :excludeId', { excludeId });
    }
    return await query.getOne();
  }
} 