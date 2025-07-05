import { ApiProperty } from '@nestjs/swagger';

export class ReadStep2Dto {
  @ApiProperty({ 
    description: 'شناسه رکورد',
    example: 1
  })
  id: number;

  @ApiProperty({ 
    description: 'شناسه شخص',
    example: 1
  })
  personId: number;

  @ApiProperty({ 
    description: 'شناسه محل سکونت',
    example: 1
  })
  locationPlaceId: number;

  @ApiProperty({ 
    description: 'آدرس محل سکونت',
    example: 'تهران، خیابان ولیعصر، پلاک 123'
  })
  locationAddress: string;

  @ApiProperty({ 
    description: 'شماره موبایل شخص',
    example: '09123456789'
  })
  mobileNumber: string;

  @ApiProperty({ 
    description: 'شماره تلفن ثابت',
    example: '02112345678',
    required: false
  })
  telephoneNumber?: string;

  @ApiProperty({ 
    description: 'کد پستی',
    example: '1234567890',
    required: false
  })
  postCode?: string;

  @ApiProperty({ 
    description: 'شماره موبایل پدر',
    example: '09123456789',
    required: false
  })
  fatherMobileNumber?: string;

  @ApiProperty({ 
    description: 'شماره موبایل مادر',
    example: '09123456789',
    required: false
  })
  motherMobileNumber?: string;

  @ApiProperty({ 
    description: 'آدرس ایمیل',
    example: 'example@email.com',
    required: false
  })
  emailAddress?: string;

  @ApiProperty({ 
    description: 'شماره موبایل آشنای نزدیک',
    example: '09123456789',
    required: false
  })
  familiarMobileNumber?: string;

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
    description: 'فعال بودن رکورد',
    example: true
  })
  isActive: boolean;

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