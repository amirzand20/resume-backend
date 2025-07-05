import { ApiProperty } from '@nestjs/swagger';

export class ReadCourseFieldDto {
  @ApiProperty({ 
    description: 'شناسه رکورد',
    example: 1
  })
  id: number;

  @ApiProperty({ 
    description: 'شناسه دوره',
    example: 1
  })
  courseId: number;

  @ApiProperty({ 
    description: 'شناسه رشته دوره',
    example: 1
  })
  courseFieldId: number;

  @ApiProperty({ 
    description: 'ظرفیت',
    example: 50
  })
  capacity: number;

  @ApiProperty({ 
    description: 'شناسه روش ایجاد',
    example: 1
  })
  createdMethodId: number;

  @ApiProperty({ 
    description: 'شناسه جدول',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  tableId: string;

  @ApiProperty({ 
    description: 'تاریخ ایجاد',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'تاریخ بروزرسانی',
    example: '2024-01-01T00:00:00.000Z',
    required: false
  })
  updatedAt?: Date;
} 