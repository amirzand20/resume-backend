import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadVolunteerInfoDto } from '@/domain/common/volunteer-info/dto/read-volunteer-info.dto';
import { ReadQuestionDto } from '@/domain/common/question/dto/read-question.dto';
import { ReadQuestionOptionDto } from '@/domain/common/question-option/dto/read-question-option.dto';
import { ReadExamDto } from '@/domain/common/exam/dto/read-exam.dto';
import { ReadExamPersonDto } from '../../exam-person/dto/read-exam-person.dto';
import { ReadPublicAnswerSubmissionDto } from './read-public-exam-answer-submission.dto';

export class ReadAnswerSubmissionDto extends ReadPublicAnswerSubmissionDto {
  @ApiProperty({ nullable: true, type: () => ReadQuestionDto })
  @AutoMap(() => ReadQuestionDto)
  question?: ReadQuestionDto;

  @ApiProperty({ nullable: true, type: () => ReadQuestionOptionDto })
  @AutoMap(() => ReadQuestionOptionDto)
  questionOption?: ReadQuestionOptionDto;
}
