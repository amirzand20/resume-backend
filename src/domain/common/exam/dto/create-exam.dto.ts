import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ExamQuestionTypeEnum } from '@/common/enums/exam-question-type.enum';
export class CreateExamDto {
  @AutoMap()
  @ApiProperty()
  examTitle: string;

  @AutoMap()
  @ApiProperty()
  examTypeId: number;

  @ApiProperty()
  @AutoMap()
  description: string;

  @AutoMap()
  @ApiProperty()
  @Min(1, { message: 'تعداد سری سوال نباید کمتر از ۱ باشد.' })
  @IsNumber({}, { message: 'تعداد سری سوال باید عدد باشد' })
  @IsNotEmpty({ message: 'تعداد سری سوال نمی تواند خالی باشد' })
  seriesCount: number;

  @AutoMap()
  @ApiProperty()
  @Min(1, { message: 'تعداد سوال نباید کمتر از ۱ باشد.' })
  @IsNumber({}, { message: 'تعداد سوال باید عدد باشد' })
  @IsNotEmpty({ message: 'تعداد سوال نمی تواند خالی باشد' })
  questionCount: number;

  @AutoMap()
  @ApiProperty()
  examHoldId: number;

  @ApiProperty()
  @AutoMap()
  @Min(1, { message: 'نمره آزمون نباید کمتر از ۱ باشد.' })
  @IsNumber({}, { message: 'نمره آزمون باید عدد باشد' })
  @IsNotEmpty({ message: 'نمره آزمون نمی تواند خالی باشد' })
  maxScore: number;

  @ApiProperty({
    enum: ExamQuestionTypeEnum,
    enumName: 'ExamQuestionTypeEnum',
    type: Number,
  })
  @AutoMap()
  @IsNotEmpty({ message: 'نوع سوال آزمون نمی تواند خالی باشد' })
  examQuestionType: ExamQuestionTypeEnum;

  @ApiProperty()
  @AutoMap()
  canPrintCart: boolean;

  @ApiProperty()
  @AutoMap()
  examScopeId: number;

  @ApiProperty()
  @AutoMap()
  hasNegativeScore: boolean;

  @AutoMap()
  @ApiProperty()
  duration: number;

  @AutoMap()
  @ApiProperty()
  fromDate: string;

  @AutoMap()
  @ApiProperty()
  toDate: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'number' },
    example: {
      '1': 5,
      '2': 5,
    },
  })
  @AutoMap()
  difficultyMeta?: Record<string, number>;
}
