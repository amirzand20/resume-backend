import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID, IsObject, IsBoolean } from 'class-validator';

export class UpdatePropertyDto {
  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Property Type ID', required: false })
  @IsOptional()
  @IsNumber()
  propertyTypeId?: number;

  @ApiProperty({ description: 'Property Info', required: false })
  @IsOptional()
  @IsObject()
  propertyInfo?: object;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 