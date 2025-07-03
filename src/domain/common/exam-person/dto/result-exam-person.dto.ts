import { ApiProperty } from '@nestjs/swagger';

export class ResultExamPersonDto {
  /**
   *
   */
  /**
   *
   */
  constructor(
    total: number,
    answered: number,
    remaining: number,
    corrects: number,
    negatives: number,
    score: number,
  ) {
    this.answered = answered;
    this.remaining = remaining;
    this.corrects = corrects;
    this.negatives = negatives;
    this.score = score;
    this.total = total;
  }
  // @ApiProperty()
  // totalExamQuestion: number;

  // @ApiProperty()
  // totalAnsweredQuestion: number;

  // @ApiProperty()
  // totalRemainQuestion: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  answered: number;

  @ApiProperty()
  remaining: number;

  @ApiProperty({ nullable: true })
  corrects: number;

  @ApiProperty({ nullable: true })
  negatives: number;

  @ApiProperty({ nullable: true })
  score?: number;
}
