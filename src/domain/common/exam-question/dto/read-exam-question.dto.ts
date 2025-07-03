import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadQuestionDto } from '../../question/dto/read-question.dto';
import { ReadPublicExamQuestionDto } from './read-public-exam-question.dto';

export class ReadExamQuestionDto extends ReadPublicExamQuestionDto {
  @ApiProperty({ type: () => ReadQuestionDto })
  @AutoMap(() => ReadQuestionDto)
  question: ReadQuestionDto;
}
