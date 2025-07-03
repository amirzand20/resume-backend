import {CacheManagerService} from '@/bootstrap/cache-manager/cache-manager.service';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {ExamStatus} from '@/common/enums/exam-status.enum';
import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
  RequestNotPossibleException,
} from '@/common/utils/exception';
import {CheckedExamDto} from '@/domain/common/exam/dto/checked-exam.dto';
import {CreateExamDto} from '@/domain/common/exam/dto/create-exam.dto';
import {ReadExamDto} from '@/domain/common/exam/dto/read-exam.dto';
import {UpdateExamDto} from '@/domain/common/exam/dto/update-exam.dto';
import {ExamRepository} from '@/domain/common/exam/exam.repository';
import {VolunteerInfoRepository} from '@/domain/common/volunteer-info/volunteer-info.repository';
import {ExamPerson} from '@/entities/exam-person.entity';
import {ExamQuestion} from '@/entities/exam-question.entity';
import {Exam} from '@/entities/exam.entity';
import {Mapper} from '@automapper/core';
import {InjectMapper} from '@automapper/nestjs';
import {BadRequestException, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {AssignExamPersonDto} from '../exam-person/dto/assign-exam-person.dto';
import {ReadExamPersonDto} from '../exam-person/dto/read-exam-person.dto';
import {ExamPersonRepository} from '../exam-person/exam-person.repository';
import {ExamPersonService} from '../exam-person/exam-person.service';
import {CreateExamQuestionItemDto} from '../exam-question/dto/create-exam-question-item.dto';
import {CreateExamQuestionDto} from '../exam-question/dto/create-exam-question.dto';
import {ReadExamQuestionDto} from '../exam-question/dto/read-exam-question.dto';
import {ExamQuestionRepository} from '../exam-question/exam-question.repository';
import {QuestionRepository} from '../question/question.repository';
import {SelectExamQuestionDto} from './dto/select-exam-question.dto';
import {groupBy, orderBy} from '@/common/utils/array';
import {In} from 'typeorm';
import * as moment from 'moment-jalaali';
import {ExamScopeEnum} from '@/common/enums/exam-scope.enum';
import {PersonalRepository} from '@/domain/common/personal/personal.repository';
import {CheckExamBodyDto} from "@/domain/common/exam/dto/check-exam-body.dto";
import {ExamQuestionTypeEnum} from "@/common/enums/exam-question-type.enum";
import {AnswerSubmissionService} from "@/domain/common/exam-answer-submission/exam-answer-submission.service";
import {AnswerSubmissionRepository} from "@/domain/common/exam-answer-submission/exam-answer-submission.repository";

@Injectable()
export class ExamService extends TypeOrmCrudService<Exam> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly repository: ExamRepository,
    private readonly cacheManagerService: CacheManagerService,
    private readonly examPersonRepository: ExamPersonRepository,
    private readonly examRepository: ExamRepository,
    private readonly examQuestionRepository: ExamQuestionRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly volunteerInfoRepository: VolunteerInfoRepository,
    private readonly personalRepository: PersonalRepository,
    private readonly examPersonService: ExamPersonService,
    private readonly answerSubmissionRepository: AnswerSubmissionRepository,
  ) {
    super(repository);
  }

  async deleteById(id: number): Promise<Exam> {
    const criteria = { id: id };
    const exam = await this.repository.findOne({ where: criteria });
    if (!exam) throw new RequestedInfoNotFoundException();
    const examPerson = await this.examPersonRepository.findBy({
      examId: exam.id,
    });
    if (examPerson.length > 0) {
      throw new RequestNotPossibleException('در این آزمون نفراتی وجود دارد');
    } else {
      return await this.repository.remove(exam);
    }
  }

  async create(data: CreateExamDto): Promise<ReadExamDto> {
    if (new Date(data.fromDate) < new Date()) {
      throw new RequestNotPossibleException(
        ' (از تاریخ)  قبل از تاریخ امروز میباشد',
      );
    }
    if (new Date(data.toDate) < new Date(data.fromDate)) {
      throw new RequestNotPossibleException(
          'تاریخ شروع بعد از تاریخ پایان میباشد.',
      );
    }
    const instance = this.mapper.map(data, CreateExamDto, Exam);
    const dm = data.difficultyMeta ?? {};
    const qCount = Object.keys(dm).reduce((prev, key) => {
      if (dm[key]) {
        prev = prev + dm[key];
      }
      return prev;
    }, 0);
    if (qCount > data.questionCount * data.seriesCount) {
      throw new RequestNotPossibleException(
        'محدودیت های اعمال شده در سختی سوال بیش از تعداد سوالات است.',
      );
    }
    await instance.validateDifficulty();
    const saveResult = await this.repository.save(instance);

    if (saveResult.id > 0) {
      const exam = await this.repository.findOne({
        where: { id: saveResult.id },
        relations: {
          examHold: true,
          examScope: true,
          examType: true,
        },
      });

      return this.mapper.map(exam, Exam, ReadExamDto);
    } else throw new OperationNotSuccessfulException();
  }

  async assignUser(data: AssignExamPersonDto): Promise<ReadExamPersonDto[]> {
    //
    // const voluntrees = await this.volunteerInfoRepository.getAllUser(
    //     data.volunteerInfoIds,
    // );

    const exam = await this.examRepository.findOne({
      where: { id: data.examId },
    });
    if (!exam) throw new RequestNotPossibleException('آزمون یافت نشد');

    let users = [];
    const isInner = exam.examScopeId === ExamScopeEnum.inner;
    if (isInner) {
      users = await this.personalRepository.find({
        where: { id: In(data.userIds) },
        select: { nationalNo: true, id: true },
      });
    } else {
      users = await this.volunteerInfoRepository.find({
        where: { id: In(data.userIds) },
        select: { nationalNo: true, id: true },
      });
    }
    const not_exist = data.userIds.filter(
      (id) => !users.some((u) => +u.id == id),
    );
    if (not_exist.length)
      throw new RequestNotPossibleException('بعضی از کاربران موجود نمی باشند.');

    const isAnyUsersAssigned = await this.examPersonRepository.exists({
      where: {
        examId: exam.id,
        volunteerInfoId: !isInner ? In(data.userIds) : undefined,
        personalId: isInner ? In(data.userIds) : undefined,
      },
    });
    if (isAnyUsersAssigned)
      throw new RequestNotPossibleException(
        'بعضی از کاربران انتخاب شده قبلا اضافه شده اند.',
      );

    const examPersones = [];

    for (let index = 0; index < data.userIds.length; index++) {
      examPersones.push(
        await this.examPersonRepository.create({
          volunteerInfoId: !isInner ? users[index].id : undefined,
          personalId: isInner ? users[index].id : undefined,
          examId: data.examId,
          userName: users[index].nationalNo.toString(),
          password: this.genrate10Digit(),
          examStartTime: null,
          examEndTime: null,
          isPresent: false,
          questionSeries: Math.ceil(Math.random() * (exam.seriesCount - 1 + 1)),
        }),
      );
    }

    const saveResult = await this.examPersonRepository.save(examPersones);

    if (!saveResult.some((s) => s.id <= 0)) exam.status = null;
    else
      throw new RequestNotPossibleException(
        'مشکل در الحاق افراد به آزمون در زمان دیگری تلاش نمایید',
      );
    await this.examRepository.save(exam);
    return this.mapper.mapArray(saveResult, ExamPerson, ReadExamPersonDto);
  }

  async cancelExam(examId: number): Promise<ReadExamDto> {
    const _exam = await this.repository.findOne({
      where: {
        id: examId,
        // status:ExamStatus.Started,
      },
    });
    if (_exam.status === ExamStatus.Started) {
      _exam.status = ExamStatus.Cancel;
      return this.mapper.map(
        await this.repository.save(_exam),
        Exam,
        ReadExamDto,
      );
    } else
      throw new RequestNotPossibleException('وضعیت آزمون شروع شده نمی باشد');

    // if (!_exam) throw new RequestedInfoNotFoundException();
  }

  async resumeExam(examId: number): Promise<ReadExamDto> {
    const _exam = await this.repository.findOne({
      where: {
        id: examId,
        // status:ExamStatus.Cancel,
      },
    });
    if (moment(new Date()).isBefore(moment(_exam.fromDate))) {
      throw new BadRequestException(
        'زمان مشخص شده برا شروع آزمون فرا نرسیده است ' +
          moment(_exam.fromDate).locale('fa').format('jYYYY/jMM/jDD HH:mm'),
      );
    }
    if (moment(new Date()).isAfter(moment(_exam.toDate))) {
      throw new BadRequestException(
        'زمان مشخص شده برای خاتمه آزمون گذشته است ' +
          moment(_exam.toDate).locale('fa').format('jYYYY/jMM/jDD HH:mm'),
      );
    }
    if (_exam.status === ExamStatus.Cancel) {
      _exam.status = ExamStatus.Started;
      return this.mapper.map(
        await this.repository.save(_exam),
        Exam,
        ReadExamDto,
      );
    } else
      throw new RequestNotPossibleException('وضعیت آزمون کنسل شده نمی باشد');

    // if (!_exam) throw new RequestedInfoNotFoundException();
  }

  async startExam(examId: number): Promise<ReadExamDto> {
    const _exam = await this.repository.findOne({
      where: {
        id: examId,
      },
    });

    if (moment(new Date()).isBefore(moment(_exam.fromDate))) {
      throw new RequestNotPossibleException(
        'زمان مشخص شده برا شروع آزمون فرا نرسیده است ' +
          moment(_exam.fromDate).locale('fa').format('jYYYY/jMM/jDD HH:mm'),
      );
    }
    if (moment(new Date()).isAfter(moment(_exam.toDate))) {
      throw new RequestNotPossibleException(
        'زمان مشخص شده برای خاتمه آزمون گذشته است ' +
          moment(_exam.toDate).locale('fa').format('jYYYY/jMM/jDD HH:mm'),
      );
    }
    if (
      _exam.status == ExamStatus.Checked ||
      _exam.status == ExamStatus.Cancel
    ) {
      _exam.status = ExamStatus.Started;
      return this.mapper.map(
        await this.repository.save(_exam),
        Exam,
        ReadExamDto,
      );
    } else
      throw new RequestNotPossibleException('آزمون مجاز به شروع  نمی باشد');
  }

  async endExam(examId: number): Promise<ReadExamDto> {
    const _exam = await this.repository.findOne({
      where: {
        id: examId,
      },
    });

    if (_exam.status == ExamStatus.Started) {
      if(_exam.examQuestionType === ExamQuestionTypeEnum.explanation){
        _exam.status = ExamStatus.Rectify;
      }else
        _exam.status = ExamStatus.End;
      return this.mapper.map(
        await this.repository.save(_exam),
        Exam,
        ReadExamDto,
      );
    } else if(_exam.status === ExamStatus.Rectify){
      const res = await  this.answerSubmissionRepository.checkAllSubmissionsRectified(_exam.id);
      if(!res)
        throw new RequestNotPossibleException(
          'قبل از پایان آزمون همه سوالات را تصحیح کنید.',
        );
      _exam.status = ExamStatus.End;
      return this.mapper.map(
          await this.repository.save(_exam),
          Exam,
          ReadExamDto,
      );
      //       const query = this.repository
      //           .createQueryBuilder('question')
      //           .leftJoinAndSelect('question.answerSubmissions', 'answerSubmissions')
      //           .innerJoin('question.examQuestions', 'examQuestions')
      //           .innerJoin('examQuestions.exam', 'exam')
      //           .innerJoin('exam.examUser', 'examUser')
      //           .where('examUser.id = :examPersonId', { examPersonId })
      //           .orderBy('examQuestions.order', 'ASC');
    }
    else
      throw new RequestNotPossibleException(
        'وضعیت آزمون در حال برگزاری نمی باشد',
      );
  }


  async permittedExamCart(examId: number): Promise<ReadExamDto> {
    const _exam = await this.repository.findOne({
      where: {
        id: examId,
      },
    });

    if (_exam.status == ExamStatus.Checked || _exam.status == null) {
      _exam.canPrintCart = true;
      return this.mapper.map(
        await this.repository.save(_exam),
        Exam,
        ReadExamDto,
      );
    } else
      throw new RequestNotPossibleException(
        'ساخت آزمون باید تکمیل شده باشد و آزمون در وضعیت ساخت نباشد.',
      );
  }

  private getSelectQuestionCacheKey = (examId: number) =>
    `select-question-${examId}`;

  async questionReset(data) {
    const personExam = await this.examPersonRepository.findOne({
      where: { userName: data.username, password: data.password },
      relations: { exam: true },
    });

    const exam = await this.repository.findOne({
      where: { id: personExam.examId },
    });
    exam.status = 1;
    exam.canPrintCart = true;

    return await this.repository.save(exam);
  }

  async addQuestionList(
    data: CreateExamQuestionDto,
  ): Promise<ReadExamQuestionDto[]> {
    const exam = await this.repository.findOne({
      where: { id: data.examId },
    });

    if (!exam) throw new OperationNotSuccessfulException('آزمون یافت نشد.');

    const qSeries = await this.validateExamQuestionSeries(exam, data.questions);
    await this.validateExamQuestionDifficulty(exam, data.questions);

    await this.examQuestionRepository.delete({
      examId: data.examId,
      series: In(qSeries),
    });

    const instance = this.mapper.mapArray(
      data.questions,
      CreateExamQuestionItemDto,
      ExamQuestion,
    );
    instance.forEach((f) => (f.examId = data.examId));
    const saveResult = await this.examQuestionRepository.save(instance);
    if (saveResult.length > 0) {
      exam.status = null;
      await this.examRepository.save(exam);
      await this.setCacheExamQuestion({
        examId: data.examId,
        questionIds: data.questions.map((m) => m.questionId),
      });

      return this.mapper.mapArray(
        saveResult,
        ExamQuestion,
        ReadExamQuestionDto,
      );
    } else throw new OperationNotSuccessfulException();
  }

  private async validateExamQuestionDifficulty(
    exam: Exam,
    questions: CreateExamQuestionItemDto[],
  ) {
    const qList = await this.questionRepository.find({
      where: { id: In(questions.map((m) => m.questionId)) },
    });

    // qList.push(...exam.examQuestions);

    // const SList = groupBy(qList,"series");

    const diffMap = qList.reduce<Record<string, number>>((prev, cur) => {
      if (!prev[cur.difficultyLevelId ?? 0])
        prev[cur.difficultyLevelId ?? 0] = 0;
      prev[cur.difficultyLevelId ?? 0] = prev[cur.difficultyLevelId ?? 0] + 1;
      return prev;
    }, {});

    const dm = exam.difficultyMeta ?? {};
    for (const key in dm) {
      if (Object.prototype.hasOwnProperty.call(dm, key)) {
        const count = dm[key];
        const hasMeta =
          typeof diffMap[key] !== 'undefined' && diffMap[key] !== null;
        if ((hasMeta && diffMap[key] !== count) || (!hasMeta && count > 0)) {
          throw new OperationNotSuccessfulException(
            `درجه سختی سوالات انتخاب شده مطابق با تعداد تعیین شده در مرحله تعریف آزمون نیست.`,
          );
        }
      }
    }
    return true;
  }

  private async validateExamQuestionSeries(
    exam: Exam,
    questions: CreateExamQuestionItemDto[],
  ) {
    if (!exam.seriesCount)
      throw new OperationNotSuccessfulException(
        'سری سوالات آزمون تعیین نشده است.',
      );
    if (!exam.questionCount)
      throw new OperationNotSuccessfulException(
        'تعداد سوالات آزمون تعیین نشده است.',
      );

    const qs = groupBy(questions, 'series');
    const qSeries = Object.keys(qs).map((m) => +m);
    if (qSeries.length > exam.seriesCount) {
      throw new OperationNotSuccessfulException(
        `سری سوالات وارد شده بیشتر از تعداد سری سوالات آزمون میباشد`,
      );
    }

    qSeries.forEach((s) => {
      qs[s] = orderBy(qs[s], 'order');

      if (qs[s].length != exam.questionCount) {
        throw new OperationNotSuccessfulException(
          `تعداد سوالات وارده شده برای سری ${s} کمتر از تعداد سوالات آزمون میباشد.`,
        );
      }
      if (qs[s].some((v, i) => v.order - 1 !== i)) {
        throw new OperationNotSuccessfulException(
          `در سری ${s} ترتیب سوالات تکراری و یا ناقص میباشد.`,
        );
      }
    });
    return qSeries;
  }

  async update(id: number, data: UpdateExamDto): Promise<ReadExamDto> {
    if (new Date(data.fromDate) < new Date()) {
      throw new RequestNotPossibleException(
          ' (از تاریخ)  قبل از تاریخ امروز میباشد',
      );
    }
    if (new Date(data.toDate) < new Date(data.fromDate)) {
      throw new RequestNotPossibleException(
          'تاریخ شروع بعد از تاریخ پایان میباشد.',
      );
    }
    const exam = await this.repository.findOne({ where: { id: id } });

    if (!exam) throw new RequestedInfoNotFoundException();

    if (exam.examScopeId != data.examScopeId) await this.deleteUser(id);

    exam.examTitle = data.examTitle;
    exam.examTypeId = data.examTypeId;
    exam.duration = data.duration;
    exam.examHoldId = data.examHoldId;
    exam.fromDate = data.fromDate;
    exam.toDate = data.toDate;
    exam.examScopeId = data.examScopeId;
    exam.description = data.description;

    exam.canPrintCart = data.canPrintCart;
    exam.seriesCount = data.seriesCount;
    exam.questionCount = data.questionCount;
    exam.difficultyMeta = data.difficultyMeta;
    exam.maxScore = data.maxScore;
    exam.examQuestionType = data.examQuestionType;
    exam.hasNegativeScore = data.hasNegativeScore;

    // if (exam.status == ExamStatus.Checked)
    exam.status = null;

    await exam.validateDifficulty();
    const savedInstance = await this.repository.save(exam);
    if (savedInstance.id) {
      const exam = await this.repository.findOne({
        where: { id: savedInstance.id },
        relations: {
          examHold: true,
          examScope: true,
          examType: true,
        },
      });

      return this.mapper.map(exam, Exam, ReadExamDto);
    }
  }

  async updateDifficultyMeta(
    id: number,
    data: Record<string, number>,
  ): Promise<ReadExamDto> {
    const exam = await this.repository.findOne({
      where: { id },
      relations: { examHold: true, examScope: true, examType: true },
    });

    if (!exam) throw new RequestedInfoNotFoundException();

    exam.difficultyMeta = data;
    exam.status = null;
    await exam.validateDifficulty();
    const savedInstance = await this.repository.save(exam);
    return this.mapper.map(savedInstance, Exam, ReadExamDto);
  }

  async getById(id: number): Promise<ReadExamDto> {
    const result = await this.repository.findById(id);
    if (!result) throw new RequestedInfoNotFoundException();
    return this.mapper.map(result, Exam, ReadExamDto);
  }

  async getAll(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamDto>> {
    const [data, count] = await this.repository.getAll(
      filterParam,
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Exam, ReadExamDto),
    };
  }

  async getAllExam(
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamDto>> {
    const [data, count] = await this.repository.getAllExam(
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Exam, ReadExamDto),
    };
  }

  async getAllExamAssign(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamDto>> {
    const [data, count] = await this.repository.getAllExamAssign(
      filterParam,
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Exam, ReadExamDto),
    };
  }

  async getPublicExam(
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadExamDto>> {
    const [data, count] = await this.repository.getPublicExam(
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Exam, ReadExamDto),
    };
  }

  async checkedExam(id: number, data: CheckExamBodyDto): Promise<CheckedExamDto> {
    const exam = await this.repository.findOne({ where: { id: id } });
    if (!exam) throw new RequestedInfoNotFoundException();

    const examQuestion =
      await this.examQuestionRepository.getQuestionSeriesCountByExamId(exam.id);

    const asignedPersonCount = await this.examPersonRepository.count({
      where: { examId: id },
    });

    const hasQuestionSeriesCountProblem =
      examQuestion.length != exam.seriesCount ||
      examQuestion.some(
        (seri) =>
          +seri.count != exam.questionCount || +seri.series > exam.seriesCount,
      );

    const key = this.getSelectQuestionCacheKey(id);
    const cacheData = await this.cacheManagerService.getCache(key);
    const hasAssignQuestionProblem = !cacheData?.length;

    if (data.update && exam.status == null)
      exam.status =
        exam.canPrintCart &&
        !hasQuestionSeriesCountProblem &&
        asignedPersonCount
          ? ExamStatus.Checked
          : null;

    let isDifficultyMetaValid = false;
    try {
      await exam.validateDifficulty();
      isDifficultyMetaValid = true;
    } catch (e) {
      isDifficultyMetaValid = false;
    }

    await this.repository.save(exam);

    return new CheckedExamDto(
      exam.canPrintCart,
      hasQuestionSeriesCountProblem,
      asignedPersonCount,
      exam.status,
      hasAssignQuestionProblem,
      isDifficultyMetaValid,
    );
  }

  async checkExamTime(user): Promise<any> {
    const result = await this.repository.checkExamTime(user);
    if (!result) throw new RequestedInfoNotFoundException();

    const startTimeExam = new Date(result.examStartTime);
    const spendTimeExam = new Date(
      startTimeExam.getTime() + result.duration * 60 * 1000,
    );
    const now = new Date().getTime();
    return now - spendTimeExam.getTime() >= 0;
  }

  async setCacheExamQuestion(data: SelectExamQuestionDto) {
    const key = this.getSelectQuestionCacheKey(data.examId);

    let cacheData = (await this.cacheManagerService.getCache(key)) as number[];

    cacheData = cacheData?.length
      ? [...cacheData, ...data.questionIds]
      : data.questionIds;

    await this.cacheManagerService.setCache(key, cacheData, -1);

    return true;
  }

  async deleteCacheExamQuestion(examId, questionId) {
    const key = this.getSelectQuestionCacheKey(examId);
    if (!key) return false;

    const data = await this.cacheManagerService.getCache(key);
    const questionIds = data.filter((item) => item != questionId);
    await this.cacheManagerService.removeCache(key);
    await this.cacheManagerService.setCache(key, questionIds, {});

    return true;
  }

  async getCacheExamQuestion(
    examId: number,
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const key = this.getSelectQuestionCacheKey(examId);

    const cacheData = await this.cacheManagerService.getCache(key);
    if (!cacheData?.length) return [];

    const [data, count] = await this.questionRepository.getAllWithFilter(
      { ...filterParam, ids: cacheData.join(",") },
      sortParam,
      page,
      pageLimit,
    );

    return { total: count, data: data };
  }

  async getSelectedSeriesExamQuestion(
    examId: number,
    seriesId: number,
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const [data, count] =
      await this.questionRepository.getSelectedSeriesExamQuestion(
        examId,
        seriesId,
        filterParam,
        sortParam,
        page,
        pageLimit,
      );

    return { total: count, data: data };
  }

  private genrate10Digit() {
    let number = '';
    number = '';
    for (let i = 0; i < 10; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }

  async deleteUser(examId: number) {
    return await this.examPersonRepository.delete({ examId: examId });
  }
}
