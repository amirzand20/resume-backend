import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreatePropertiesDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Property ID' })
  @IsNumber()
  propertyId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;
} 