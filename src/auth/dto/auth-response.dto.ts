import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwNDA5NjAwMCwiZXhwIjoxNzA0MTgyNDAwfQ.example'
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto
  })
  user: UserDto;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'User registered successfully'
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto
  })
  user: UserDto;
}

export class ProfileResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Username',
    example: 'testuser'
  })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'test@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    example: 'user',
    enum: ['admin', 'user']
  })
  role: string;
} 