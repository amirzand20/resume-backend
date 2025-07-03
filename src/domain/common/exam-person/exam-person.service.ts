import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
} from '@/common/utils/exception';
import { ExamPerson } from '@/entities/exam-person.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Queue } from 'bullmq';
import { AnswerSubmissionRepository } from '../exam-answer-submission/exam-answer-submission.repository';
import { ExamQuestionRepository } from '../exam-question/exam-question.repository';
import { CreateExamPersonDto } from './dto/create-exam-person.dto';
import { ReadExamPersonDto } from './dto/read-exam-person.dto';
import { RemainQuestionsOrderDto } from './dto/remain-questions-order-list.dto';
import { updateExamPersonDto } from './dto/update-exam-person.dto';
import { ExamPersonRepository } from './exam-person.repository';
import { ReadExamPersonCardDto } from './dto/read-exam-person-card.dto';
import * as moment from 'moment-jalaali';
import { ExamStatus } from '@/common/enums/exam-status.enum';
import { ExamQuestion } from '@/entities/exam-question.entity';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { ExamRepository } from '@/domain/common/exam/exam.repository';
import { ExamScopeEnum } from '@/common/enums/exam-scope.enum';
import { Exam } from '@/entities/exam.entity';
import { ResultExamPersonDto } from './dto/result-exam-person.dto';
import { ExamQuestionTypeEnum } from '@/common/enums/exam-question-type.enum';

