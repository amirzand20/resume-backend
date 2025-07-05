import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdatePersonnelInCourseDto {
  @ApiProperty({ description: 'Course Field ID', required: false })
  @IsOptional()
  @IsNumber()
  courseFieldId?: number;

  @ApiProperty({ description: 'Applicant ID', required: false })
  @IsOptional()
  @IsNumber()
  applicantId?: number;

  @ApiProperty({ description: 'Volunteer Code', required: false })
  @IsOptional()
  @IsNumber()
  volunteerCode?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;
} 