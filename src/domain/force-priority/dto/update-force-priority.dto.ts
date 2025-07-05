import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateForcePriorityDto {
  @ApiProperty({ description: 'Applicant ID', required: false })
  @IsOptional()
  @IsNumber()
  applicantId?: number;

  @ApiProperty({ description: 'Force ID', required: false })
  @IsOptional()
  @IsNumber()
  forceId?: number;

  @ApiProperty({ description: 'Priority Number', required: false })
  @IsOptional()
  @IsNumber()
  priorityNumber?: number;

  @ApiProperty({ description: 'Created Method ID', required: false })
  @IsOptional()
  @IsNumber()
  createdMethodId?: number;

  @ApiProperty({ description: 'Table ID', required: false })
  @IsOptional()
  @IsUUID()
  tableId?: string;
} 