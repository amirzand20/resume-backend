import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID, IsBoolean } from 'class-validator';

export class UpdateEducationDto {
  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Grade ID', required: false })
  @IsOptional()
  @IsNumber()
  gradeId?: number;

  @ApiProperty({ description: 'Level ID', required: false })
  @IsOptional()
  @IsNumber()
  levelId?: number;

  @ApiProperty({ description: 'Field ID', required: false })
  @IsOptional()
  @IsNumber()
  fieldId?: number;

  @ApiProperty({ description: 'Institute ID', required: false })
  @IsOptional()
  @IsNumber()
  instituteId?: number;

  @ApiProperty({ description: 'Graduation Date', required: false })
  @IsOptional()
  @IsDate()
  graduationDate?: Date;

  @ApiProperty({ description: 'Adjusted', required: false })
  @IsOptional()
  @IsNumber()
  adjusted?: number;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 