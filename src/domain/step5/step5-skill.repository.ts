import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../entities/skill.entity';

@Injectable()
export class Step5SkillRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(skill: Partial<Skill>): Promise<Skill> {
    const newSkill = this.skillRepository.create(skill);
    return await this.skillRepository.save(newSkill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find({
      relations: ['person'],
    });
  }

  async findById(id: number): Promise<Skill | null> {
    return await this.skillRepository.findOne({
      where: { id },
      relations: ['person'],
    });
  }

  async findByPersonId(personId: number): Promise<Skill[]> {
    return await this.skillRepository.find({
      where: { personId },
      relations: ['person'],
    });
  }

  async findBySkillTypeId(skillTypeId: number): Promise<Skill[]> {
    return await this.skillRepository.find({
      where: { skillTypeId },
      relations: ['person'],
    });
  }

  async findByPersonIdAndSkillTypeId(personId: number, skillTypeId: number): Promise<Skill[]> {
    return await this.skillRepository.find({
      where: { personId, skillTypeId },
      relations: ['person'],
    });
  }

  async update(id: number, skill: Partial<Skill>): Promise<Skill | null> {
    await this.skillRepository.update(id, skill);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.skillRepository.delete(id);
    return result.affected > 0;
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.skillRepository.count({ where: { id } });
    return count > 0;
  }

  async countByPersonId(personId: number): Promise<number> {
    return await this.skillRepository.count({ where: { personId } });
  }
} 