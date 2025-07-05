import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCourseEducationGradeDto {
  @ApiProperty({ description: 'Course ID', required: false })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiProperty({ description: 'Education Grade ID', required: false })
  @IsOptional()
  @IsNumber()
  educationGradeId?: number;

  @ApiProperty({ description: 'Education Field ID', required: false })
  @IsOptional()
  @IsNumber()
  educationFieldId?: number;

  @ApiProperty({ description: 'Adjusted Min', required: false })
  @IsOptional()
  @IsNumber()
  adjustedMin?: number;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;
} 