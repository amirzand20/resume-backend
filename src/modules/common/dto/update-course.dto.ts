import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsDate, IsUUID, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCourseDto {
  @ApiProperty({ description: 'Employee Type ID', example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Employee Type ID must be an integer' })
  employeeTypeId?: number;

  @ApiProperty({ description: 'Employee Force ID', example: 2, required: false })
  @IsOptional()
  @IsInt({ message: 'Employee Force ID must be an integer' })
  employeeForceId?: number;

  @ApiProperty({ description: 'Course title', example: 'Advanced JavaScript Programming', required: false })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @ApiProperty({ description: 'Course start date', example: '2023-01-01', required: false })
  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({ description: 'Course end date', example: '2023-06-30', required: false })
  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({ description: 'Recruitment Status ID', example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Recruitment Status ID must be an integer' })
  recruitmentStatusId?: number;

  @ApiProperty({ description: 'Created Method ID', example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Created Method ID must be an integer' })
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID('4', { message: 'Table ID must be a valid UUID' })
  tableId?: string;

  @ApiProperty({ description: 'Education Grade IDs', type: [Number], required: false })
  @IsOptional()
  @IsArray({ message: 'Education Grades must be an array' })
  @IsInt({ each: true, message: 'Each Education Grade ID must be an integer' })
  educationGradeIds?: number[];

  @ApiProperty({ description: 'Course Field IDs', type: [Number], required: false })
  @IsOptional()
  @IsArray({ message: 'Course Fields must be an array' })
  @IsInt({ each: true, message: 'Each Course Field ID must be an integer' })
  courseFieldIds?: number[];
} 