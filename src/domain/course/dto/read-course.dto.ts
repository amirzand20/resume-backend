import { ApiProperty } from '@nestjs/swagger';

export class ReadCourseDto {
  @ApiProperty({ description: 'Course ID' })
  id: number;

  @ApiProperty({ description: 'Employee Type ID' })
  employeeTypeId: number;

  @ApiProperty({ description: 'Employee Force ID' })
  employeeForceId: number;

  @ApiProperty({ description: 'Course Title' })
  title: string;

  @ApiProperty({ description: 'Start Date' })
  startDate: Date;

  @ApiProperty({ description: 'End Date' })
  endDate: Date;

  @ApiProperty({ description: 'Recruitment Status ID' })
  recruitmentStatusId: number;

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