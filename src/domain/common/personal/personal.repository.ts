import { Personal } from '@/entities/personal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SortParam } from '@/common/dto/request-params/sort-param';

export class PersonalRepository extends Repository<Personal> {
  constructor(
    @InjectRepository(Personal)
    private readonly repository: Repository<Personal>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('personal')
      .leftJoin('personal.organ', 'organ')
      .select([
        'personal.id',
        'personal.nationalNo',
        'personal.personalNo',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.organId',
        'organ.id',
        'organ.title',
      ])
      .where('personal.id = :id', { id: id });

    return query.getOne();
  }

  getAllWithFilter(
    filter: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
    organId,
    leftId,
    rightId,
  ) {
    const query = this.repository
      .createQueryBuilder('personal')
      .leftJoin('personal.organ', 'organ')
      .select([
        'personal.id',
        'personal.nationalNo',
        'personal.personalNo',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.organId',
        'organ.id',
        'organ.title',
        'organ.leftId',
        'organ.rightId',
      ])
      .where(
        "(:firstName::varchar is null or personal.firstName LIKE N'%" +
          filter.firstName +
          "%')",
        { firstName: filter.firstName },
      )
      .andWhere(
        "(:lastName::varchar is null or personal.lastName LIKE N'%" +
          filter.lastName +
          "%')",
        { lastName: filter.lastName },
      )
      .andWhere(
        "(:personalNo::varchar is null or personal.personalNo LIKE N'%" +
          filter.personalNo +
          "%')",
        { personalNo: filter.personalNo },
      )
      .andWhere(
        "(:nationalNo::varchar is null or personal.nationalNo LIKE N'%" +
          filter.nationalNo +
          "%')",
        { nationalNo: filter.nationalNo },
      )
      .andWhere(
        '( ' +
          organId +
          ' IS NULL OR organ.leftId between ' +
          leftId +
          ' and ' +
          rightId +
          ')',
      );

    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }
}
