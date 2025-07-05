import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsEmail } from 'class-validator';

export class UpdateContactInfoDto {
  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Location Place ID', required: false })
  @IsOptional()
  @IsNumber()
  locationPlaceId?: number;

  @ApiProperty({ description: 'Location Address', required: false })
  @IsOptional()
  @IsString()
  locationAddress?: string;

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

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Is Active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 