import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsDateString,
  Length,
  Min,
  IsBoolean
} from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({ 
    description: 'شناسه نوع کارمند',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه نوع کارمند باید عدد باشد' })
  @Min(1, { message: 'شناسه نوع کارمند باید معتبر باشد' })
  employeeTypeId?: number;

  @ApiProperty({ 
    description: 'شناسه نیروی کارمند',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه نیروی کارمند باید عدد باشد' })
  @Min(1, { message: 'شناسه نیروی کارمند باید معتبر باشد' })
  employeeForceId?: number;

  @ApiProperty({ 
    description: 'عنوان دوره',
    example: 'دوره آموزش مدیریت پروژه',
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'عنوان دوره الزامی است' })
  @Length(5, 200, { message: 'عنوان دوره باید بین 5 تا 200 کاراکتر باشد' })
  title?: string;

  @ApiProperty({ 
    description: 'تاریخ شروع دوره',
    example: '2024-01-01',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'تاریخ شروع دوره باید معتبر باشد' })
  startDate?: string;

  @ApiProperty({ 
    description: 'تاریخ پایان دوره',
    example: '2024-12-31',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'تاریخ پایان دوره باید معتبر باشد' })
  endDate?: string;

  @ApiProperty({ 
    description: 'شناسه وضعیت استخدام',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه وضعیت استخدام باید عدد باشد' })
  @Min(1, { message: 'شناسه وضعیت استخدام باید معتبر باشد' })
  recruitmentStatusId?: number;

  @ApiProperty({ 
    description: 'شناسه روش ایجاد',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'روش ایجاد باید عدد باشد' })
  @Min(1, { message: 'روش ایجاد باید معتبر باشد' })
  createdMethodId?: number;

  @ApiProperty({ 
    description: 'شناسه جدول',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsString()
  tableId?: string;

  @ApiProperty({ 
    description: 'شناسه کاربر بروزرسانی کننده',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;
} 