import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsEmail, 
  IsMobilePhone,
  Length,
  Min,
  IsBoolean
} from 'class-validator';

export class CreateStep2Dto {
  @ApiProperty({ 
    description: 'شناسه شخص',
    example: 1
  })
  @IsNumber({}, { message: 'شناسه شخص باید عدد باشد' })
  @Min(1, { message: 'شناسه شخص باید معتبر باشد' })
  personId: number;

  @ApiProperty({ 
    description: 'شناسه محل سکونت',
    example: 1
  })
  @IsNumber({}, { message: 'محل سکونت باید عدد باشد' })
  @Min(1, { message: 'محل سکونت باید معتبر باشد' })
  locationPlaceId: number;

  @ApiProperty({ 
    description: 'آدرس محل سکونت',
    example: 'تهران، خیابان ولیعصر، پلاک 123',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty({ message: 'آدرس محل سکونت الزامی است' })
  @Length(10, 500, { message: 'آدرس باید بین 10 تا 500 کاراکتر باشد' })
  locationAddress: string;

  @ApiProperty({ 
    description: 'شماره موبایل شخص',
    example: '09123456789'
  })
  @IsString()
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  @IsMobilePhone('fa-IR', {}, { message: 'شماره موبایل باید معتبر باشد' })
  mobileNumber: string;

  @ApiProperty({ 
    description: 'شماره تلفن ثابت (اختیاری)',
    example: '02112345678',
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(0, 20, { message: 'شماره تلفن نمی‌تواند بیشتر از 20 کاراکتر باشد' })
  telephoneNumber?: string;

  @ApiProperty({ 
    description: 'کد پستی (اختیاری)',
    example: '1234567890',
    maxLength: 10,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(0, 10, { message: 'کد پستی نمی‌تواند بیشتر از 10 کاراکتر باشد' })
  postCode?: string;

  @ApiProperty({ 
    description: 'شماره موبایل پدر (اختیاری)',
    example: '09123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR', {}, { message: 'شماره موبایل پدر باید معتبر باشد' })
  fatherMobileNumber?: string;

  @ApiProperty({ 
    description: 'شماره موبایل مادر (اختیاری)',
    example: '09123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR', {}, { message: 'شماره موبایل مادر باید معتبر باشد' })
  motherMobileNumber?: string;

  @ApiProperty({ 
    description: 'آدرس ایمیل (اختیاری)',
    example: 'example@email.com',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'ایمیل باید معتبر باشد' })
  emailAddress?: string;

  @ApiProperty({ 
    description: 'شماره موبایل آشنای نزدیک (اختیاری)',
    example: '09123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR', {}, { message: 'شماره موبایل آشنای نزدیک باید معتبر باشد' })
  familiarMobileNumber?: string;

  @ApiProperty({ 
    description: 'شناسه روش ایجاد',
    example: 1
  })
  @IsNumber({}, { message: 'روش ایجاد باید عدد باشد' })
  @Min(1, { message: 'روش ایجاد باید معتبر باشد' })
  createdMethodId: number;

  @ApiProperty({ 
    description: 'شناسه جدول',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty({ message: 'شناسه جدول الزامی است' })
  tableId: string;

  @ApiProperty({ 
    description: 'فعال بودن رکورد',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    description: 'شناسه کاربر ایجاد کننده',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty({ message: 'شناسه کاربر ایجاد کننده الزامی است' })
  createdBy: string;
} 