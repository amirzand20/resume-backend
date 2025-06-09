import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreatePersonalInfoDto {
  @ApiProperty({ description: 'First name of the person' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the person' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Nationality' })
  @IsString()
  nationality: string;

  @ApiProperty({ description: 'Gender' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Marital status' })
  @IsString()
  maritalStatus: string;

  @ApiProperty({ description: 'Address' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Postal code' })
  @IsString()
  postalCode: string;

  @ApiProperty({ description: 'Profile picture URL', required: false })
  @IsString()
  @IsOptional()
  profilePicture?: string;
} 