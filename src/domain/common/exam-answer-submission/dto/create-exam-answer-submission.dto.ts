import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerSubmissionDto {
  @AutoMap()
  @ApiProperty()
  questionId: number;

  @AutoMap()
  @ApiProperty()
  examPersonId: number;

  @AutoMap()
  @ApiProperty()
  optionId?: number;

  @AutoMap()
  @ApiProperty()
  answerDescription?: string;
}
