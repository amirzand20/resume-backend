import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from '@/entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ReadEducationDto } from './dto/read-education.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class EducationRepository {
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async create(data: CreateEducationDto): Promise<Education> {
    const education = this.repository.create(data);
    return await this.repository.save(education);
  }

  async update(id: number, data: UpdateEducationDto): Promise<Education> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
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
  ): Promise<QueryListResultDto<ReadEducationDto>> {
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
    if (filter.createdMethodId) {
      queryBuilder.andWhere('education.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }
    if (filter.isActive !== undefined) {
      queryBuilder.andWhere('education.isActive = :isActive', { isActive: filter.isActive });
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

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map(item => this.mapToReadDto(item)),
      total,
    };
  }

  private mapToReadDto(education: Education): ReadEducationDto {
    return {
      id: education.id,
      personId: education.personId,
      gradeId: education.gradeId,
      levelId: education.levelId,
      fieldId: education.fieldId,
      instituteId: education.instituteId,
      graduationDate: education.graduationDate,
      adjusted: education.adjusted,
      createdMethodId: education.createdMethodId,
      tableId: education.tableId,
      isActive: education.isActive,
      createdDate: education.createdDate,
      modifiedDate: education.updatedDate,
      createdBy: parseInt(education.createdBy),
      modifiedBy: education.updatedBy ? parseInt(education.updatedBy) : 0,
    };
  }
} 