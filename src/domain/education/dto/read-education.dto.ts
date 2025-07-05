import { ApiProperty } from '@nestjs/swagger';

export class ReadEducationDto {
  @ApiProperty({ description: 'Education ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Grade ID' })
  gradeId: number;

  @ApiProperty({ description: 'Level ID' })
  levelId: number;

  @ApiProperty({ description: 'Field ID' })
  fieldId: number;

  @ApiProperty({ description: 'Institute ID' })
  instituteId: number;

  @ApiProperty({ description: 'Graduation Date' })
  graduationDate: Date;

  @ApiProperty({ description: 'Adjusted' })
  adjusted: number;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Is Active' })
  isActive: boolean;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 