@Injectable()
export class ExamPersonService extends TypeOrmCrudService<ExamPerson> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectQueue('cardProcessor') private queue: Queue,
    private readonly repository: ExamPersonRepository,
    private readonly examRepository: ExamRepository,
    private readonly examQuestionRepository: ExamQuestionRepository,
    private readonly answerSubmissionRepository: AnswerSubmissionRepository,
  ) {
    super(repository);
  }

  async startExam(examPersonId: number): Promise<ReadExamPersonDto> {
    const _examPerson = await this.repository.findOne({
      where: { id: examPersonId },
      relations: { exam: true },
    });

    if (!_examPerson) throw new BadRequestException('کاربر وجود ندارد');

    if (
      _examPerson.exam.status == ExamStatus.Checked ||
      _examPerson.exam.status == ExamStatus.Cancel
    )
      throw new BadRequestException(
        'وضعیت آزمون برای شروع قابل قبول نیست' + _examPerson.exam.status,
      );
    if (moment(new Date()).isAfter(moment(_examPerson.exam.toDate)))
      throw new BadRequestException('زمان شرکت در آزمون خاتمه یافته است.');
    if (moment(new Date()).isBefore(moment(_examPerson.exam.fromDate))) {
      throw new BadRequestException(
        'زمان شرکت در آزمون فرا نرسیده است ' +
          moment(_examPerson.exam.fromDate)
            .locale('fa')
            .format('jYYYY/jMM/jDD HH:mm'),
      );
    }

    if (_examPerson.examEndTime)
      throw new BadRequestException('آزمون شما خاتمه یافته است.');

    let examStartTime;
    if (_examPerson.examStartTime) {
      examStartTime = _examPerson.examStartTime.getTime();
    } else {
      _examPerson.examStartTime = new Date();
      examStartTime = _examPerson.examStartTime;
      await this.repository.save(_examPerson);
    }

    if (
      moment(Date.now()).diff(moment(examStartTime), 'minutes') <
      _examPerson.exam.duration
    ) {
      _examPerson.isPresent = true;

      return this.mapper.map(
        await this.repository.save(_examPerson),
        ExamPerson,
        ReadExamPersonDto,
      );
    } else
      throw new BadRequestException('تایم آزمون این کاربر به اتمام رسیده است');
  }

  async endExam(examPersonId: number): Promise<ReadExamPersonDto> {
    const _examPerson = await this.repository.findOne({
      where: {
        id: examPersonId,
      },
    });
    if (!_examPerson) throw new RequestedInfoNotFoundException();
    if (!_examPerson.examStartTime)
      throw new BadRequestException(
        'شرکت کننده مجاز به ثبت اتمام آزمون نمی باشد. لطفا با پشتیبانی تماس بگیرید.',
      );
    if (moment(new Date()).isAfter(moment(_examPerson.exam.toDate)))
      throw new BadRequestException('زمان شرکت در آزمون خاتمه یافته است.');
    if (moment(new Date()).isBefore(moment(_examPerson.exam.fromDate))) {
      throw new BadRequestException(
        'زمان شرکت در آزمون فرا نرسیده است ' +
          moment(_examPerson.exam.fromDate)
            .locale('fa')
            .format('jYYYY/jMM/jDD HH:mm'),
      );
    }
    _examPerson.examEndTime = new Date();
    _examPerson.isPresent = false;

    return this.mapper.map(
      await this.repository.save(_examPerson),
      ExamPerson,
      ReadExamPersonDto,
    );
  }

  async getById(id: number): Promise<ReadExamPersonDto> {
    var result = await this.repository.getById(id);
    return this.mapper.map(result, ExamPerson, ReadExamPersonDto);
  }

  async getList(page: number, pageLimit: number): Promise<any> {
    var result = await this.repository.getList(page, pageLimit);
    return this.mapper.mapArray(result, ExamPerson, ReadExamPersonDto);
  }

  async create(data: CreateExamPersonDto): Promise<ReadExamPersonDto> {
    const instance = this.mapper.map(data, CreateExamPersonDto, ExamPerson);

    const saveResult = await this.repository.save(instance);

    if (saveResult.id > 0)
      return this.mapper.map(saveResult, ExamPerson, ReadExamPersonDto);

    throw new OperationNotSuccessfulException();
  }

  async update(
    id: number,
    data: updateExamPersonDto,
  ): Promise<ReadExamPersonDto> {
    const entity = await this.repository.findOne({ where: { id: id } });

    if (!entity) throw new RequestedInfoNotFoundException();

    entity.examId = data.examId;
    entity.personalId = data.personalId;
    entity.volunteerInfoId = data.volunteerInfoId;
    entity.examStartTime = data.examStartTime;
    entity.examEndTime = data.examEndTime;
    entity.isPresent = data.isPresent;

    return this.mapper.map(
      await this.repository.save(entity),
      ExamPerson,
      ReadExamPersonDto,
    );
  }

  async delete(id: number) {
    const entity = await this.repository.findOne({ where: { id: id } });

    if (!entity) throw new RequestedInfoNotFoundException();

    return await this.repository.remove(entity);
  }

  async findByVolunteerInfo(
    volunteerInfoId: number,
    // sortParam: SortParam,
    // page: number,
    // pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    const [data, count] = await this.repository.findByVolunteerInfo(
      volunteerInfoId,
      //   sortParam,
      //   page,
      //   pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, ExamPerson, ReadExamPersonDto),
    };
  }

  async getPersonsInExam(
    examId: number,
    filter: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    const [data, count] = await this.repository.getPersonsInExam(
      examId,
      filter,
      sortParam,
      page,
      pageLimit,
    );
    console.log('################', data);
    return {
      total: count,
      data: this.mapper.mapArray(data, ExamPerson, ReadExamPersonDto),
    };
  }

  async getResultsInfo(id: number): Promise<ResultExamPersonDto> {
    let examInfo = await this.repository.findOne({
      where: { id },
      relations: { exam: true },
    });

    if (!examInfo) throw new RequestedInfoNotFoundException();

    if (examInfo.exam.examQuestionType === ExamQuestionTypeEnum.test) {
      return this.getMultipleChoiceResultsById(id, examInfo);
    }

    return this.getDescriptiveResultsById(id, examInfo);

    // const totalAnsweredQuestion =
    //   multipleChoices.answered + descriptives.answered;
    // const totalExamQuestion =
    //   examInfo.exam.seriesCount * examInfo.exam.questionCount;
  }

  async getMultipleChoiceResultsById(
    id: number,
    examInfo: ExamPerson,
  ): Promise<ResultExamPersonDto> {
    const mcCount = await this.examQuestionRepository.getQuestionsCountByExamId(
      examInfo.examId,
      false,
    );
    const [mcAnswers, mcAnswered] =
      await this.answerSubmissionRepository.getMultipleChoiceAnswersByExamPersonId(
        id,
      );
    const correctAnswers = mcAnswers.filter((f) => f.questionOption?.isCorrect);
    const hasNegative = examInfo.exam.hasNegativeScore ?? false;
    const negatives = hasNegative
      ? +(correctAnswers.length / 3.0).toFixed(2)
      : 0;

    return new ResultExamPersonDto(
      mcCount,
      mcAnswered,
      mcCount - mcAnswered,
      correctAnswers.length,
      negatives,
      +(
        (correctAnswers.length - negatives) *
        (examInfo.exam.maxScore || 1)
      ).toFixed(2),
    );
    // {
    //   total: mcCount,
    //   answered: mcAnswered,
    //   remaining: mcCount - mcAnswered,
    //   corrects: correctAnswers.length,
    //   negatives,
    //   score: correctAnswers.length - negatives,
    // };
  }

  async getDescriptiveResultsById(
    id: number,
    examInfo: ExamPerson,
  ): Promise<ResultExamPersonDto> {
    const dCount = await this.examQuestionRepository.getQuestionsCountByExamId(
      examInfo.examId,
      true,
    );
    const [dAnswers, dAnswered] =
      await this.answerSubmissionRepository.getDescriptiveAnswersByExamPersonId(
        id,
      );
    const needScore = dAnswers.some(
      (s) => typeof s.score !== 'number' && !s.score,
    );
    if (needScore)
      throw new BadRequestException(
        'لطفا تمام سوالات را تصحیح کرده و سپس اقدام به مشاهده نتایج نمایید.',
      );
    const s =
      dAnswers.reduce(
        (prev, cur) => prev + Math.max(Math.min(100, cur.score ?? 0), 0),
        0,
      ) / 100.0;

    return new ResultExamPersonDto(
      dCount,
      dAnswered,
      dCount - dAnswered,
      -1,
      -1,
      +(s * (examInfo.exam.maxScore || 1)).toFixed(2),
    );
  }

  async getQuestionInfoById(id: number): Promise<any> {
    let examInfo = await this.repository
      .createQueryBuilder('examPerson')
      .innerJoin('examPerson.exam', 'exam')
      .where({ id: id })
      .select(['exam.*'])
      .getRawOne();

    if (!examInfo) throw new RequestedInfoNotFoundException();

    const answerSubmissionCount = await this.answerSubmissionRepository.count({
      where: { examPersonId: id },
    });

    return {
      totalExamQuestion: examInfo.SeriesCount * examInfo.QuestionCount,
      totalAnsweredQuestion: answerSubmissionCount,
      totalRemainQuestion:
        examInfo.SeriesCount * examInfo.QuestionCount - answerSubmissionCount,
    };
  }

  async getRemainQuestions(id: number): Promise<RemainQuestionsOrderDto[]> {
    const examInfo = await this.repository
      .createQueryBuilder('examPerson')
      .select([
        'examPerson.examId as selectedExamId',
        'examPerson.questionSeries as seriesNumber',
      ])
      .where({ id: id })
      .getRawOne();

    const questionsOrder = await this.examQuestionRepository.find({
      select: { order: true, questionId: true },
      where: { examId: examInfo.selectedexamid, series: examInfo.seriesnumber },
    });

    const answeredQuestionsCount = await this.answerSubmissionRepository.find({
      select: { questionId: true },
      where: { examPersonId: id },
    });

    return questionsOrder
      .filter(
        (q) =>
          !answeredQuestionsCount.some((a) => a.questionId == q.questionId),
      )
      .map((q) => new RemainQuestionsOrderDto(q.questionId, q.order));
  }

  async getPersonInExam(
    examId,
    firstName,
    lastName,
    nationalNo,
    sortParam: SortParam,
    page,
    pageLimit,
  ): Promise<QueryListResultDto<ReadExamPersonDto>> {
    const exam: Exam = await this.examRepository.findOne({
      where: { id: examId },
    });

    const [data, count] = await this.repository.getPersonInExam(
      examId,
      exam.examScopeId,
      firstName,
      lastName,
      nationalNo,
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, ExamPerson, ReadExamPersonDto),
    };
  }

  async getSingleQuestionByOrder(
    id: number,
    order: number,
  ): Promise<[ExamQuestion, AnswerSubmission]> {
    const ep = await this.repository.findOne({
      where: { id },
      select: { questionSeries: true, examId: true },
    });
    const series = ep.questionSeries;
    const q = await this.examQuestionRepository.findOne({
      where: { series, examId: ep.examId, order },
      relations: {
        exam: false,
        question: { options: { attachments: true }, attachments: true },
      },
    });
    return [
      q,
      await this.answerSubmissionRepository.findOne({
        where: { examPersonId: id, questionId: q.questionId },
      }),
    ];
  }

  async checkUniqueUserName(userName: string): Promise<boolean> {
    const result = await this.repository.findOne({ where: { userName } });
    return !!result;
  }

  async startGeneratingCards(
    examId: number,
    includeVols: boolean,
    organId?: number,
  ) {
    return this.queue.add('cardProcessor', {
      examId,
      organId,
      includeVols,
    });
  }

  // async generateCardsForVolunteers(examId: number) {
  //   return this.queue.add('volsCardsJob', { examId });
  // }

  async getSingleExamCardReport(
    body,
  ): Promise<QueryListResultDto<ReadExamPersonCardDto>> {
    const exam = await this.examRepository.findOne({
      where: { id: body.examId },
    });

    let data, count;

    if (exam.examScopeId == ExamScopeEnum.inner) {
      [data, count] = await this.repository.getSingleExamCardReport(
        body.examId,
        null,
        body.volunteerInfoId,
      );
    } else if (exam.examScopeId == ExamScopeEnum.outer) {
      [data, count] = await this.repository.getSingleExamCardReport(
        body.examId,
        body.volunteerInfoId,
        null,
      );
    }

    return {
      total: count,
      data: this.mapper.mapArray(data, ExamPerson, ReadExamPersonCardDto),
    };
  }

  async getMultipleExamCardReport(
    examId: number,
    // sortParam: SortParam,
    // page: number,
    // pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamPersonCardDto>> {
    const [data, count] = await this.repository.getMultipleExamCardReport(
      examId,
      //   sortParam,
      //   page,
      //   pageLimit,
    );
    this.examQuestionRepository;
    return {
      total: count,
      data: this.mapper.mapArray(data, ExamPerson, ReadExamPersonCardDto),
    };
  }
}
