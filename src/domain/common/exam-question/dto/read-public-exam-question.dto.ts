import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadExamDto } from '../../exam/dto/read-exam.dto';
import { ReadPublicQuestionDto } from '../../question/dto/read-public-question.dto';

export class ReadPublicExamQuestionDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  questionId: number;

  @ApiProperty()
  @AutoMap()
  order: number;

  @ApiProperty()
  @AutoMap()
  examId: number;

  @ApiProperty({ type: () => ReadPublicQuestionDto })
  @AutoMap(() => ReadPublicQuestionDto)
  question: ReadPublicQuestionDto;

  @ApiProperty({ type: () => ReadExamDto })
  @AutoMap(() => ReadExamDto)
  exam: ReadExamDto;
}
