import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '@/entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class SkillRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async create(data: CreateSkillDto): Promise<Skill> {
    const skill = this.repository.create(data);
    return await this.repository.save(skill);
  }

  async update(id: number, data: UpdateSkillDto): Promise<Skill> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<Skill> {
    const skill = await this.repository.findOne({ where: { id } });
    if (skill) {
      await this.repository.delete(id);
    }
    return skill;
  }

  async getById(id: number): Promise<Skill> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadSkillDto>> {
    const queryBuilder = this.repository.createQueryBuilder('skill');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('skill.personId = :personId', { personId: filter.personId });
    }
    if (filter.skillId) {
      queryBuilder.andWhere('skill.skillId = :skillId', { skillId: filter.skillId });
    }
    if (filter.levelId) {
      queryBuilder.andWhere('skill.levelId = :levelId', { levelId: filter.levelId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('skill.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`skill.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('skill.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(skill: Skill): ReadSkillDto {
    return {
      id: skill.id,
      personId: skill.personId,
      skillId: skill.skillId,
      levelId: skill.levelId,
      tableId: skill.tableId,
      createdMethodId: skill.createdMethodId,
      createdDate: skill.createdDate,
      modifiedDate: skill.updatedDate,
      createdBy: parseInt(skill.createdBy),
      modifiedBy: skill.updatedBy ? parseInt(skill.updatedBy) : 0,
    };
  }
} 