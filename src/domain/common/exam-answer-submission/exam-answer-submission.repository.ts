import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { IsNull, Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SortParam } from '@/common/dto/request-params/sort-param';

export class AnswerSubmissionRepository extends Repository<AnswerSubmission> {
  constructor(
    @InjectRepository(AnswerSubmission)
    private readonly repository: Repository<AnswerSubmission>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async rectifyDescriptive(values) {
    return await this.repository.manager.connection
      .query(`update "exam"."tb_AnswerSubmission" as answer 
                set "Score" = v.score from (values ${values}) as v(id, score) 
                where answer."Id"=v.id`);
  }
  async checkAllSubmissionsRectified(examId: number) {
    const query = this.repository
      .createQueryBuilder('answerSubmissions')
      .innerJoin('answerSubmissions.examPerson', 'examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .where('exam.id = :examId', { examId })
      .andWhere('answerSubmissions.score Is NULL');

    // .innerJoin('examQuestions.exam', 'exam')
    // .innerJoin('exam.examUser', 'examUser')
    // .where('examUser.id = :examPersonId', { examPersonId })
    // .orderBy('examQuestions.order', 'ASC');
    const count = await query.getCount();
    return count === 0;
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('answerSubmission')
      .innerJoin('answerSubmission.question', 'question')
      .leftJoin('answerSubmission.volunteerInfo', 'volunteerInfo')
      .leftJoin('answerSubmission.questionOption', 'questionOption')
      .innerJoin('answerSubmission.exam', 'exam')
      .select([
        'answerSubmission.id',
        // 'answerSubmission.answerSubmissionTime',
        'answerSubmission.questionId',
        'answerSubmission.volunteerInfoId',
        'answerSubmission.optionId',
        'answerSubmission.answerDescription',
        'answerSubmission.examId',
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
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
        'questionOption.id',
        'questionOption.questionId',
        'questionOption.optionDesc',
        'questionOption.order',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.maxScore',
        'exam.examQuestionType',
      ])
      .where('answerSubmission.id = :id', { id: id });

    return query.getOne();
  }

  getAll(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('answerSubmission')
      .innerJoin('answerSubmission.question', 'question')
      .leftJoin('answerSubmission.volunteerInfo', 'volunteerInfo')
      .leftJoin('answerSubmission.questionOption', 'questionOption')
      .innerJoin('answerSubmission.exam', 'exam')
      .select([
        'answerSubmission.id',
        // 'answerSubmission.answerSubmissionTime',
        'answerSubmission.questionId',
        'answerSubmission.volunteerInfoId',
        'answerSubmission.optionId',
        'answerSubmission.answerDescription',
        'answerSubmission.examId',
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
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
        'questionOption.id',
        'questionOption.questionId',
        'questionOption.optionDesc',
        'questionOption.order',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'exam.maxScore',
        'exam.examQuestionType',
      ]);
    // .where(
    //   "(:questionTitle::varchar is null or AnswerSubmission.questionTitle LIKE N'%" +
    //     filterParam.questionTitle +
    //     "%')",
    //   { questionTitle: filterParam.questionTitle },
    // )
    // .andWhere(
    //   '(:flagExam::bool IS NULL OR AnswerSubmission.examId IN (' +
    //     (filterParam.examId != null ? filterParam.examId.split(',') : null) +
    //     '))',
    //   {
    //     flagExam: filterParam.examId ? filterParam.examId?.length > 0 : null,

    //     examId: filterParam.examId,
    //   },
    // );
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  getAllForCorrcet(
    volunteerInfoId: number,
    examId: number,
    // filterParam: any,
    // sortParam: SortParam,
    // page: number,
    // pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('answerSubmission')
      .innerJoin('answerSubmission.question', 'question')
      .leftJoin('answerSubmission.volunteerInfo', 'volunteerInfo')
      .leftJoin('answerSubmission.questionOption', 'questionOption')
      .innerJoin('answerSubmission.exam', 'exam')
      .select([
        'answerSubmission.id',
        // 'answerSubmission.answerSubmissionTime',
        'answerSubmission.questionId',
        'answerSubmission.volunteerInfoId',
        'answerSubmission.optionId',
        'answerSubmission.answerDescription',
        'answerSubmission.examId',
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
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
        'questionOption.id',
        'questionOption.questionId',
        'questionOption.optionDesc',
        'questionOption.order',
        'exam.id',
        'exam.examTitle',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
      ])
      .where('answerSubmission.volunteerInfoId = :volunteerInfoId', {
        volunteerInfoId: volunteerInfoId,
      })
      .andWhere('answerSubmission.examId = :examId', { examId: examId });

    return query.getMany();
  }

  async getMultipleChoiceAnswersByExamPersonId(examPersonId: number) {
    return this.repository.findAndCount({
      where: { examPersonId, question: { isDescriptive: false } },
      relations: {
        questionOption: true,
      },
    });
  }

  async getDescriptiveAnswersByExamPersonId(examPersonId: number) {
    return this.repository.findAndCount({
      where: { examPersonId, question: { isDescriptive: true } },
      relations: {
        questionOption: true,
      },
    });
  }
}
