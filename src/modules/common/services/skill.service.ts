import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Skill } from '../../../entity/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find({ relations: ['person'] });
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    
    return skill;
  }

  async findByPersonId(personId: number): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async create(data: DeepPartial<Skill>): Promise<Skill> {
    const skill = this.skillRepository.create(data);
    return this.skillRepository.save(skill);
  }

  async update(id: number, data: DeepPartial<Skill>): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, data);
    return this.skillRepository.save(skill);
  }

  async remove(id: number): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepository.remove(skill);
  }
} 