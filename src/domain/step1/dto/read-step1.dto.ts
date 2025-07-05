import { ApiProperty } from '@nestjs/swagger';

export class ReadStep1Dto {
  @ApiProperty({ description: 'شناسه شخص' })
  id: number;

  @ApiProperty({ description: 'کد ملی شخص' })
  nationalNo: string;

  @ApiProperty({ description: 'نام شخص' })
  firstName: string;

  @ApiProperty({ description: 'نام خانوادگی شخص' })
  lastName: string;

  @ApiProperty({ description: 'تاریخ تولد' })
  birthDate: Date;

  @ApiProperty({ description: 'شناسه محل تولد' })
  birthPlaceId: number;

  @ApiProperty({ description: 'شناسه محل سکونت', required: false })
  locationPlaceId?: number;

  @ApiProperty({ description: 'شناسه جنسیت' })
  sexId: number;

  @ApiProperty({ description: 'درباره من', required: false })
  aboutMe?: string;

  @ApiProperty({ description: 'شماره موبایل' })
  mobileNumber: string;

  @ApiProperty({ description: 'شماره تلفن ثابت', required: false })
  telephoneNumber?: string;

  @ApiProperty({ description: 'آدرس ایمیل', required: false })
  emailAddress?: string;

  @ApiProperty({ description: 'آدرس', required: false })
  address?: string;

  @ApiProperty({ description: 'کد پستی', required: false })
  postCode?: string;

  @ApiProperty({ description: 'تصویر پروفایل', required: false })
  profileImage?: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdDate: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی', required: false })
  updatedDate?: Date;

  @ApiProperty({ description: 'شناسه کاربر ایجاد کننده' })
  createdBy: string;

  @ApiProperty({ description: 'شناسه کاربر بروزرسانی کننده', required: false })
  updatedBy?: string;
} 