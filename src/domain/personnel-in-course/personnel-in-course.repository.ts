import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelInCourse } from '@/entities/personnel-in-course.entity';
import { CreatePersonnelInCourseDto } from './dto/create-personnel-in-course.dto';
import { UpdatePersonnelInCourseDto } from './dto/update-personnel-in-course.dto';
import { ReadPersonnelInCourseDto } from './dto/read-personnel-in-course.dto';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PersonnelInCourseRepository {
  constructor(
    @InjectRepository(PersonnelInCourse)
    private readonly repository: Repository<PersonnelInCourse>,
  ) {}

  async create(data: CreatePersonnelInCourseDto): Promise<PersonnelInCourse> {
    const personnelInCourse = this.repository.create(data);
    return await this.repository.save(personnelInCourse);
  }

  async update(id: number, data: UpdatePersonnelInCourseDto): Promise<PersonnelInCourse> {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<PersonnelInCourse> {
    const personnelInCourse = await this.repository.findOne({ where: { id } });
    if (personnelInCourse) {
      await this.repository.delete(id);
    }
    return personnelInCourse;
  }

  async getById(id: number): Promise<PersonnelInCourse> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<QueryListResultDto<ReadPersonnelInCourseDto>> {
    const queryBuilder = this.repository.createQueryBuilder('personnelInCourse');

    // Apply filters
    if (filter.applicantId) {
      queryBuilder.andWhere('personnelInCourse.applicantId = :applicantId', { applicantId: filter.applicantId });
    }
    if (filter.courseFieldId) {
      queryBuilder.andWhere('personnelInCourse.courseFieldId = :courseFieldId', { courseFieldId: filter.courseFieldId });
    }
    if (filter.volunteerCode) {
      queryBuilder.andWhere('personnelInCourse.volunteerCode = :volunteerCode', { volunteerCode: filter.volunteerCode });
    }
    if (filter.createdMethodId) {
      queryBuilder.andWhere('personnelInCourse.createdMethodId = :createdMethodId', { createdMethodId: filter.createdMethodId });
    }

    // Apply sorting
    if (sort.field && sort.order) {
      queryBuilder.orderBy(`personnelInCourse.${sort.field}`, sort.order.toUpperCase() as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('personnelInCourse.id', 'DESC');
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

  private mapToReadDto(personnelInCourse: PersonnelInCourse): ReadPersonnelInCourseDto {
    return {
      id: personnelInCourse.id,
      courseFieldId: personnelInCourse.courseFieldId,
      applicantId: personnelInCourse.applicantId,
      volunteerCode: personnelInCourse.volunteerCode,
      tableId: personnelInCourse.tableId,
      createdMethodId: personnelInCourse.createdMethodId,
      createdDate: personnelInCourse.createdDate,
      modifiedDate: personnelInCourse.updatedDate,
      createdBy: parseInt(personnelInCourse.createdBy),
      modifiedBy: personnelInCourse.updatedBy ? parseInt(personnelInCourse.updatedBy) : 0,
    };
  }
} 