import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    description: 'The username of the user',
    example: 'testuser',
    minLength: 3,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ 
    description: 'The email of the user',
    example: 'test@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'The password of the user',
    example: 'password123',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
} 