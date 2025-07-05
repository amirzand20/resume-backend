import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateLanguageInfoDto {
  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Language ID', required: false })
  @IsOptional()
  @IsNumber()
  languageId?: number;

  @ApiProperty({ description: 'Reading Level ID', required: false })
  @IsOptional()
  @IsNumber()
  readingLevelId?: number;

  @ApiProperty({ description: 'Writing Level ID', required: false })
  @IsOptional()
  @IsNumber()
  writingLevelId?: number;

  @ApiProperty({ description: 'Conversation Level ID', required: false })
  @IsOptional()
  @IsNumber()
  conversationLevelId?: number;

  @ApiProperty({ description: 'Comment', required: false })
  @IsOptional()
  @IsNumber()
  comment?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;
} 