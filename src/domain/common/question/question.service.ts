import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
  RequestNotPossibleException,
} from '@/common/utils/exception';
import { Question } from '@/entities/question.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ExamQuestionRepository } from '../exam-question/exam-question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionDto } from './dto/read-question.dto';
import { QuestionRepository } from './question.repository';
import { FileManagerService } from '../file-manager/file-manager.service';
import { ReadPublicAnswerSubmissionDto } from '@/domain/common/exam-answer-submission/dto/read-public-exam-answer-submission.dto';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';

@Injectable()
export class QuestionService extends TypeOrmCrudService<Question> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly repository: QuestionRepository,
    protected readonly fileManagerService: FileManagerService,
    private readonly examQuestionRepository: ExamQuestionRepository,
  ) {
    super(repository);
  }

  async deleteById(id: number): Promise<Question> {
    const criteria = { id: id };
    const question = await this.repository.findOne({ where: criteria });
    if (!question) throw new RequestedInfoNotFoundException();
    const examQuestion = await this.examQuestionRepository.findBy({
      questionId: question.id,
    });
    if (examQuestion.length > 0) {
      throw new RequestNotPossibleException('این سوال در آزمونی اضافه شده است');
    } else {
      return await this.repository.remove(question);
    }
  }
  async descriptiveExamQuestion(
    examPerson: number,
  ): Promise<ReadQuestionDto[]> {
    const data = await this.repository.descriptiveExamQuestion(examPerson);
    return this.mapper.mapArray(data, Question, ReadQuestionDto);
  }

  async create(data: CreateQuestionDto): Promise<ReadQuestionDto> {
    const instance = this.mapper.map(data, CreateQuestionDto, Question);
    const saveResult = await this.repository.save(instance);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, Question, ReadQuestionDto);
    else throw new OperationNotSuccessfulException();
  }

  async update(id: number, data: any): Promise<ReadQuestionDto> {
    const question = await this.repository.findOne({
      where: { id: id },
    });
    if (!question) throw new RequestedInfoNotFoundException();

    question.questionTitle = data.questionTitle;
    question.answerDescription = data.answerDescription;
    question.difficultyLevelId = data.difficultyLevelId;
    question.questionSubjectId = data.questionSubjectId;
    question.attachments = data.files;
    question.options = data.options;
    question.isDescriptive = data.isDescriptive;

    return this.mapper.map(
      await this.repository.save(question),
      Question,
      ReadQuestionDto,
    );
  }

  async getById(id: number): Promise<any> {
    const result = await this.repository.findById(id);
    if (!result) throw new RequestedInfoNotFoundException();
    // const t =this.mapper.map(result, Question, ReadQuestionDto)
    return result;
  }

  async getAllWithFilter(
    filterParam: GetQuestionsFilterDto,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadQuestionDto>> {
    const [data, count] = await this.repository.getAllWithFilter(
      filterParam,
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Question, ReadQuestionDto),
    };
  }

  async getAllByExamPersonId(
    examPersonId: number,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadQuestionDto>> {
    const [data, count] = await this.repository.getAllByExamPersonId(
      examPersonId,
      sortParam,
      page,
      pageLimit,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Question, ReadQuestionDto),
    };
  }
}
