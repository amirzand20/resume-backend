import { ApiProperty } from '@nestjs/swagger';

export class ReadPersonnelInCourseDto {
  @ApiProperty({ description: 'Personnel In Course ID' })
  id: number;

  @ApiProperty({ description: 'Course Field ID' })
  courseFieldId: number;

  @ApiProperty({ description: 'Applicant ID' })
  applicantId: number;

  @ApiProperty({ description: 'Volunteer Code' })
  volunteerCode: number;

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