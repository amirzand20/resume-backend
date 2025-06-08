import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ResumeSearchDto {
  @ApiProperty({ required: false, description: 'Search by name (first or last name)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'Filter by birth place ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  birthPlaceId?: number;

  @ApiProperty({ required: false, description: 'Filter by location place ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  locationPlaceId?: number;

  @ApiProperty({ required: false, description: 'Filter by sex ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sexId?: number;

  @ApiProperty({ required: false, description: 'Search by skills' })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiProperty({ required: false, description: 'Search by education' })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiProperty({ required: false, description: 'Search by experience' })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({ required: false, description: 'Search by language' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false, description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Items per page for pagination', default: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;
}

export class ResumeSearchResponseDto {
  @ApiProperty({ description: 'List of resumes matching the search criteria' })
  data: any[];

  @ApiProperty({ description: 'Total number of matching resumes' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ description: 'Number of pages' })
  pageCount: number;
} 