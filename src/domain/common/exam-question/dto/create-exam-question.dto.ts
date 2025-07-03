import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateExamQuestionItemDto } from './create-exam-question-item.dto';

export class CreateExamQuestionDto {
  @ApiProperty({ type: () => [CreateExamQuestionItemDto] })
  questions: CreateExamQuestionItemDto[];

  @ApiProperty()
  examId: number;
}
