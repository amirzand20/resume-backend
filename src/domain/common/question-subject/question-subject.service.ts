import {OperationNotSuccessfulException, RequestedInfoNotFoundException,} from '@/common/utils/exception';
import {QuestionSubject} from '@/entities/question-subject.entity';
import {Mapper} from '@automapper/core';
import {InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {IsNull} from 'typeorm';
import {QuestionSubjectRepository} from "@/domain/common/question-subject/question-subject.repository";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {CreateQuestionSubjectDto} from "@/domain/common/question-subject/dto/create-question-subject.dto";
import { ReadQuestionSubjectDto } from './dto/read-question-subject.dto';

@Injectable()
export class QuestionSubjectService extends TypeOrmCrudService<QuestionSubject> {
    constructor(
        private readonly repository: QuestionSubjectRepository,
        @InjectMapper() private readonly mapper: Mapper,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<QuestionSubject> {
        const criteria = {id: id};
        const questionSubject = await this.repository.findOne({where: criteria});
        if (!questionSubject) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(questionSubject);
    }

    async getById(id: number): Promise<ReadQuestionSubjectDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return await this.mapper.mapAsync(
            result,
            QuestionSubject,
            ReadQuestionSubjectDto,
        );
    }

    async getRootParent(): Promise<ReadQuestionSubjectDto> {
        const result = await this.repository.findOne({
            where: {parentId: IsNull()},
            relations: ['children'],
        });
        if (!result) throw new RequestedInfoNotFoundException();
        return await this.mapper.mapAsync(
            result,
            QuestionSubject,
            ReadQuestionSubjectDto,
        );
    }

    async getAllChild(
        id: number,
    ): Promise<QueryListResultDto<ReadQuestionSubjectDto>> {
        const [data, count] = await this.repository.getAllChild(id);
        const _AllChild = this.mapper.mapArray(
            data,
            QuestionSubject,
            ReadQuestionSubjectDto,
        );
        return {
            total: count,
            data: _AllChild,
        };
    }

    async create(
        data: CreateQuestionSubjectDto,
    ): Promise<ReadQuestionSubjectDto> {
        const _QuestionSubject = this.mapper.map(
            data,
            CreateQuestionSubjectDto,
            QuestionSubject,
        );
        const parentSubject = await this.repository.findOne({
            where: {id: data.parentId},
        });
        if (parentSubject) {
            _QuestionSubject.parent = parentSubject;
        }
        const saveResult = await this.repository.save(_QuestionSubject);
        if (saveResult.id > 0)
            return this.mapper.map(
                saveResult,
                QuestionSubject,
                ReadQuestionSubjectDto,
            );
        else throw new OperationNotSuccessfulException();
    }

    async update(
        id: number,
        data: CreateQuestionSubjectDto,
    ): Promise<ReadQuestionSubjectDto> {
        const _questionSubject = await this.repository.findOne({
            where: {id: id},
        });

        if (!_questionSubject) throw new RequestedInfoNotFoundException();

        _questionSubject.parentId = data.parentId;
        _questionSubject.title = data.title;
        return this.mapper.map(
            await this.repository.save(_questionSubject),
            QuestionSubject,
            ReadQuestionSubjectDto,
        );
    }
}
