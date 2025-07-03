import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadVolunteerInfoDto } from '@/domain/common/volunteer-info/dto/read-volunteer-info.dto';
import { ReadQuestionDto } from '@/domain/common/question/dto/read-question.dto';
import { ReadQuestionOptionDto } from '@/domain/common/question-option/dto/read-question-option.dto';
import { ReadExamDto } from '@/domain/common/exam/dto/read-exam.dto';
import { ReadExamPersonDto } from '../../exam-person/dto/read-exam-person.dto';
import { ReadPublicQuestionDto } from '../../question/dto/read-public-question.dto';
import { ReadPublicQuestionOptionDto } from '../../question-option/dto/read-public-question-option.dto';

export class ReadPublicAnswerSubmissionDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  questionId: number;

  @ApiProperty()
  @AutoMap()
  optionId: number;

  @ApiProperty({ required: false })
  @AutoMap()
  score?: number;

  @ApiProperty()
  @AutoMap()
  answerDescription: string;

  @ApiProperty({ nullable: true, type: () => ReadQuestionDto })
  @AutoMap(() => ReadQuestionDto)
  question?: ReadPublicQuestionDto;

  @ApiProperty({ nullable: true, type: () => ReadExamPersonDto })
  @AutoMap(() => ReadExamPersonDto)
  examPerson?: ReadExamPersonDto;

  @ApiProperty({ nullable: true, type: () => ReadQuestionOptionDto })
  @AutoMap(() => ReadQuestionOptionDto)
  questionOption?: ReadPublicQuestionOptionDto;
}
