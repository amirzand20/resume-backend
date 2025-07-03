import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, Min,Max} from "class-validator";

export class SubmitScoreAnswerSubmissionDto {
  @Min(0, { message: 'نمره سوال نباید کمتر از ۰ باشد.' })
  @Max(100, { message: 'نمره سوال نباید بیشتر از ۱۰۰ باشد.' })
  @IsNumber({}, { message: 'نمره سوال باید عدد باشد' })
  @IsNotEmpty({ message: 'نمره سوال نمی تواند خالی باشد' })
  @ApiProperty({ required: true })
  @AutoMap()
  score: number;
}
