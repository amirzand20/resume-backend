import { ApiProperty } from '@nestjs/swagger';

export class ReadExperienceDto {
  @ApiProperty({ description: 'Experience ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Job Title' })
  jobTitle: string;

  @ApiProperty({ description: 'Company Name' })
  companyName: string;

  @ApiProperty({ description: 'Company Location ID' })
  companyLocationId: number;

  @ApiProperty({ description: 'Start Date' })
  startDate: Date;

  @ApiProperty({ description: 'End Date' })
  endDate: Date;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 