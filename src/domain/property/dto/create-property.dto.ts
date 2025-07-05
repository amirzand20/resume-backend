import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID, IsObject } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Property Type ID' })
  @IsNumber()
  propertyTypeId: number;

  @ApiProperty({ description: 'Property Info', required: false })
  @IsOptional()
  @IsObject()
  propertyInfo?: object;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  isActive?: boolean;
} 