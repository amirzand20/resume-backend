import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';

export class UpdateCertificateDto {
  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Certificate Type ID', required: false })
  @IsOptional()
  @IsNumber()
  certificateTypeId?: number;

  @ApiProperty({ description: 'Comment', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ description: 'Grant Date', required: false })
  @IsOptional()
  @IsDate()
  grantDate?: Date;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ description: 'Certificate Issuer', required: false })
  @IsOptional()
  @IsString()
  certificateIssuer?: string;
} 