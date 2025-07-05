import { IsNotEmpty, IsNumber, IsString, IsUUID, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  @IsNotEmpty({ message: 'شناسه فرد الزامی است' })
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId: number;

  @ApiProperty({ description: 'شناسه نوع مهارت', example: 1 })
  @IsNotEmpty({ message: 'شناسه نوع مهارت الزامی است' })
  @IsNumber({}, { message: 'شناسه نوع مهارت باید عدد باشد' })
  skillTypeId: number;

  @ApiProperty({ description: 'سطح مهارت (1-5)', example: 3 })
  @IsNotEmpty({ message: 'سطح مهارت الزامی است' })
  @IsNumber({}, { message: 'سطح مهارت باید عدد باشد' })
  @Min(1, { message: 'سطح مهارت باید بین 1 تا 5 باشد' })
  @Max(5, { message: 'سطح مهارت باید بین 1 تا 5 باشد' })
  skillLevel: number;

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