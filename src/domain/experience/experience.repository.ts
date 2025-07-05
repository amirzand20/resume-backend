import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '@/entities/experience.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ExperienceRepository extends Repository<Experience> {
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async deleteById(id: number): Promise<Experience> {
    const experience = await this.repository.findOne({ where: { id } });
    if (experience) {
      await this.repository.delete(id);
    }
    return experience;
  }

  async getById(id: number): Promise<Experience> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Experience[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('experience');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('experience.personId = :personId', { personId: filter.personId });
    }
    if (filter.jobTitle) {
      queryBuilder.andWhere('experience.jobTitle LIKE :jobTitle', { jobTitle: `%${filter.jobTitle}%` });
    }
    if (filter.companyName) {
      queryBuilder.andWhere('experience.companyName LIKE :companyName', { companyName: `%${filter.companyName}%` });
    }
    if (filter.companyLocationId) {
      queryBuilder.andWhere('experience.companyLocationId = :companyLocationId', { companyLocationId: filter.companyLocationId });
    }
    if (filter.startDate) {
      queryBuilder.andWhere('experience.startDate >= :startDate', { startDate: filter.startDate });
    }
    if (filter.endDate) {
      queryBuilder.andWhere('experience.endDate <= :endDate', { endDate: filter.endDate });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('experience.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`experience.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('experience.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 