import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../entity/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'u6n9VxYqP0RbJ3tFzHdKcX8Lg2eWmA5TsQvNpMhZYxEo7UiCrGbLfD1TwKaSjE0',
    });
  }

  async validate(payload: any) {
    // Handle different token types
    // If client_id is present, it's a client credentials token
    if (payload.client_id && payload.type === 'service') {
      // For client credentials, return a service principal
      return {
        isClient: true,
        clientId: payload.client_id,
        scope: payload.scope,
        role: 'service'
      };
    }
    
    // Otherwise, it's a user token
    const { sub: id } = payload;
    
    // If no user ID in the token, reject
    if (!id) {
      throw new UnauthorizedException('Invalid token format');
    }
    
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid token or inactive user');
    }

    return { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role,
      isClient: false
    };
  }
} 