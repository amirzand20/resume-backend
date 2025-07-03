import { SortParam } from '@/common/dto/request-params/sort-param';
import '@/common/typeorm/select-query-builder-extentions';
import { Exam } from '@/entities/exam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamTypeEnum } from '@/common/enums/exam-type.enum';

export class ExamRepository extends Repository<Exam> {
  constructor(
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.examType', 'examType')
      .leftJoinAndSelect('exam.examHold', 'examHold')
      .leftJoinAndSelect('exam.examScope', 'examScope')
      //   .select([
      //     'exam.id',
      //     'exam.examTitle',
      //     'exam.duration',
      //     'exam.fromDate',
      //     'exam.toDate',
      //     'exam.seriesCount',
      //     'exam.questionCount',
      //     'exam.status',
      //     'exam.maxScore',
      //     'exam.personAssignStatus',
      //     'exam.canPrintCart',
      //     'exam.hasNegativeScore',
      //     'exam.description',
      //     'exam.examScopeId',
      //     'examType.id',
      //     'examType.name',
      //     'examHold.id',
      //     'examHold.name',
      //     'examScope.id',
      //     'examScope.name',
      //     'exam.examQuestionType',
      //   ])
      .where('exam.id = :id', { id: id });

    return query.getOne();
  }

  getAll(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.examType', 'examType')
      .leftJoinAndSelect('exam.examHold', 'examHold')
      .leftJoinAndSelect('exam.examScope', 'examScope')
      .where('(EXTRACT(EPOCH FROM (exam.toDate - NOW())) / 60) > 0', {
        now: new Date(),
      });

    if (filterParam.examTypeId) {
      query.andWhere('examType.examTypeId = :examTypeId', {
        examTypeId: filterParam.examTypeId,
      });
    }
    if (filterParam.examHoldId) {
      query.andWhere('examType.examHoldId = :examHoldId', {
        examHoldId: filterParam.examHoldId,
      });
    }
    if (filterParam.examHoldId) {
      query.andWhere('examType.examScopeId = :examScopeId', {
        examScopeId: filterParam.examScopeId,
      });
    }
    if (filterParam.examTitle) {
      query.andWhere("exam.examTitle LIKE N'%:examTitle%'", {
        examTitle: filterParam.examTitle,
      });
    }

    if (filterParam.fromDate) {
      query.andWhere('(exam.fromDate >= :fromDate)', {
        fromDate: new Date(new Date(filterParam.fromDate).setHours(0, 0, 0, 0)),
      });
    }

    if (filterParam.toDate) {
      query.andWhere('(exam.toDate <= :toDate)', {
        toDate: new Date(new Date(filterParam.toDate).setHours(23, 59, 59, 59)),
      });
    }
    query.orderBy('exam.modifiedDate', 'DESC');
    query.addSort(sortParam).addPagination(pageLimit, page);
    return query.getManyAndCount();
  }

  getAllExam(sortParam: SortParam, page: number, pageLimit: number) {
    const query = this.repository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.examType', 'examType')
      .leftJoinAndSelect('exam.examHold', 'examHold')
      .leftJoinAndSelect('exam.examScope', 'examScope')
      .where('(EXTRACT(EPOCH FROM (exam.toDate - NOW())) / 60) > 0', {
        now: new Date(),
      })
      .orderBy('exam.id', 'DESC');

    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  getAllExamAssign(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('exam')
      .innerJoin('exam.examType', 'examType')
      .innerJoin('exam.examHold', 'examHold')
      .leftJoin('exam.examScope', 'examScope')
      .select([
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.seriesCount',
        'exam.questionCount',
        'exam.status',
        'exam.personAssignStatus',
        'exam.canPrintCart',
        'exam.hasNegativeScore',
        'exam.description',
        'exam.examScopeId',
        'examType.id',
        'examType.name',
        'examHold.id',
        'examHold.name',
        'examScope.id',
        'examScope.name',
      ])
      .where(
        '(:flagExamType::bool IS NULL OR exam.examTypeId IN (' +
          (filterParam.examTypeId != null
            ? filterParam.examTypeId.split(',')
            : null) +
          '))',
        {
          flagExamType: filterParam.examTypeId
            ? filterParam.examTypeId?.length > 0
            : null,

          examTypeId: filterParam.examTypeId,
        },
      )
      .andWhere(
        '(:flagExamHold::bool IS NULL OR exam.examHoldId IN (' +
          (filterParam.examHoldId != null
            ? filterParam.examHoldId.split(',')
            : null) +
          '))',
        {
          flagExamHold: filterParam.examHoldId
            ? filterParam.examHoldId?.length > 0
            : null,

          examHoldId: filterParam.examHoldId,
        },
      )
      .andWhere('(EXTRACT(EPOCH FROM (exam.toDate - NOW())) / 60) > 0', {
        now: new Date(),
      });
    if (filterParam.fromDate) {
      query.andWhere('(exam.fromDate >= :fromDate)', {
        fromDate: new Date(new Date(filterParam.fromDate).setHours(0, 0, 0, 0)),
      });
    }

    if (filterParam.toDate) {
      query.andWhere('(exam.toDate <= :toDate)', {
        toDate: new Date(new Date(filterParam.toDate).setHours(23, 59, 59, 59)),
      });
    }
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  getPublicExam(sortParam: SortParam, page: number, pageLimit: number) {
    const query = this.repository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.examType', 'examType')
      .leftJoinAndSelect('exam.examHold', 'examHold')
      .leftJoinAndSelect('exam.examScope', 'examScope')
      //   .select([
      //     'exam.id',
      //     'exam.examTitle',
      //     'exam.duration',
      //     'exam.fromDate',
      //     'exam.toDate',
      //     'exam.seriesCount',
      //     'exam.questionCount',
      //     'exam.status',
      //     'exam.personAssignStatus',
      //     'exam.canPrintCart',
      //     'exam.hasNegativeScore',
      //     'exam.description',
      //     'exam.examScopeId',
      //     'examType.id',
      //     'examType.name',
      //     'examHold.id',
      //     'examHold.name',
      //     'examScope.id',
      //     'examScope.name',
      //   ])
      .where('exam.examTypeId = :examTypeId', {
        examTypeId: ExamTypeEnum.public,
      });
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  async checkExamTime(user): Promise<any> {
    const userId = user.id;
    const query = await this.repository
      .createQueryBuilder('exam')
      .innerJoin('exam.examUser', 'examUser')
      .select([
        'exam.id',
        'exam.duration',
        'examUser.id',
        'examUser.examStartTime',
      ])
      .where('examUser.id = userId', { userId });
    return await query.getOne();
  }
}
