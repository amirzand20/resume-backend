import { ApiProperty } from '@nestjs/swagger';

export class ReadForcePriorityDto {
  @ApiProperty({ description: 'Force Priority ID' })
  id: number;

  @ApiProperty({ description: 'Applicant ID' })
  applicantId: number;

  @ApiProperty({ description: 'Force ID' })
  forceId: number;

  @ApiProperty({ description: 'Priority Number' })
  priorityNumber: number;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 