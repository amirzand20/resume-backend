import { SortParam } from '@/common/dto/request-params/sort-param';
import { Question } from '@/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';

export class QuestionRepository extends Repository<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  descriptiveExamQuestion(examPersonId: number) {
    const query = this.repository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answerSubmissions', 'answerSubmissions')
      .innerJoin('question.examQuestions', 'examQuestions')
      .innerJoin('examQuestions.exam', 'exam')
      .innerJoin('exam.examUser', 'examUser')
      .where('examUser.id = :examPersonId', { examPersonId })
      .orderBy('examQuestions.order', 'ASC');
    // .andWhere('examQuestions.examId = examPerson.examId')
    return query.getMany();
  }
  // getExamQuestion(examPersonId: number) {
  //       const query = this.repository
  //           .createQueryBuilder('question')
  //           .leftJoinAndSelect('question.answerSubmissions', 'answerSubmissions')
  //           .innerJoin('question.examQuestions', 'examQuestions')
  //           .innerJoin('examQuestions.exam', 'exam')
  //           .innerJoin('exam.examUser', 'examUser')
  //           .where('examUser.id = :examPersonId', { examPersonId })
  //           .orderBy('examQuestions.order', 'ASC');
  //       // .andWhere('examQuestions.examId = examPerson.examId')
  //       return query.getMany();
  //   }
  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('question')
      .leftJoin('question.questionSubject', 'questionSubject')
      .leftJoin('question.attachments', 'attachments')
      .leftJoin('question.options', 'options')
      .leftJoin('options.attachments', 'optionsAttachments')
      .leftJoin('question.examQuestions', 'examQuestions')
      .leftJoin('question.difficultyLevel', 'difficultyLevel')
      .select([
        'question.id',
        'question.questionTitle',
        // 'question.order',
        'question.isDescriptive',
        'question.questionSubjectId',
        'question.difficultyLevelId',
        'question.answerDescription',
        'questionSubject.id',
        'questionSubject.title',
        'attachments.id',
        'attachments.fileName',
        'attachments.attachmentId',
        'options.id',
        'options.optionDesc',
        'options.order',
        'options.isCorrect',
        'optionsAttachments.id',
        'optionsAttachments.fileName',
        'optionsAttachments.attachmentId',
        'examQuestions.id',
        'examQuestions.questionId',
        'examQuestions.examId',
        'difficultyLevel.id',
        'difficultyLevel.name',
      ])
      .where('question.id = :id', { id: id });

    return query.getOne();
  }

  getAllWithFilter(
    filterParam: GetQuestionsFilterDto,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionSubject', 'questionSubject')
      .leftJoinAndSelect('question.attachments', 'attachments')
      .leftJoinAndSelect('question.options', 'options')
      .leftJoinAndSelect('options.attachments', 'optionsAttachments')
      .leftJoinAndSelect('question.examQuestions', 'examQuestions')
      .leftJoinAndSelect('question.difficultyLevel', 'difficultyLevel');
    //   .select([
    //     'question.id',
    //     'question.questionTitle',
    //     // 'question.order',
    //     'question.isDescriptive',
    //     'question.questionSubjectId',
    //     'question.difficultyLevelId',
    //     'question.answerDescription',
    //     'questionSubject.id',
    //     'questionSubject.title',
    //     'attachments.id',
    //     'attachments.fileName',
    //     'attachments.attachmentId',
    //     'options.id',
    //     'options.optionDesc',
    //     'options.order',
    //     'options.isCorrect',
    //     'optionsAttachments.id',
    //     'optionsAttachments.fileName',
    //     'optionsAttachments.attachmentId',
    //     'examQuestions.id',
    //     'examQuestions.questionId',
    //     'examQuestions.examId',
    //     'difficultyLevel.id',
    //     'difficultyLevel.name',
    //   ]);
    console.log('###################', filterParam);
    if (filterParam.questionSubjectId)
      query.andWhere('question.questionSubjectId = :questionSubjectId', {
        questionSubjectId: filterParam.questionSubjectId,
      });

    if (filterParam.difficultyLevelIds) {
      const difficultyLevelIds = filterParam.difficultyLevelIds
        .split(',')
        .map((m) => Number(m.trim()))
        .join(',');
      query.andWhere(`question.difficultyLevelId in (${difficultyLevelIds})`);
    }

    if (filterParam.ids) {
      const ids = filterParam.ids
        .split(',')
        .map((m) => Number(m.trim()))
        .join(',');
      query.andWhere(`question.id in (${ids})`);
    }

    if (typeof filterParam.questionType === 'number')
      query.andWhere('question.isDescriptive = :isDescriptive', {
        isDescriptive: filterParam.questionType === 1,
      });
    if (filterParam.questionTitle)
      query.andWhere(
        "(:questionTitle::varchar is null or question.questionTitle LIKE N'%" +
          filterParam.questionTitle +
          "%')",
        { questionTitle: filterParam.questionTitle },
      );
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }

  getSelectedSeriesExamQuestion(
    examId: number,
    seriesId: number,
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('question')
      .leftJoin('question.questionSubject', 'questionSubject')
      .leftJoin('question.attachments', 'attachments')
      .leftJoin('question.options', 'options')
      .leftJoin('options.attachments', 'optionsAttachments')
      .leftJoin('question.examQuestions', 'examQuestions')
      .leftJoin('question.difficultyLevel', 'difficultyLevel')
      .select([
        'question.id',
        'question.questionTitle',
        'question.isDescriptive',
        'question.questionSubjectId',
        'question.difficultyLevelId',
        'question.answerDescription',
        'questionSubject.id',
        'questionSubject.title',
        'attachments.id',
        'attachments.fileName',
        'attachments.attachmentId',
        'options.id',
        'options.optionDesc',
        'options.order',
        'options.isCorrect',
        'optionsAttachments.id',
        'optionsAttachments.fileName',
        'optionsAttachments.attachmentId',
        'examQuestions.id',
        'examQuestions.questionId',
        'examQuestions.examId',
        'difficultyLevel.id',
        'difficultyLevel.name',
      ])
      .where('examQuestions.examId = :examId', { examId })
      .andWhere('examQuestions.series = :seriesId', { seriesId })
      .addSort(sortParam)
      .addPagination(pageLimit, page);
    return query.getManyAndCount();
  }

  getAllByExamPersonId(
    examPersonId: number,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('question')
      .leftJoin('question.questionSubject', 'questionSubject')
      .leftJoin('question.attachments', 'attachments')
      .leftJoin('question.options', 'options')
      .leftJoin('options.attachments', 'optionsAttachments')
      .innerJoin('question.examQuestions', 'examQuestions')
      .leftJoin('question.difficultyLevel', 'difficultyLevel')
      .leftJoin(
        'question.answerSubmissions',
        'answerSubmissions',
        'answerSubmissions.questionId = question.id and answerSubmissions.examPersonId = :examPersonId',
        { examPersonId },
      )
      .innerJoin('examQuestions.exam', 'exam')
      .innerJoin('exam.examUser', 'examPerson')
      .select([
        'question.id',
        'question.questionTitle',
        'question.isDescriptive',
        'question.questionSubjectId',
        'question.difficultyLevel',
        'question.answerDescription',
        'questionSubject.id',
        'questionSubject.title',
        'attachments.id',
        'attachments.fileName',
        'attachments.attachmentId',
        'options.id',
        'options.optionDesc',
        'options.order',
        'options.isCorrect',
        'optionsAttachments.id',
        'optionsAttachments.fileName',
        'optionsAttachments.attachmentId',
        'answerSubmissions.optionId',
        'answerSubmissions.answerDescription',
        'examQuestions.id',
        'examQuestions.questionId',
        'examQuestions.examId',
        'examQuestions.order',
        'exam.id',
        'exam.duration',
        'difficultyLevel.id',
        'difficultyLevel.name',
      ])
      .where('examPerson.id = :examPersonId', { examPersonId });
    //            .orWhere('answerSubmissions.examPersonId = :examPersonId', { examPersonId });

    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }
}
