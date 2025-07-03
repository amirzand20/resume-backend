import {SortParam} from '@/common/dto/request-params/sort-param';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException,} from '@/common/utils/exception';
import {AnswerSubmission} from '@/entities/exam-answer-submission.entity';
import {Mapper} from '@automapper/core';
import {InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {In} from 'typeorm';
import {CreateAnswerSubmissionDto} from './dto/create-exam-answer-submission.dto';
import {ReadAnswerSubmissionDto} from './dto/read-exam-answer-submission.dto';
import {UpdateAnswerSubmissionDto} from './dto/update-exam-answer-submission.dto';
import {AnswerSubmissionRepository} from './exam-answer-submission.repository';
import {ExamPersonRepository} from '../exam-person/exam-person.repository';
import {QuestionOptionRepository} from '../question-option/question-option.repository';
import {ExamQuestionTypeEnum} from '@/common/enums/exam-question-type.enum';
import {UpdateDescriptiveExamDto} from "@/domain/common/exam-person/dto/updateDescriptiveExam.dto";

@Injectable()
export class AnswerSubmissionService extends TypeOrmCrudService<AnswerSubmission> {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: AnswerSubmissionRepository,
        private readonly examPersonRepository: ExamPersonRepository,
        private readonly questionOptionRepository: QuestionOptionRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<AnswerSubmission> {
        const criteria = {id: id};
        const exam = await this.repository.findOne({where: criteria});
        if (!exam) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(exam);
    }

    async rectifyDescriptiveExam(data:UpdateDescriptiveExamDto): Promise<any> {
        const values = data.ids.map((m,idx)=>`(${m},${data.scores[idx]})`)
        return this.repository.rectifyDescriptive(values);

    }

    async create(
        data: CreateAnswerSubmissionDto,
    ): Promise<ReadAnswerSubmissionDto> {
        const instance = await this.repository.findOne({
            where: {examPersonId: data.examPersonId, questionId: data.questionId},
        });
        const answer =
            instance ??
            this.mapper.map(data, CreateAnswerSubmissionDto, AnswerSubmission);
        if (!data.answerDescription && !data.optionId) {
            if (instance) {
                await this.deleteById(instance.id);
                // await this.updateExamScore(data.examPersonId);
            } else answer.id = 0;
            answer.optionId = null;
            answer.answerDescription = null;
            return this.mapper.map(answer, AnswerSubmission, ReadAnswerSubmissionDto);
        }

        if (data.optionId) {
            const op = await this.questionOptionRepository.findOne({
                where: {id: data.optionId},
            });
            answer.score = op?.isCorrect ? 100 : 0;
        }

        answer.optionId = data.optionId;
        answer.answerDescription = data.answerDescription;
        const saveResult = await this.repository.save(answer);

        if (saveResult.id > 0) {
            // await this.updateExamScore(data.examPersonId);
            return this.mapper.map(
                saveResult,
                AnswerSubmission,
                ReadAnswerSubmissionDto,
            );
        } else throw new OperationNotSuccessfulException();
    }

    async update(
        id: number,
        data: UpdateAnswerSubmissionDto,
    ): Promise<ReadAnswerSubmissionDto> {
        const answerSubmission = await this.repository.findOne({
            where: {id: id},
        });

        if (!answerSubmission) throw new RequestedInfoNotFoundException();

        // answerSubmission.answerSubmissionTime = data.answerSubmissionTime;
        answerSubmission.questionId = data.questionId;
        answerSubmission.examPersonId = data.examPersonId;
        answerSubmission.optionId = data.optionId;
        answerSubmission.answerDescription = data.answerDescription;

        if (data.optionId) {
            const op = await this.questionOptionRepository.findOne({
                where: {id: data.optionId},
            });
            answerSubmission.score = op?.isCorrect ? 100 : 0;
        } else answerSubmission.score = undefined;

        const instance = await this.repository.save(answerSubmission);
        if (instance.id > 0) {
            // await this.updateExamScore(data.examPersonId);
            return this.mapper.map(
                instance,
                AnswerSubmission,
                ReadAnswerSubmissionDto,
            );
        } else throw new OperationNotSuccessfulException();
    }

    // async updateScore(
    //   id: number,
    //   data: SubmitScoreAnswerSubmissionDto,
    // ): Promise<ReadAnswerSubmissionDto> {
    //   const answerSubmission = await this.repository.findOne({
    //     where: {
    //       id: id,
    //       examPerson: {
    //         exam: { examQuestionType: ExamQuestionTypeEnum.explanation },
    //       },
    //     },
    //   });
    //
    //   if (!answerSubmission) throw new RequestedInfoNotFoundException();
    //
    //   // answerSubmission.answerSubmissionTime = data.answerSubmissionTime;
    //   answerSubmission.score = data.score;
    //   const instance = await this.repository.save(answerSubmission);
    //   if (instance.id > 0) {
    //     // await this.updateExamScore(answerSubmission.examPersonId);
    //     return this.mapper.map(
    //       instance,
    //       AnswerSubmission,
    //       ReadAnswerSubmissionDto,
    //     );
    //   } else throw new OperationNotSuccessfulException();
    // }

    async getById(id: number): Promise<ReadAnswerSubmissionDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, AnswerSubmission, ReadAnswerSubmissionDto);
    }

    async getAll(
        filterParam: any,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit,
        );

        return {
            total: count,
            data: this.mapper.mapArray(
                data,
                AnswerSubmission,
                ReadAnswerSubmissionDto,
            ),
        };
    }

    async getAllByExamPersonId(
        examPersonId: number,
        examQuestionType?: ExamQuestionTypeEnum,
    ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
        const [data, count] = await this.repository.findAndCount({
            where: {
                examPerson: {
                    exam: {examQuestionType},
                },
                examPersonId,
            },
            relations: {
                question: {attachments: true},
                examPerson: {volunteerInfo: true, personal: true},
            },
        });

        return {
            total: count,
            data: this.mapper.mapArray(
                data,
                AnswerSubmission,
                ReadAnswerSubmissionDto,
            ),
        };
    }

    // async updateExamScore(examPersonId: number) {
    //   const answers = await this.repository.find({
    //     where: { examPersonId, score: Not(IsNull()) },
    //   });
    //   const score = answers.reduce((prev, cur) => {
    //     return prev + (cur.score ?? 0) / 100.0;
    //   }, 0);
    //   await this.examPersonRepository.update(
    //     {
    //       id: examPersonId,
    //     },
    //     {
    //       score,
    //     },
    //   );
    // }
}
