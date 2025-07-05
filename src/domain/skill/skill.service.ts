import { Injectable, NotFoundException } from '@nestjs/common';
import { SkillRepository } from './skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ReadSkillDto } from './dto/read-skill.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  async create(data: CreateSkillDto): Promise<ReadSkillDto> {
    const skill = await this.repository.create(data);
    return this.mapToReadDto(skill);
  }

  async update(id: number, data: UpdateSkillDto): Promise<ReadSkillDto> {
    const skill = await this.repository.update(id, data);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToReadDto(skill);
  }

  async deleteById(id: number): Promise<ReadSkillDto> {
    const skill = await this.repository.deleteById(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToReadDto(skill);
  }

  async getById(id: number): Promise<ReadSkillDto> {
    const skill = await this.repository.getById(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToReadDto(skill);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadSkillDto>> {
    return await this.repository.getAll(filter, sort, page, pageLimit);
  }

  private mapToReadDto(skill: any): ReadSkillDto {
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