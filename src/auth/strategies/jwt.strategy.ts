import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserService} from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            algorithms: ['HS256'],
        });
    }

    async validate(payload: any) {
        try {
            const user = await this.userService.findById(payload.userId);
            if (!user || !user.isActive) {
                throw new UnauthorizedException('User not found or inactive');
            }
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
