import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../entity/user.entity';
import { RegisterDto } from '../domain/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('کاربری یافت نشد')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log('payload',payload)
    // Format response as OAuth2 token response
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 86400, // 24 hours in seconds
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async generateClientCredentialsToken(clientId: string) {
    // In a real implementation, you would validate the client credentials against a database
    // For simplicity, we're just generating a token with minimal claims
    
    // Check if client is valid (simplified implementation)
    if (clientId !== 'resume-client') {
      throw new UnauthorizedException('Invalid client credentials');
    }
    
    const payload = { 
      client_id: clientId,
      // No user-specific claims in client credentials flow
      scope: 'api',
      type: 'service'
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: 86400, // 24 hours in seconds
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ 
      where: [
        { username: registerDto.username },
        { email: registerDto.email }
      ]
    });

    if (existingUser) {
      throw new UnauthorizedException('Username or email already exists');
    }

    // Create new user
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const { password: _, ...result } = user;
    return result;
  }
} 