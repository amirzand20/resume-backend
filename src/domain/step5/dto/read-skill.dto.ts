import { ApiProperty } from '@nestjs/swagger';

export class ReadSkillDto {
  @ApiProperty({ description: 'شناسه مهارت', example: 1 })
  id: number;

  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  personId: number;

  @ApiProperty({ description: 'شناسه نوع مهارت', example: 1 })
  skillTypeId: number;

  @ApiProperty({ description: 'سطح مهارت', example: 3 })
  skillLevel: number;

  @ApiProperty({ description: 'شناسه روش ایجاد', example: 1 })
  createdMethodId: number;

  @ApiProperty({ description: 'شناسه جدول', example: '123e4567-e89b-12d3-a456-426614174000' })
  tableId: string;

  @ApiProperty({ description: 'کاربر ایجاد کننده', example: 'user123' })
  createdBy: string;

  @ApiProperty({ description: 'تاریخ ایجاد', example: '2024-01-01T00:00:00.000Z' })
  createdDate: Date;

  @ApiProperty({ description: 'کاربر بروزرسانی کننده', example: 'user123' })
  updatedBy: string;

  @ApiProperty({ description: 'تاریخ بروزرسانی', example: '2024-01-01T00:00:00.000Z' })
  updatedDate: Date;
} 