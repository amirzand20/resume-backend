import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', example: 'john.doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'OAuth2 grant type', required: false, enum: ['password', 'client_credentials'] })
  @IsOptional()
  @IsString()
  @IsEnum(['password', 'client_credentials'])
  grant_type?: string;

  @ApiProperty({ description: 'OAuth2 client ID', required: false })
  @IsOptional()
  @IsString()
  client_id?: string;

  @ApiProperty({ description: 'OAuth2 client secret', required: false })
  @IsOptional()
  @IsString()
  client_secret?: string;

  @ApiProperty({ description: 'OAuth2 scope', required: false })
  @IsOptional()
  @IsString()
  scope?: string;
} 