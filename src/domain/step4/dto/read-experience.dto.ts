import { ApiProperty } from '@nestjs/swagger';

export class ReadExperienceDto {
  @ApiProperty({ description: 'شناسه سابقه', example: 1 })
  id: number;

  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  personId: number;

  @ApiProperty({ description: 'عنوان شغل', example: 'برنامه‌نویس' })
  jobTitle: string;

  @ApiProperty({ description: 'شناسه نوع شغل', example: 2 })
  jobTypeId: number;

  @ApiProperty({ description: 'شناسه سازمان شغل', example: 3 })
  jobOrganId: number;

  @ApiProperty({ description: 'تاریخ شروع', example: '2020-01-01' })
  startDate: Date;

  @ApiProperty({ description: 'تاریخ پایان', example: '2022-01-01' })
  endDate: Date;

  @ApiProperty({ description: 'شناسه روش ایجاد', example: 1 })
  createdMethodId: number;

  @ApiProperty({ description: 'شناسه جدول', example: 'uuid' })
  tableId: string;

  @ApiProperty({ description: 'تاریخ ایجاد', example: '2020-01-01T00:00:00.000Z' })
  createdDate: Date;

  @ApiProperty({ description: 'تاریخ ویرایش', example: '2022-01-01T00:00:00.000Z', required: false })
  updatedDate?: Date;
} 