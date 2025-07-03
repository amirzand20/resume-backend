import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UpdateExamDifficultyDto {
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
