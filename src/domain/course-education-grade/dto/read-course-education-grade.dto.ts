import { ApiProperty } from '@nestjs/swagger';

export class ReadCourseEducationGradeDto {
  @ApiProperty({ description: 'Course Education Grade ID' })
  id: number;

  @ApiProperty({ description: 'Course ID' })
  courseId: number;

  @ApiProperty({ description: 'Education Grade ID' })
  educationGradeId: number;

  @ApiProperty({ description: 'Education Field ID' })
  educationFieldId: number;

  @ApiProperty({ description: 'Adjusted Min' })
  adjustedMin: number;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 