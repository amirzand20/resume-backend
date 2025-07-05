import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ 
    description: 'The unique identifier of the user',
    example: 1
  })
  id: number;

  @ApiProperty({ 
    description: 'The username of the user',
    example: 'testuser'
  })
  username: string;

  @ApiProperty({ 
    description: 'The email of the user',
    example: 'test@example.com'
  })
  email: string;

  @ApiProperty({ 
    description: 'The role of the user',
    example: 'user',
    enum: ['admin', 'user']
  })
  role: string;

  @ApiProperty({ 
    description: 'Whether the user is active',
    example: true
  })
  isActive: boolean;

  @ApiProperty({ 
    description: 'When the user was created',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;
} 