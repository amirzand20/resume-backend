import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsDateString, 
  IsNumber, 
  IsOptional, 
  IsEmail, 
  IsMobilePhone,
  Length,
  Min,
  Max,
  IsBoolean
} from 'class-validator';
import { IsValidNationalNo } from '@/common/validation/is-valid-national-no';

export class CreateStep1Dto {
  @ApiProperty({ 
    description: 'کد ملی شخص',
    example: '1234567890',
    minLength: 10,
    maxLength: 10
  })
  @IsString()
  @IsNotEmpty({ message: 'کد ملی الزامی است' })
  @Length(10, 10, { message: 'کد ملی باید 10 رقم باشد' })
  // @IsValidNationalNo({ message: 'کد ملی وارد شده نامعتبر است' })
  nationalNo: string;

  @ApiProperty({ 
    description: 'نام شخص',
    example: 'علی',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty({ message: 'نام الزامی است' })
  @Length(2, 50, { message: 'نام باید بین 2 تا 50 کاراکتر باشد' })
  firstName: string;

  @ApiProperty({ 
    description: 'نام خانوادگی شخص',
    example: 'احمدی',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty({ message: 'نام خانوادگی الزامی است' })
  @Length(2, 50, { message: 'نام خانوادگی باید بین 2 تا 50 کاراکتر باشد' })
  lastName: string;

  @ApiProperty({ 
    description: 'تاریخ تولد',
    example: '1990-01-01'
  })
  @IsDateString({}, { message: 'تاریخ تولد باید معتبر باشد' })
  @IsNotEmpty({ message: 'تاریخ تولد الزامی است' })
  birthDate: string;

  @ApiProperty({ 
    description: 'شناسه محل تولد',
    example: 1
  })
  @IsNumber({}, { message: 'محل تولد باید عدد باشد' })
  @Min(1, { message: 'محل تولد باید معتبر باشد' })
  birthPlaceId: number;

  @ApiProperty({ 
    description: 'شناسه محل سکونت (اختیاری)',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'محل سکونت باید عدد باشد' })
  @Min(1, { message: 'محل سکونت باید معتبر باشد' })
  locationPlaceId?: number;

  @ApiProperty({ 
    description: 'شناسه جنسیت',
    example: 1
  })
  @IsNumber({}, { message: 'جنسیت باید عدد باشد' })
  @Min(1, { message: 'جنسیت باید معتبر باشد' })
  sexId: number;

  @ApiProperty({ 
    description: 'درباره من (اختیاری)',
    example: 'توضیحات شخصی',
    maxLength: 500,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(0, 500, { message: 'درباره من نمی‌تواند بیشتر از 500 کاراکتر باشد' })
  aboutMe?: string;

  @ApiProperty({ 
    description: 'شماره موبایل',
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
    description: 'آدرس ایمیل (اختیاری)',
    example: 'example@email.com',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'ایمیل باید معتبر باشد' })
  emailAddress?: string;

  @ApiProperty({ 
    description: 'آدرس (اختیاری)',
    example: 'تهران، خیابان ولیعصر',
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(0, 200, { message: 'آدرس نمی‌تواند بیشتر از 200 کاراکتر باشد' })
  address?: string;

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
    description: 'تصویر پروفایل (اختیاری)',
    example: 'profile.jpg',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(0, 100, { message: 'نام فایل تصویر نمی‌تواند بیشتر از 100 کاراکتر باشد' })
  profileImage?: string;
} 