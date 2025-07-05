import { IsOptional, IsNumber, IsUUID, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicantDto {
  @ApiPropertyOptional({ description: 'شناسه فرد', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId?: number;

  @ApiPropertyOptional({ description: 'شناسه وضعیت متقاضی', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه وضعیت متقاضی باید عدد باشد' })
  applicantStatusId?: number;

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