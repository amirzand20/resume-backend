import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmployeeFieldTestDto {
  @ApiProperty({ description: 'Employee Type ID' })
  @IsNumber()
  employeeTypeId: number;

  @ApiProperty({ description: 'Employee Field ID', required: false })
  @IsOptional()
  @IsNumber()
  employeeFieldId?: number;

  @ApiProperty({ description: 'Test Type ID' })
  @IsNumber()
  testTypeId: number;

  @ApiProperty({ description: 'Is Active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 