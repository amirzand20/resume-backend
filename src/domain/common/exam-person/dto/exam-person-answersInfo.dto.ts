import { ApiProperty } from '@nestjs/swagger';

export class ExamPersonAnswersInfoDto {
  totalExamQuestion: number;
  totalAnsweredQuestion: number;
  totalRemainQuestion: number;
}
export class ExamPersonMultipleChoicesInfoDto {
  @ApiProperty()
  total: number;
  @ApiProperty()
  answered: number;
  @ApiProperty()
  remaining: number;
  @ApiProperty()
  corrects: number;
  @ApiProperty()
  negatives: number;
  @ApiProperty()
  score: number;
}
export class ExamPersonDescriptivesInfoDto {
  @ApiProperty()
  total: number;
  @ApiProperty()
  answered: number;
  @ApiProperty()
  remaining: number;
}

export class ExamPersonAnswersResultsInfoDto extends ExamPersonAnswersInfoDto {
  @ApiProperty()
  multipleChoices: ExamPersonMultipleChoicesInfoDto;
  @ApiProperty()
  descriptives: ExamPersonDescriptivesInfoDto;
}
