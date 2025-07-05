import { ApiProperty } from '@nestjs/swagger';

export class ReadSkillDto {
  @ApiProperty({ description: 'Skill ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Skill ID' })
  skillId: number;

  @ApiProperty({ description: 'Level ID' })
  levelId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 