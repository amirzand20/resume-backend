import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '@/entities/skill.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class SkillRepository extends Repository<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Skill[], number]> {
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

    return await queryBuilder.getManyAndCount();
  }
} 