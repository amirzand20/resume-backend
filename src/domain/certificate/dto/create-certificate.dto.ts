import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Certificate Type ID' })
  @IsNumber()
  certificateTypeId: number;

  @ApiProperty({ description: 'Comment', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ description: 'Grant Date', required: false })
  @IsOptional()
  @IsDate()
  grantDate?: Date;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Certificate Issuer', required: false })
  @IsOptional()
  @IsString()
  certificateIssuer?: string;
} 