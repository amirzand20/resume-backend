import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  Length,
  Min
} from 'class-validator';

export class CreateCourseFieldDto {
  @ApiProperty({ 
    description: 'شناسه دوره',
    example: 1
  })
  @IsNumber({}, { message: 'شناسه دوره باید عدد باشد' })
  @Min(1, { message: 'شناسه دوره باید معتبر باشد' })
  courseId: number;

  @ApiProperty({ 
    description: 'شناسه رشته دوره',
    example: 1
  })
  @IsNumber({}, { message: 'شناسه رشته دوره باید عدد باشد' })
  @Min(1, { message: 'شناسه رشته دوره باید معتبر باشد' })
  courseFieldId: number;

  @ApiProperty({ 
    description: 'ظرفیت',
    example: 50
  })
  @IsNumber({}, { message: 'ظرفیت باید عدد باشد' })
  @Min(1, { message: 'ظرفیت باید عدد مثبت باشد' })
  capacity: number;

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
    description: 'شناسه کاربر ایجاد کننده',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty({ message: 'شناسه کاربر ایجاد کننده الزامی است' })
  createdBy: string;
} 