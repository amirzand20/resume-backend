import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateEmployeeTestDto {
  @ApiProperty({ description: 'Employee Type ID', required: false })
  @IsOptional()
  @IsNumber()
  employeeTypeId?: number;

  @ApiProperty({ description: 'Test Type ID', required: false })
  @IsOptional()
  @IsNumber()
  testTypeId?: number;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 