import { ApiProperty } from '@nestjs/swagger';

export class ReadCertificateDto {
  @ApiProperty({ description: 'Certificate ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Certificate Type ID' })
  certificateTypeId: number;

  @ApiProperty({ description: 'Comment' })
  comment: string;

  @ApiProperty({ description: 'Grant Date' })
  grantDate: Date;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Certificate Issuer' })
  certificateIssuer: string;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 