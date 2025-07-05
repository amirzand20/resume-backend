import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'Employee Type ID' })
  @IsNumber()
  employeeTypeId: number;

  @ApiProperty({ description: 'Employee Force ID' })
  @IsNumber()
  employeeForceId: number;

  @ApiProperty({ description: 'Course Title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Start Date' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'End Date' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'Recruitment Status ID' })
  @IsNumber()
  recruitmentStatusId: number;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;
} 