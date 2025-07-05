import { ApiProperty } from '@nestjs/swagger';

export class ReadLanguageInfoDto {
  @ApiProperty({ description: 'شناسه', example: 1 })
  id: number;

  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  personId: number;

  @ApiProperty({ description: 'شناسه زبان', example: 1 })
  languageId: number;

  @ApiProperty({ description: 'سطح خواندن', example: 3 })
  readingLevel: number;

  @ApiProperty({ description: 'سطح نوشتن', example: 3 })
  writingLevel: number;

  @ApiProperty({ description: 'سطح صحبت کردن', example: 3 })
  speakingLevel: number;

  @ApiProperty({ description: 'سطح شنیداری', example: 3 })
  listeningLevel: number;

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