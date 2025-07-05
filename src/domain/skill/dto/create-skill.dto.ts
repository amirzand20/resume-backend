import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Skill ID' })
  @IsNumber()
  skillId: number;

  @ApiProperty({ description: 'Level ID' })
  @IsNumber()
  levelId: number;

  @ApiProperty({ description: 'Table ID' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  @IsNumber()
  createdMethodId: number;
} 