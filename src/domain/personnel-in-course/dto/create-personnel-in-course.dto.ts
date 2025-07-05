import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreatePersonnelInCourseDto {
  @ApiProperty({ description: 'Course Field ID' })
  @IsNumber()
  courseFieldId: number;

  @ApiProperty({ description: 'Applicant ID' })
  @IsNumber()
  applicantId: number;

  @ApiProperty({ description: 'Volunteer Code' })
  @IsNumber()
  volunteerCode: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;
} 