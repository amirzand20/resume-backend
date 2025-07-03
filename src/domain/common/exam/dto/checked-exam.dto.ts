import { ExamStatus } from '@/common/enums/exam-status.enum';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CheckedExamDto {
  constructor(
    canPrintCart: boolean,
    hasQuestionSeriesCountProblem: boolean,
    asignedPersonCount: number,
    examStatus: ExamStatus,
    hasAssignQuestionProblem: boolean,
    isDifficultyMetaValid: boolean,
  ) {
    this.canPrintCart = canPrintCart;
    this.hasQuestionSeriesCountProblem = hasQuestionSeriesCountProblem;
    this.asignedPersonCount = asignedPersonCount;
    this.examStatus = examStatus;
    this.hasAssignQuestionProblem = hasAssignQuestionProblem;
    this.isDifficultyMetaValid = isDifficultyMetaValid;
  }

  @ApiProperty()
  canPrintCart: boolean;
  @ApiProperty()
  hasQuestionSeriesCountProblem: boolean;
  @ApiProperty()
  asignedPersonCount: number;

  @ApiProperty({
    enum: ExamStatus,
    enumName: 'ExamStatus',
    type: Number,
  })
  examStatus: ExamStatus;
  @ApiProperty()
  hasAssignQuestionProblem: boolean;
  @ApiProperty()
  isDifficultyMetaValid: boolean;
}
