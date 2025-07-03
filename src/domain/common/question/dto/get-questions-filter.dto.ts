import { ExamQuestionTypeEnum } from '@/common/enums/exam-question-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetQuestionsFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  questionSubjectId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => String)
  difficultyLevelIds?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => String)
  questionTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => String)
  ids?: string;

  @ApiProperty({
    enum: ExamQuestionTypeEnum,
    enumName: 'ExamQuestionTypeEnum',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  questionType?: ExamQuestionTypeEnum;
}
