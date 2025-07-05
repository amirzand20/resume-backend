import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelInCourse } from '@/entities/personnel-in-course.entity';
import { SortParam } from '@/common/dto/request-params/sort-param';

@Injectable()
export class PersonnelInCourseRepository extends Repository<PersonnelInCourse> {
  constructor(
    @InjectRepository(PersonnelInCourse)
    private readonly repository: Repository<PersonnelInCourse>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAll(
    filter: any = {},
    sort: SortParam = { field: '', order: '' },
    page: number = 1,
    pageLimit: number = 10,
  ): Promise<[PersonnelInCourse[], number]> {
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

    return await queryBuilder.getManyAndCount();
  }
} 