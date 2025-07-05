import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCourseEducationGradeDto {
  @ApiProperty({ description: 'Course ID' })
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'Education Grade ID' })
  @IsNumber()
  educationGradeId: number;

  @ApiProperty({ description: 'Education Field ID', required: false })
  @IsOptional()
  @IsNumber()
  educationFieldId?: number;

  @ApiProperty({ description: 'Adjusted Min' })
  @IsNumber()
  adjustedMin: number;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;
} 