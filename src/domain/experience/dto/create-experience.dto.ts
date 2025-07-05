import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Job Title' })
  @IsString()
  jobTitle: string;

  @ApiProperty({ description: 'Company Name' })
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Company Location ID' })
  @IsNumber()
  companyLocationId: number;

  @ApiProperty({ description: 'Start Date' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'End Date', required: false })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;
} 