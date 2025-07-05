import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SkillRepository } from './skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { Skill } from '@/entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    private readonly repository: SkillRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(data: CreateSkillDto): Promise<ReadSkillDto> {
    const skill = await this.mapper.mapAsync(
      data,
      CreateSkillDto,
      Skill,
    );
    const saveResult = await this.repository.save(skill);
    return this.mapper.map(saveResult, Skill, ReadSkillDto);
  }

  async update(id: number, data: UpdateSkillDto): Promise<ReadSkillDto> {
    const skill = await this.repository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    
    const updatedSkill = await this.mapper.mapAsync(
      data,
      UpdateSkillDto,
      Skill,
    );
    Object.assign(skill, updatedSkill);
    
    const saveResult = await this.repository.save(skill);
    return this.mapper.map(saveResult, Skill, ReadSkillDto);
  }

  async deleteById(id: number): Promise<ReadSkillDto> {
    const skill = await this.repository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    await this.repository.remove(skill);
    return this.mapper.map(skill, Skill, ReadSkillDto);
  }

  async getById(id: number): Promise<ReadSkillDto> {
    const skill = await this.repository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapper.map(skill, Skill, ReadSkillDto);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadSkillDto>> {
    const [data, total] = await this.repository.getAll(filter, sort, page, pageLimit);
    return {
      total,
      data: this.mapper.mapArray(data, Skill, ReadSkillDto),
    };
  }
} 