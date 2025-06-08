import { ApiProperty } from '@nestjs/swagger';

export class ApplicantDto {
  @ApiProperty({
    description: 'The unique identifier of the applicant',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the person associated with this applicant',
    example: 123,
  })
  personId: number;

  @ApiProperty({
    description: 'The status ID of the application',
    example: 1,
  })
  applicantStatusId: number;

  @ApiProperty({
    description: 'The method ID used to create this application',
    example: 2,
  })
  createdMethodId: number;

  @ApiProperty({
    description: 'The UUID of the table',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  tableId: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-25T14:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-26T10:15:00Z',
  })
  updatedAt: Date;
} 