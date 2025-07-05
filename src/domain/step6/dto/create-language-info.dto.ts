import { IsNotEmpty, IsNumber, IsUUID, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLanguageInfoDto {
  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  @IsNotEmpty({ message: 'شناسه فرد الزامی است' })
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId: number;

  @ApiProperty({ description: 'شناسه زبان', example: 1 })
  @IsNotEmpty({ message: 'شناسه زبان الزامی است' })
  @IsNumber({}, { message: 'شناسه زبان باید عدد باشد' })
  languageId: number;

  @ApiProperty({ description: 'سطح خواندن (1-5)', example: 3 })
  @IsNotEmpty({ message: 'سطح خواندن الزامی است' })
  @IsNumber({}, { message: 'سطح خواندن باید عدد باشد' })
  @Min(1)
  @Max(5)
  readingLevel: number;

  @ApiProperty({ description: 'سطح نوشتن (1-5)', example: 3 })
  @IsNotEmpty({ message: 'سطح نوشتن الزامی است' })
  @IsNumber({}, { message: 'سطح نوشتن باید عدد باشد' })
  @Min(1)
  @Max(5)
  writingLevel: number;

  @ApiProperty({ description: 'سطح صحبت کردن (1-5)', example: 3 })
  @IsNotEmpty({ message: 'سطح صحبت کردن الزامی است' })
  @IsNumber({}, { message: 'سطح صحبت کردن باید عدد باشد' })
  @Min(1)
  @Max(5)
  speakingLevel: number;

  @ApiProperty({ description: 'سطح شنیداری (1-5)', example: 3 })
  @IsNotEmpty({ message: 'سطح شنیداری الزامی است' })
  @IsNumber({}, { message: 'سطح شنیداری باید عدد باشد' })
  @Min(1)
  @Max(5)
  listeningLevel: number;

  @ApiProperty({ description: 'شناسه روش ایجاد', example: 1 })
  @IsNotEmpty({ message: 'شناسه روش ایجاد الزامی است' })
  @IsNumber({}, { message: 'شناسه روش ایجاد باید عدد باشد' })
  createdMethodId: number;

  @ApiProperty({ description: 'شناسه جدول', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty({ message: 'شناسه جدول الزامی است' })
  @IsUUID('4', { message: 'شناسه جدول باید UUID معتبر باشد' })
  tableId: string;

  @ApiPropertyOptional({ description: 'کاربر ایجاد کننده', example: 'user123' })
  @IsOptional()
  @IsString({ message: 'کاربر ایجاد کننده باید رشته باشد' })
  createdBy?: string;
} 