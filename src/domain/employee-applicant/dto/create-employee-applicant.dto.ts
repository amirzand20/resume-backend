import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateEmployeeApplicantDto {
  @ApiProperty({ description: 'Applicant ID' })
  @IsNumber()
  applicantId: number;

  @ApiProperty({ description: 'Employee Type ID' })
  @IsNumber()
  employeeTypeId: number;

  @ApiProperty({ description: 'Priority Number' })
  @IsNumber()
  priorityNumber: number;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;
} 