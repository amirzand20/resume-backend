import { ApiProperty } from '@nestjs/swagger';

export class ReadCourseFieldDto {
  @ApiProperty({ description: 'Course Field ID' })
  id: number;

  @ApiProperty({ description: 'Course ID' })
  courseId: number;

  @ApiProperty({ description: 'Course Field ID' })
  courseFieldId: number;

  @ApiProperty({ description: 'Capacity' })
  capacity: number;

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