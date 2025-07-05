import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCourseFieldDto {
  @ApiProperty({ description: 'Course ID', required: false })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiProperty({ description: 'Course Field ID', required: false })
  @IsOptional()
  @IsNumber()
  courseFieldId?: number;

  @ApiProperty({ description: 'Capacity', required: false })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;
} 