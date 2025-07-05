import { ApiProperty } from '@nestjs/swagger';

export class ReadContactInfoDto {
  @ApiProperty({ description: 'Contact Info ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Location Place ID' })
  locationPlaceId: number;

  @ApiProperty({ description: 'Location Address' })
  locationAddress: string;

  @ApiProperty({ description: 'Mobile Number' })
  mobileNumber: string;

  @ApiProperty({ description: 'Telephone Number' })
  telephoneNumber: string;

  @ApiProperty({ description: 'Post Code' })
  postCode: string;

  @ApiProperty({ description: 'Father Mobile Number' })
  fatherMobileNumber: string;

  @ApiProperty({ description: 'Mother Mobile Number' })
  motherMobileNumber: string;

  @ApiProperty({ description: 'Email Address' })
  emailAddress: string;

  @ApiProperty({ description: 'Familiar Mobile Number' })
  familiarMobileNumber: string;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Is Active' })
  isActive: boolean;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 