import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsEmail } from 'class-validator';

export class CreateContactInfoDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Location Place ID' })
  @IsNumber()
  locationPlaceId: number;

  @ApiProperty({ description: 'Location Address' })
  @IsString()
  locationAddress: string;

  @ApiProperty({ description: 'Mobile Number', required: false })
  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @ApiProperty({ description: 'Telephone Number', required: false })
  @IsOptional()
  @IsString()
  telephoneNumber?: string;

  @ApiProperty({ description: 'Post Code', required: false })
  @IsOptional()
  @IsString()
  postCode?: string;

  @ApiProperty({ description: 'Father Mobile Number', required: false })
  @IsOptional()
  @IsString()
  fatherMobileNumber?: string;

  @ApiProperty({ description: 'Mother Mobile Number', required: false })
  @IsOptional()
  @IsString()
  motherMobileNumber?: string;

  @ApiProperty({ description: 'Email Address', required: false })
  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @ApiProperty({ description: 'Familiar Mobile Number', required: false })
  @IsOptional()
  @IsString()
  familiarMobileNumber?: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 