import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID, IsBoolean } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Grade ID' })
  @IsNumber()
  gradeId: number;

  @ApiProperty({ description: 'Level ID' })
  @IsNumber()
  levelId: number;

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

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Is Active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 