import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExamQuestionItemDto {
  @ApiProperty()
  @AutoMap()
  questionId: number;

  @ApiProperty()
  @AutoMap()
  series: number;

  @ApiProperty()
  @AutoMap()
  order: number;
}
