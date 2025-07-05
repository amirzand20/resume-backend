import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  Length,
  Min
} from 'class-validator';

export class UpdateCourseEducationGradeDto {
  @ApiProperty({ 
    description: 'شناسه دوره',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه دوره باید عدد باشد' })
  @Min(1, { message: 'شناسه دوره باید معتبر باشد' })
  courseId?: number;

  @ApiProperty({ 
    description: 'شناسه مقطع تحصیلی',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه مقطع تحصیلی باید عدد باشد' })
  @Min(1, { message: 'شناسه مقطع تحصیلی باید معتبر باشد' })
  educationGradeId?: number;

  @ApiProperty({ 
    description: 'شناسه رشته تحصیلی (اختیاری)',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'شناسه رشته تحصیلی باید عدد باشد' })
  @Min(1, { message: 'شناسه رشته تحصیلی باید معتبر باشد' })
  educationFieldId?: number;

  @ApiProperty({ 
    description: 'حداقل تعدیل شده',
    example: 10,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'حداقل تعدیل شده باید عدد باشد' })
  @Min(0, { message: 'حداقل تعدیل شده باید عدد مثبت باشد' })
  adjustedMin?: number;

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