import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '../../base-info-item/dto/read-base-info-item.dto';
import { ReadExamQuestionDto } from '../../exam-question/dto/read-exam-question.dto';
import { ReadQuestionAttachmentDto } from '../../question-attachment/dto/read-question-attachment.dto';
import { ReadQuestionOptionDto } from '../../question-option/dto/read-question-option.dto';
import { ReadQuestionSubjectDto } from '../../question-subject/dto/read-question-subject.dto';
import { ReadAnswerSubmissionDto } from '../../exam-answer-submission/dto/read-exam-answer-submission.dto';
import { ReadPublicQuestionDto } from './read-public-question.dto';

export class ReadQuestionDto extends ReadPublicQuestionDto {
  @AutoMap(() => ReadQuestionOptionDto)
  @ApiProperty({ type: [ReadQuestionOptionDto] })
  options: ReadQuestionOptionDto[];
}
