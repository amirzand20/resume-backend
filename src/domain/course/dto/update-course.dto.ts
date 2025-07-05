import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({ description: 'Employee Type ID', required: false })
  @IsOptional()
  @IsNumber()
  employeeTypeId?: number;

  @ApiProperty({ description: 'Employee Force ID', required: false })
  @IsOptional()
  @IsNumber()
  employeeForceId?: number;

  @ApiProperty({ description: 'Course Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Start Date', required: false })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ description: 'End Date', required: false })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ description: 'Recruitment Status ID', required: false })
  @IsOptional()
  @IsNumber()
  recruitmentStatusId?: number;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;
} 