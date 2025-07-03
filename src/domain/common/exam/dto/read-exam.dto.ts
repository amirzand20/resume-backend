import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { ReadBaseInfoItemDto } from '../../base-info-item/dto/read-base-info-item.dto';
import { PersonAssignStatus } from '@/common/enums/person-assign-status.enum';
import { ExamStatus } from '@/common/enums/exam-status.enum';

export class ReadExamDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  examTitle: string;

  @ApiProperty()
  @AutoMap()
  examTypeId: number;

  @ApiProperty()
  @AutoMap()
  personAssignStatus?: PersonAssignStatus;

  @ApiProperty()
  @AutoMap()
  status?: ExamStatus;

  @ApiProperty()
  @AutoMap()
  questionCount: number;

  @ApiProperty()
  @AutoMap()
  seriesCount: number;

  @AutoMap()
  @ApiProperty()
  examHoldId: number;

  @ApiProperty()
  @AutoMap()
  examScopeId: number;

  @ApiProperty()
  @AutoMap()
  hasNegativeScore: boolean;

  @AutoMap()
  @ApiProperty()
  duration: number;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  maxScore: number;

  @ApiProperty()
  @AutoMap()
  examQuestionType: number;

  @AutoMap()
  @ApiProperty()
  fromDate: Date;

  @AutoMap()
  @ApiProperty()
  toDate: Date;

  @ApiProperty()
  @AutoMap()
  canPrintCart: boolean;

  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  @AutoMap(() => ReadBaseInfoItemDto)
  examType: ReadBaseInfoItemDto;

  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  @AutoMap(() => ReadBaseInfoItemDto)
  examHold: ReadBaseInfoItemDto;

  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  @AutoMap(() => ReadBaseInfoItemDto)
  examScope: ReadBaseInfoItemDto;

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
