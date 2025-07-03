import { ExamQuestion } from '@/entities/exam-question.entity';
import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadExamQuestionDto } from './dto/read-exam-question.dto';
import { Question } from '@/entities/question.entity';
import { Exam } from '@/entities/exam.entity';
import { ReadExamDto } from '../exam/dto/read-exam.dto';
import { ReadQuestionDto } from '../question/dto/read-question.dto';
import { CreateExamQuestionItemDto } from './dto/create-exam-question-item.dto';
import { ReadPublicExamQuestionDto } from './dto/read-public-exam-question.dto';
import { ReadPublicQuestionDto } from '../question/dto/read-public-question.dto';

@Injectable()
export class ExamQuestionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ReadExamQuestionDto,
        ExamQuestion,
        forMember(
          (d) => d.question,
          mapWith(Question, ReadQuestionDto, (s) => s.question),
        ),
        forMember(
          (d) => d.exam,
          mapWith(Exam, ReadExamDto, (s) => s.exam),
        ),
        forMember(
          (des) => des.examId,
          mapFrom((source) => source.examId),
        ),
        forMember(
          (des) => des.questionId,
          mapFrom((source) => source.questionId),
        ),
      );
      createMap(
        mapper,
        ExamQuestion,
        ReadExamQuestionDto,
        forMember(
          (d) => d.question,
          mapWith(Question, ReadQuestionDto, (s) => s.question),
        ),
        forMember(
          (d) => d.exam,
          mapWith(Exam, ReadExamDto, (s) => s.exam),
        ),
        forMember(
          (des) => des.examId,
          mapFrom((source) => source.examId),
        ),
        forMember(
          (des) => des.questionId,
          mapFrom((source) => source.questionId),
        ),
      );
      createMap(mapper, CreateExamQuestionItemDto, ExamQuestion);

      createMap(
        mapper,
        ReadPublicExamQuestionDto,
        ExamQuestion,
        forMember(
          (d) => d.question,
          mapWith(Question, ReadPublicQuestionDto, (s) => s.question),
        ),
        forMember(
          (d) => d.exam,
          mapWith(Exam, ReadExamDto, (s) => s.exam),
        ),
        forMember(
          (des) => des.examId,
          mapFrom((source) => source.examId),
        ),
        forMember(
          (des) => des.questionId,
          mapFrom((source) => source.questionId),
        ),
      );
      createMap(
        mapper,
        ExamQuestion,
        ReadPublicExamQuestionDto,
        forMember(
          (d) => d.question,
          mapWith(ReadPublicQuestionDto, Question, (s) => s.question),
        ),
        forMember(
          (d) => d.exam,
          mapWith(ReadExamDto, Exam, (s) => s.exam),
        ),
        forMember(
          (des) => des.examId,
          mapFrom((source) => source.examId),
        ),
        forMember(
          (des) => des.questionId,
          mapFrom((source) => source.questionId),
        ),
      );
    };
  }
}
