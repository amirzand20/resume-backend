import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ 
        description: 'The username or email of the user',
        example: 'testuser'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ 
        description: 'The password of the user',
        example: 'password123'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}