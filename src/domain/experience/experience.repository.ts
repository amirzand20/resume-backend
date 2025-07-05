import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '@/entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class ExperienceRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async create(data: CreateExperienceDto): Promise<Experience> {
    const experience = this.repository.create(data);
    return await this.repository.save(experience);
  }

  async update(id: number, data: UpdateExperienceDto): Promise<Experience> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
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
  ): Promise<QueryListResultDto<ReadExperienceDto>> {
    const queryBuilder = this.repository.createQueryBuilder('experience');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('experience.personId = :personId', { personId: filter.personId });
    }
    if (filter.companyLocationId) {
      queryBuilder.andWhere('experience.companyLocationId = :companyLocationId', { companyLocationId: filter.companyLocationId });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('experience.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }
    if (filter.jobTitle) {
      queryBuilder.andWhere('experience.jobTitle LIKE :jobTitle', { jobTitle: `%${filter.jobTitle}%` });
    }
    if (filter.companyName) {
      queryBuilder.andWhere('experience.companyName LIKE :companyName', { companyName: `%${filter.companyName}%` });
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(experience: Experience): ReadExperienceDto {
    return {
      id: experience.id,
      personId: experience.personId,
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      companyLocationId: experience.companyLocationId,
      startDate: experience.startDate,
      endDate: experience.endDate,
      tableId: experience.tableId,
      createdMethodId: experience.createdMethodId,
      createdDate: experience.createdDate,
      modifiedDate: experience.updatedDate,
      createdBy: parseInt(experience.createdBy),
      modifiedBy: experience.updatedBy ? parseInt(experience.updatedBy) : 0,
    };
  }
} 