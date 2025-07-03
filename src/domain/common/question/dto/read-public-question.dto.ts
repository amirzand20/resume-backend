import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '../../base-info-item/dto/read-base-info-item.dto';
import { ReadExamQuestionDto } from '../../exam-question/dto/read-exam-question.dto';
import { ReadQuestionAttachmentDto } from '../../question-attachment/dto/read-question-attachment.dto';
import { ReadQuestionOptionDto } from '../../question-option/dto/read-question-option.dto';
import { ReadQuestionSubjectDto } from '../../question-subject/dto/read-question-subject.dto';
import { ReadAnswerSubmissionDto } from '../../exam-answer-submission/dto/read-exam-answer-submission.dto';
import { ReadPublicQuestionOptionDto } from '../../question-option/dto/read-public-question-option.dto';

export class ReadPublicQuestionDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  questionTitle: string;

  @AutoMap()
  @ApiProperty()
  isDescriptive: boolean;

  @ApiProperty()
  @AutoMap()
  difficultyLevelId: number;

  @ApiProperty()
  @AutoMap()
  answerDescription: string;

  @ApiProperty()
  @AutoMap()
  questionSubjectId: number;

  @ApiProperty({ type: () => ReadQuestionSubjectDto })
  @AutoMap(() => ReadQuestionSubjectDto)
  questionSubject: ReadQuestionSubjectDto;

  @AutoMap()
  @ApiProperty({ type: [ReadQuestionAttachmentDto] })
  files: ReadQuestionAttachmentDto[];

  @AutoMap(() => ReadPublicQuestionOptionDto)
  @ApiProperty({ type: [ReadPublicQuestionOptionDto] })
  options: ReadPublicQuestionOptionDto[];

  @AutoMap(() => ReadAnswerSubmissionDto)
  @ApiProperty({ type: Array<ReadAnswerSubmissionDto> })
  answer?: ReadAnswerSubmissionDto;

  @AutoMap()
  @ApiProperty({ type: [ReadExamQuestionDto] })
  examQuestions?: ReadExamQuestionDto[];

  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  @AutoMap(() => ReadBaseInfoItemDto)
  difficultyLevel: ReadBaseInfoItemDto;
}
