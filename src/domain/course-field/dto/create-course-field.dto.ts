import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateCourseFieldDto {
  @ApiProperty({ description: 'Course ID' })
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'Course Field ID' })
  @IsNumber()
  courseFieldId: number;

  @ApiProperty({ description: 'Capacity' })
  @IsNumber()
  capacity: number;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;
} 