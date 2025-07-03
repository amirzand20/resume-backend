import { ReadBaseInfoItemDto } from '@/domain/common/base-info-item/dto/read-base-info-item.dto';
import { CreateQuestionAttachmentDto } from '@/domain/common/question-attachment/dto/create-question-attachment.dto';
import { ReadQuestionAttachmentDto } from '@/domain/common/question-attachment/dto/read-question-attachment.dto';
import { CreateQuestionOptionDto } from '@/domain/common/question-option/dto/create-question-option.dto';
import { ReadQuestionOptionDto } from '@/domain/common/question-option/dto/read-question-option.dto';
import { ReadQuestionSubjectDto } from '@/domain/common/question-subject/dto/read-question-subject.dto';
import { CreateQuestionDto } from '@/domain/common/question/dto/create-question.dto';
import { ReadQuestionDto } from '@/domain/common/question/dto/read-question.dto';
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { ExamQuestion } from '@/entities/exam-question.entity';
import { QuestionAttachment } from '@/entities/question-attachment.entity';
import { QuestionOption } from '@/entities/question-option.entity';
import { QuestionSubject } from '@/entities/question-subject.entity';
import { Question } from '@/entities/question.entity';
import { Mapper, createMap, forMember, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadAnswerSubmissionDto } from '../exam-answer-submission/dto/read-exam-answer-submission.dto';
import { ReadExamQuestionDto } from '../exam-question/dto/read-exam-question.dto';
import { ReadPublicQuestionDto } from './dto/read-public-question.dto';
import { ReadPublicQuestionOptionDto } from '../question-option/dto/read-public-question-option.dto';
import { ReadPublicAnswerSubmissionDto } from '../exam-answer-submission/dto/read-public-exam-answer-submission.dto';
import { ReadPublicExamQuestionDto } from '../exam-question/dto/read-public-exam-question.dto';

@Injectable()
export class QuestionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateQuestionDto,
        Question,
        forMember(
          (d) => d.attachments,
          mapWith(
            QuestionAttachment,
            CreateQuestionAttachmentDto,
            (s) => s.files,
          ),
        ),
        forMember(
          (d) => d.options,
          mapWith(QuestionOption, CreateQuestionOptionDto, (s) => s.options),
        ),
      );

      createMap(
        mapper,
        ReadQuestionDto,
        Question,
        forMember(
          (d) => d.options,
          mapWith(QuestionOption, ReadQuestionOptionDto, (s) => s.options),
        ),
        forMember(
          (d) => d.examQuestions,
          mapWith(ExamQuestion, ReadExamQuestionDto, (s) => s.examQuestions),
        ),
        forMember(
          (d) => d.attachments,
          mapWith(
            QuestionAttachment,
            ReadQuestionAttachmentDto,
            (s) => s.files,
          ),
        ),
      );
      createMap(
        mapper,
        Question,
        ReadQuestionDto,
        forMember(
          (d) => d.answer,
          mapWith(ReadAnswerSubmissionDto, AnswerSubmission, (s) =>
            s.answerSubmissions?.length ? s.answerSubmissions[0] : null,
          ),
        ),
        forMember(
          (d) => d.difficultyLevel,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.difficultyLevel),
        ),
        forMember(
          (d) => d.files,
          mapWith(
            ReadQuestionAttachmentDto,
            QuestionAttachment,
            (s) => s.attachments,
          ),
        ),
        forMember(
          (d) => d.questionSubject,
          mapWith(
            ReadQuestionSubjectDto,
            QuestionSubject,
            (s) => s.questionSubject,
          ),
        ),
        forMember(
          (d) => d.options,
          mapWith(ReadQuestionOptionDto, QuestionOption, (s) => s.options),
        ),
        forMember(
          (d) => d.examQuestions,
          mapWith(ReadExamQuestionDto, ExamQuestion, (s) => s.examQuestions),
        ),
      );

      createMap(
        mapper,
        Question,
        ReadPublicQuestionDto,
        forMember(
          (d) => d.answer,
          mapWith(ReadPublicAnswerSubmissionDto, AnswerSubmission, (s) =>
            s.answerSubmissions?.length ? s.answerSubmissions[0] : null,
          ),
        ),
        forMember(
          (d) => d.difficultyLevel,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.difficultyLevel),
        ),
        forMember(
          (d) => d.files,
          mapWith(
            ReadQuestionAttachmentDto,
            QuestionAttachment,
            (s) => s.attachments,
          ),
        ),
        forMember(
          (d) => d.questionSubject,
          mapWith(
            ReadQuestionSubjectDto,
            QuestionSubject,
            (s) => s.questionSubject,
          ),
        ),
        forMember(
          (d) => d.options,
          mapWith(
            ReadPublicQuestionOptionDto,
            QuestionOption,
            (s) => s.options,
          ),
        ),
        forMember(
          (d) => d.examQuestions,
          mapWith(
            ReadPublicExamQuestionDto,
            ExamQuestion,
            (s) => s.examQuestions,
          ),
        ),
      );
    };
  }
}
