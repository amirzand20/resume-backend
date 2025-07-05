import { ApiProperty } from '@nestjs/swagger';

export class ReadCourseDto {
  @ApiProperty({ 
    description: 'شناسه رکورد',
    example: 1
  })
  id: number;

  @ApiProperty({ 
    description: 'شناسه نوع کارمند',
    example: 1
  })
  employeeTypeId: number;

  @ApiProperty({ 
    description: 'شناسه نیروی کارمند',
    example: 1
  })
  employeeForceId: number;

  @ApiProperty({ 
    description: 'عنوان دوره',
    example: 'دوره آموزش مدیریت پروژه'
  })
  title: string;

  @ApiProperty({ 
    description: 'تاریخ شروع دوره',
    example: '2024-01-01'
  })
  startDate: Date;

  @ApiProperty({ 
    description: 'تاریخ پایان دوره',
    example: '2024-12-31'
  })
  endDate: Date;

  @ApiProperty({ 
    description: 'شناسه وضعیت استخدام',
    example: 1
  })
  recruitmentStatusId: number;

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