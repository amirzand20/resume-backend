import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsUUID, Min } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ description: 'شناسه فرد', example: 1 })
  @IsNumber({}, { message: 'شناسه فرد باید عدد باشد' })
  @Min(1, { message: 'شناسه فرد باید معتبر باشد' })
  personId: number;

  @ApiProperty({ description: 'عنوان شغل', example: 'برنامه‌نویس' })
  @IsString({ message: 'عنوان شغل باید رشته باشد' })
  @IsNotEmpty({ message: 'عنوان شغل الزامی است' })
  jobTitle: string;

  @ApiProperty({ description: 'شناسه نوع شغل', example: 2 })
  @IsNumber({}, { message: 'شناسه نوع شغل باید عدد باشد' })
  @Min(1, { message: 'شناسه نوع شغل باید معتبر باشد' })
  jobTypeId: number;

  @ApiProperty({ description: 'شناسه سازمان شغل', example: 3 })
  @IsNumber({}, { message: 'شناسه سازمان شغل باید عدد باشد' })
  @Min(1, { message: 'شناسه سازمان شغل باید معتبر باشد' })
  jobOrganId: number;

  @ApiProperty({ description: 'تاریخ شروع', example: '2020-01-01' })
  @IsDateString({}, { message: 'تاریخ شروع باید معتبر باشد' })
  startDate: string;

  @ApiProperty({ description: 'تاریخ پایان', example: '2022-01-01' })
  @IsDateString({}, { message: 'تاریخ پایان باید معتبر باشد' })
  endDate: string;

  @ApiProperty({ description: 'شناسه روش ایجاد', example: 1 })
  @IsNumber({}, { message: 'شناسه روش ایجاد باید عدد باشد' })
  @Min(1, { message: 'شناسه روش ایجاد باید معتبر باشد' })
  createdMethodId: number;

  @ApiProperty({ description: 'شناسه جدول', example: 'uuid' })
  @IsUUID('4', { message: 'شناسه جدول باید uuid معتبر باشد' })
  tableId: string;

  @ApiProperty({ description: 'شناسه کاربر ایجادکننده', example: 'user-uuid' })
  @IsString({ message: 'شناسه کاربر ایجادکننده باید رشته باشد' })
  @IsNotEmpty({ message: 'شناسه کاربر ایجادکننده الزامی است' })
  createdBy: string;
} 