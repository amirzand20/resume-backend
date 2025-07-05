import { ApiProperty } from '@nestjs/swagger';

export class ReadEmployeeTestDto {
  @ApiProperty({ description: 'Employee Test ID' })
  id: number;

  @ApiProperty({ description: 'Employee Type ID' })
  employeeTypeId: number;

  @ApiProperty({ description: 'Test Type ID' })
  testTypeId: number;

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