import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from '@/entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EducationRepository extends Repository<Education> {
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async deleteById(id: number): Promise<Education> {
    const education = await this.repository.findOne({ where: { id } });
    if (education) {
      await this.repository.delete(id);
    }
    return education;
  }

  async getById(id: number): Promise<Education> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[Education[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('education');

    // Apply filters
    if (filter.personId) {
      queryBuilder.andWhere('education.personId = :personId', { personId: filter.personId });
    }
    if (filter.gradeId) {
      queryBuilder.andWhere('education.gradeId = :gradeId', { gradeId: filter.gradeId });
    }
    if (filter.levelId) {
      queryBuilder.andWhere('education.levelId = :levelId', { levelId: filter.levelId });
    }
    if (filter.fieldId) {
      queryBuilder.andWhere('education.fieldId = :fieldId', { fieldId: filter.fieldId });
    }
    if (filter.instituteId) {
      queryBuilder.andWhere('education.instituteId = :instituteId', { instituteId: filter.instituteId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('education.isActive = :isActive', { isActive: filter.isActive });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('education.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`education.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('education.id', 'DESC');
    }

    // Apply pagination
    const skip = (page - 1) * pageLimit;
    queryBuilder.skip(skip).take(pageLimit);

    return await queryBuilder.getManyAndCount();
  }
} 