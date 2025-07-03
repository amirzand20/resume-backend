import { ExamPerson } from '@/entities/exam-person.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { ExamScopeEnum } from '@/common/enums/exam-scope.enum';

export class ExamPersonRepository extends Repository<ExamPerson> {
  constructor(
    @InjectRepository(ExamPerson)
    private readonly repository: Repository<ExamPerson>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getById(id: number) {
    return await this.select().where('examPerson.id = :id', { id }).getOne();
  }

  async getList(page: number, pageLimit: number) {
    return await this.select().addPagination(page, pageLimit).getMany();
  }
  async descriptiveExamQuestion(examPerson: number) {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .innerJoinAndSelect('exam.question', 'question');
  }

  private select(): SelectQueryBuilder<ExamPerson> {
    return this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .innerJoin('examPerson.personal', 'personal')
      .innerJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .select([
        'examPerson.id',
        'examPerson.volunteerInfoId',
        'examPerson.personalId',
        'examPerson.examStartTime',
        'examPerson.examEndTime',
        'examPerson.examId',
        'examPerson.isPresent',
        'examPerson.score',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.examTypeId',
        'exam.examHoldId',
        'personal.id',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.nationalNo',
        'personal.personalNo',
        'volunteerInfo.id',
        'volunteerInfo.employmentSpectrumId',
        'volunteerInfo.employmentTypeId',
        'volunteerInfo.forceId',
        'volunteerInfo.nationalNo',
        'volunteerInfo.firstName',
        'volunteerInfo.lastName',
        'volunteerInfo.nickName',
        'volunteerInfo.previousLastName',
        'volunteerInfo.genderId',
        'volunteerInfo.fatherName',
        'volunteerInfo.telephoneNumber',
        'volunteerInfo.mobileNumber',
        'volunteerInfo.idNo',
        'volunteerInfo.idSerial',
        'volunteerInfo.idSeri',
        'volunteerInfo.birthPlaceId',
        'volunteerInfo.birthDate',
        'volunteerInfo.locationId',
        'volunteerInfo.address',
        'volunteerInfo.postalCode',
        'volunteerInfo.educationLevelId',
        'volunteerInfo.educationFieldId',
        'volunteerInfo.educationGradeId',
        'volunteerInfo.applyPlaceId',
        'volunteerInfo.issuePlaceId',
        'volunteerInfo.issueDate',
        'volunteerInfo.marriageStatusId',
        'volunteerInfo.workingStatusId',
        'volunteerInfo.jobTitle',
        'volunteerInfo.physicalStatusId',
        'volunteerInfo.religionId',
        'volunteerInfo.nationalityId',
        'volunteerInfo.lastDegreeMean',
        'volunteerInfo.height',
        'volunteerInfo.weight',
        'volunteerInfo.childCount',
        'volunteerInfo.eyeColorId',
        'volunteerInfo.instituteId',
        'volunteerInfo.bloodGroupId',
        'volunteerInfo.dutyStatusId',
        'volunteerInfo.volunteerCode',
        'volunteerInfo.vaccination',
        'volunteerInfo.isInCommitteeEmdad',
        'volunteerInfo.isInBehzisti',
        'volunteerInfo.isElite',
        'volunteerInfo.isChampion',
        'volunteerInfo.isHafez',
        'volunteerInfo.basijStatusId',
        'volunteerInfo.basijDuration',
      ]);
  }

  findByVolunteerInfo(volunteerInfoId: number) {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .leftJoin('examPerson.personal', 'personal')
      .innerJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .select([
        'examPerson.id',
        'examPerson.volunteerInfoId',
        'examPerson.personalId',
        'examPerson.examStartTime',
        'examPerson.examEndTime',
        'examPerson.examId',
        'examPerson.isPresent',
        'examPerson.score',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.examTypeId',
        'exam.examHoldId',
        'personal.id',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.nationalNo',
        'personal.personalNo',
        'volunteerInfo.id',
        'volunteerInfo.employmentSpectrumId',
        'volunteerInfo.employmentTypeId',
        'volunteerInfo.forceId',
        'volunteerInfo.nationalNo',
        'volunteerInfo.firstName',
        'volunteerInfo.lastName',
        'volunteerInfo.nickName',
        'volunteerInfo.previousLastName',
        'volunteerInfo.genderId',
        'volunteerInfo.fatherName',
        'volunteerInfo.telephoneNumber',
        'volunteerInfo.mobileNumber',
        'volunteerInfo.idNo',
        'volunteerInfo.idSerial',
        'volunteerInfo.idSeri',
        'volunteerInfo.birthPlaceId',
        'volunteerInfo.birthDate',
        'volunteerInfo.locationId',
        'volunteerInfo.address',
        'volunteerInfo.postalCode',
        'volunteerInfo.educationLevelId',
        'volunteerInfo.educationFieldId',
        'volunteerInfo.educationGradeId',
        'volunteerInfo.applyPlaceId',
        'volunteerInfo.issuePlaceId',
        'volunteerInfo.issueDate',
        'volunteerInfo.marriageStatusId',
        'volunteerInfo.workingStatusId',
        'volunteerInfo.jobTitle',
        'volunteerInfo.physicalStatusId',
        'volunteerInfo.religionId',
        'volunteerInfo.nationalityId',
        'volunteerInfo.lastDegreeMean',
        'volunteerInfo.height',
        'volunteerInfo.weight',
        'volunteerInfo.childCount',
        'volunteerInfo.eyeColorId',
        'volunteerInfo.instituteId',
        'volunteerInfo.bloodGroupId',
        'volunteerInfo.dutyStatusId',
        'volunteerInfo.volunteerCode',
        'volunteerInfo.vaccination',
        'volunteerInfo.isInCommitteeEmdad',
        'volunteerInfo.isInBehzisti',
        'volunteerInfo.isElite',
        'volunteerInfo.isChampion',
        'volunteerInfo.isHafez',
        'volunteerInfo.basijStatusId',
        'volunteerInfo.basijDuration',
      ])
      .where('examPerson.volunteerInfoId = :volunteerInfoId', {
        volunteerInfoId: volunteerInfoId,
      });
    // .andWhere('examPerson.examEndTime IS NULL')
    // .andWhere('examPerson.score IS NULL');

    return query.getManyAndCount();
  }

  async getPersonsInExam(
    examId: number,
    filter: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<[ExamPerson[], number]> {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoinAndSelect('examPerson.exam', 'exam')
      .leftJoinAndSelect('examPerson.personal', 'personal')
      .leftJoinAndSelect('examPerson.volunteerInfo', 'volunteerInfo')

      .where('examPerson.examId = :examId', { examId: examId });

    if (filter?.ended) {
      query.andWhere('examPerson.examEndTime IS NOT NULL');
    }
    if (filter.validateRectify) {
      query.leftJoinAndSelect(
        'examPerson.answerSubmissions',
        'answerSubmissions',
      );
    }

    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  getSingleExamCardReport(examId: number, volunteerInfoId, personnelId) {
    let volunteerInfoIdsList: [] =
      volunteerInfoId === null || volunteerInfoId === undefined
        ? []
        : volunteerInfoId;
    let personnelInfoIdsList: [] =
      personnelId === null || personnelId === undefined ? [] : personnelId;
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .leftJoin('examPerson.personal', 'personal')
      .leftJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .select([
        'examPerson.id',
        'examPerson.volunteerInfoId',
        'examPerson.personalId',
        'examPerson.examStartTime',
        'examPerson.examEndTime',
        // 'examPerson.examPersonStatus',
        'examPerson.userName',
        'examPerson.password',
        'examPerson.examId',
        'examPerson.isPresent',
        // 'examPerson.score',
        'examPerson.questionSeries',
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
        'personal.id',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.nationalNo',
        'personal.personalNo',
        'personal.organId',
        'volunteerInfo.id',
        'volunteerInfo.employmentSpectrumId',
        'volunteerInfo.employmentTypeId',
        'volunteerInfo.forceId',
        'volunteerInfo.nationalNo',
        'volunteerInfo.firstName',
        'volunteerInfo.lastName',
        'volunteerInfo.nickName',
        'volunteerInfo.previousLastName',
        'volunteerInfo.genderId',
        'volunteerInfo.fatherName',
        'volunteerInfo.telephoneNumber',
        'volunteerInfo.mobileNumber',
        'volunteerInfo.idNo',
        'volunteerInfo.idSerial',
        'volunteerInfo.idSeri',
        'volunteerInfo.birthPlaceId',
        'volunteerInfo.birthDate',
        'volunteerInfo.locationId',
        'volunteerInfo.address',
        'volunteerInfo.postalCode',
        'volunteerInfo.educationLevelId',
        'volunteerInfo.educationFieldId',
        'volunteerInfo.educationGradeId',
        'volunteerInfo.applyPlaceId',
        'volunteerInfo.issuePlaceId',
        'volunteerInfo.issueDate',
        'volunteerInfo.marriageStatusId',
        'volunteerInfo.workingStatusId',
        'volunteerInfo.jobTitle',
        'volunteerInfo.physicalStatusId',
        'volunteerInfo.religionId',
        'volunteerInfo.nationalityId',
        'volunteerInfo.lastDegreeMean',
        'volunteerInfo.height',
        'volunteerInfo.weight',
        'volunteerInfo.childCount',
        'volunteerInfo.eyeColorId',
        'volunteerInfo.instituteId',
        'volunteerInfo.bloodGroupId',
        'volunteerInfo.dutyStatusId',
        'volunteerInfo.volunteerCode',
        'volunteerInfo.vaccination',
        'volunteerInfo.isInCommitteeEmdad',
        'volunteerInfo.isInBehzisti',
        'volunteerInfo.isElite',
        'volunteerInfo.isChampion',
        'volunteerInfo.isHafez',
        'volunteerInfo.basijStatusId',
        'volunteerInfo.basijDuration',
      ])
      // .where('examPerson.volunteerInfoId in :volunteerInfoId', {
      //   volunteerInfoId: volunteerInfoId,
      // })
      .where('examPerson.examId = :examId', {
        examId: examId,
      });
    if (volunteerInfoIdsList.length !== 0) {
      query.andWhere(
        '(examPerson.volunteerInfoId IN (' + volunteerInfoIdsList + '))',
      );
    }
    if (personnelInfoIdsList.length !== 0) {
      query.andWhere('(personal.id IN (' + personnelInfoIdsList + '))');
    }

    return query.getManyAndCount();
  }

  getMultipleExamCardReport(examId: number) {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .leftJoin('examPerson.personal', 'personal')
      .leftJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .select([
        'examPerson.id',
        'examPerson.volunteerInfoId',
        'examPerson.personalId',
        'examPerson.examStartTime',
        'examPerson.examEndTime',
        // 'examPerson.examPersonStatus',
        'examPerson.userName',
        'examPerson.password',
        'examPerson.examId',
        'examPerson.isPresent',
        'examPerson.score',
        'examPerson.questionSeries',
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
        'personal.id',
        'personal.firstName',
        'personal.lastName',
        'personal.fatherName',
        'personal.nationalNo',
        'personal.personalNo',
        'personal.organId',
        'volunteerInfo.id',
        'volunteerInfo.employmentSpectrumId',
        'volunteerInfo.employmentTypeId',
        'volunteerInfo.forceId',
        'volunteerInfo.nationalNo',
        'volunteerInfo.firstName',
        'volunteerInfo.lastName',
        'volunteerInfo.nickName',
        'volunteerInfo.previousLastName',
        'volunteerInfo.genderId',
        'volunteerInfo.fatherName',
        'volunteerInfo.telephoneNumber',
        'volunteerInfo.mobileNumber',
        'volunteerInfo.idNo',
        'volunteerInfo.idSerial',
        'volunteerInfo.idSeri',
        'volunteerInfo.birthPlaceId',
        'volunteerInfo.birthDate',
        'volunteerInfo.locationId',
        'volunteerInfo.address',
        'volunteerInfo.postalCode',
        'volunteerInfo.educationLevelId',
        'volunteerInfo.educationFieldId',
        'volunteerInfo.educationGradeId',
        'volunteerInfo.applyPlaceId',
        'volunteerInfo.issuePlaceId',
        'volunteerInfo.issueDate',
        'volunteerInfo.marriageStatusId',
        'volunteerInfo.workingStatusId',
        'volunteerInfo.jobTitle',
        'volunteerInfo.physicalStatusId',
        'volunteerInfo.religionId',
        'volunteerInfo.nationalityId',
        'volunteerInfo.lastDegreeMean',
        'volunteerInfo.height',
        'volunteerInfo.weight',
        'volunteerInfo.childCount',
        'volunteerInfo.eyeColorId',
        'volunteerInfo.instituteId',
        'volunteerInfo.bloodGroupId',
        'volunteerInfo.dutyStatusId',
        'volunteerInfo.volunteerCode',
        'volunteerInfo.vaccination',
        'volunteerInfo.isInCommitteeEmdad',
        'volunteerInfo.isInBehzisti',
        'volunteerInfo.isElite',
        'volunteerInfo.isChampion',
        'volunteerInfo.isHafez',
        'volunteerInfo.basijStatusId',
        'volunteerInfo.basijDuration',
      ])
      .where('examPerson.examId = :examId', {
        examId: examId,
      });

    return query.getManyAndCount();
  }

  getExamByvoluntreeInfoId(volunteerInfoId: number, examId: number) {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      // .leftJoin('examPerson.personal', 'personal')
      // .innerJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .select([
        'examPerson.id',
        'examPerson.volunteerInfoId',
        'examPerson.personalId',
        'examPerson.examStartTime',
        'examPerson.examEndTime',
        'examPerson.examId',
        'examPerson.isPresent',
        'examPerson.score',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.examTypeId',
        'exam.examHoldId',
        'exam.status',
      ])
      .where('examPerson.volunteerInfoId = :volunteerInfoId', {
        volunteerInfoId: volunteerInfoId,
      })
      .andWhere('examPerson.examId = :examId', {
        examId: examId,
      })
      .andWhere({ examEndTime: IsNull() });
    return query.getOne();
  }

  async getByUserAndPassword(username: string, password: string) {
    const query = this.repository
      .createQueryBuilder('examPerson')
      .leftJoin('examPerson.volunteerInfo', 'volunteerInfo')
      .leftJoin('examPerson.exam', 'exam')
      .select([
        'examPerson.id as "examPersonId"',
        'examPerson.userName as "userName"',
        'exam.id as "examId"',
        'exam.examTitle as "examTitle"',
        'exam.questionCount as "questionCount"',
        'exam.hasNegativeScore as "hasNegativeScore"',
        'exam.description as description',
        'exam.status as status',
        'exam.duration as duration',
        'exam.fromDate as "fromDate"',
        'exam.toDate as "toDate"',
        'examPerson.questionSeries as "questionSeries"',
      ])
      .where(
        'examPerson.userName = :username and examPerson.password = :password ',
        { username, password },
      )
      .andWhere('exam.status = 1')
      .andWhere('examPerson.ExamEndTime is null');

    return await query.getRawOne();
  }

  async getPersonnelForExam(
    examId: number,
    limit: number,
    organId?: number,
  ): Promise<any[]> {
    const getPesonnel = ` SELECT p."Id", p."NationalNo"
                              FROM exam."tb_Personnel" p
                                       LEFT JOIN exam."tb_ExamPerson" ep
                                                 ON p."Id" = ep."PersonnelId" AND ep."ExamId" = ${examId}
                              WHERE ep."ExamId" IS NULL ${organId ? ` AND p."OrganId"=${organId}` : ''}
                              order by p."Id"
                                  limit ${limit}
        `;

    return this.repository.manager.connection.query(getPesonnel);
  }

  async getVolunteersForExam(examId: number, limit: number): Promise<any[]> {
    const getPesonnel = ` SELECT p."Id", p."NationalNo"
                              FROM recruitment."tb_VolunteerInfo" p
                                       LEFT JOIN exam."tb_ExamPerson" ep
                                                 ON p."Id" = ep."VolunteerInfoId" AND ep."ExamId" = ${examId}
                              WHERE ep."ExamId" IS NULL
                              order by p."Id"
                                  limit ${limit}
        `;

    return this.repository.manager.connection.query(getPesonnel);
  }

  async getPersonInExam(
    examId,
    examScopeId,
    firstName,
    lastName,
    nationalNo,
    sortParam,
    page,
    pageLimit,
  ) {
    const query = this.repository.createQueryBuilder('examPerson');

    if (examScopeId == ExamScopeEnum.outer) {
      query
        .innerJoinAndSelect('examPerson.volunteerInfo', 'volunteerInfo')
        .where('examPerson.examId = :examId', { examId: examId })
        .andWhere(
          "(:firstName::varchar is null or volunteerInfo.firstName LIKE N'%" +
            firstName +
            "%')",
          { firstName: firstName },
        )
        .andWhere(
          "(:lastName::varchar is null or volunteerInfo.lastName LIKE N'%" +
            lastName +
            "%')",
          { lastName: lastName },
        )
        .andWhere(
          "(:nationalNo::varchar is null or volunteerInfo.nationalNo LIKE N'%" +
            nationalNo +
            "%')",
          { nationalNo: nationalNo },
        );
    } else if (examScopeId == ExamScopeEnum.inner) {
      query
        .innerJoinAndSelect('examPerson.personal', 'personal')
        .where('examPerson.examId = :examId', { examId: examId })
        .andWhere(
          "(:firstName::varchar is null or personal.firstName LIKE N'%" +
            firstName +
            "%')",
          { firstName: firstName },
        )
        .andWhere(
          "(:lastName::varchar is null or personal.lastName LIKE N'%" +
            lastName +
            "%')",
          { lastName: lastName },
        )
        .andWhere(
          "(:nationalNo::varchar is null or personal.nationalNo LIKE N'%" +
            nationalNo +
            "%')",
          { nationalNo: nationalNo },
        );
    }

    await query.addSort(sortParam).addPagination(pageLimit, page);

    return await query.getManyAndCount();
  }

  async createExamPerson(
    examId: number,
    personelList: any[],
    isPersonel: boolean,
  ) {
    //TODO: fetch series and createdBy correctly
    const _series = 3;
    const createdBy = 2;

    const chunk = personelList
      .map((value) => {
        const password = this.genrate10Digit();
        const series = Math.round(Math.random() * _series);
        return `(${examId},${value.Id},${value.NationalNo},${password},${series},${createdBy})`;
      })
      .join(',');
    // ,"ExamPersonStatus"
    return this.repository.manager.connection.query(`
            insert into exam."tb_ExamPerson" ("ExamId", ${isPersonel ? '"PersonnelId"' : '"VolunteerInfoId"'},
                                              "UserName", "Password", "QuestionSeries", "CreatedBy")
            VALUES ${chunk}
        `);
  }

  private genrate10Digit() {
    let number = '';
    for (let i = 0; i < 10; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }
}
