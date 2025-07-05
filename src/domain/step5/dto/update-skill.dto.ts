import { IsOptional, IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiPropertyOptional({ description: 'شناسه فرد', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId?: number;

  @ApiPropertyOptional({ description: 'شناسه نوع مهارت', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه نوع مهارت باید عدد باشد' })
  skillTypeId?: number;

  @ApiPropertyOptional({ description: 'سطح مهارت (1-5)', example: 3 })
  @IsOptional()
  @IsNumber({}, { message: 'سطح مهارت باید عدد باشد' })
  @Min(1, { message: 'سطح مهارت باید بین 1 تا 5 باشد' })
  @Max(5, { message: 'سطح مهارت باید بین 1 تا 5 باشد' })
  skillLevel?: number;

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