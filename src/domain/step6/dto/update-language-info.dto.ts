import { IsOptional, IsNumber, IsUUID, Min, Max, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLanguageInfoDto {
  @ApiPropertyOptional({ description: 'شناسه فرد', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId?: number;

  @ApiPropertyOptional({ description: 'شناسه زبان', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه زبان باید عدد باشد' })
  languageId?: number;

  @ApiPropertyOptional({ description: 'سطح خواندن (1-5)', example: 3 })
  @IsOptional()
  @IsNumber({}, { message: 'سطح خواندن باید عدد باشد' })
  @Min(1)
  @Max(5)
  readingLevel?: number;

  @ApiPropertyOptional({ description: 'سطح نوشتن (1-5)', example: 3 })
  @IsOptional()
  @IsNumber({}, { message: 'سطح نوشتن باید عدد باشد' })
  @Min(1)
  @Max(5)
  writingLevel?: number;

  @ApiPropertyOptional({ description: 'سطح صحبت کردن (1-5)', example: 3 })
  @IsOptional()
  @IsNumber({}, { message: 'سطح صحبت کردن باید عدد باشد' })
  @Min(1)
  @Max(5)
  speakingLevel?: number;

  @ApiPropertyOptional({ description: 'سطح شنیداری (1-5)', example: 3 })
  @IsOptional()
  @IsNumber({}, { message: 'سطح شنیداری باید عدد باشد' })
  @Min(1)
  @Max(5)
  listeningLevel?: number;

  @ApiPropertyOptional({ description: 'شناسه روش ایجاد', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه روش ایجاد باید عدد باشد' })
  createdMethodId?: number;

  @ApiPropertyOptional({ description: 'شناسه جدول', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID('4', { message: 'شناسه جدول باید UUID معتبر باشد' })
  tableId?: string;

  @ApiPropertyOptional({ description: 'کاربر بروزرسانی کننده', example: 'user123' })
  @IsOptional()
  @IsString({ message: 'کاربر بروزرسانی کننده باید رشته باشد' })
  updatedBy?: string;
} 