import { IsNotEmpty, IsNumber, IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicantDto {
  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  @IsNotEmpty({ message: 'شناسه فرد الزامی است' })
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  personId: number;

  @ApiProperty({ description: 'شناسه وضعیت متقاضی', example: 1 })
  @IsNotEmpty({ message: 'شناسه وضعیت متقاضی الزامی است' })
  @IsNumber({}, { message: 'شناسه وضعیت متقاضی باید عدد باشد' })
  applicantStatusId: number;

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