import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {AuthService} from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            algorithms: ['HS256'],
            passReqToCallback: true,
        })
    }

    async validate(req: Request, payload: any, done: VerifiedCallback) {
        return {userId: payload.sub, username: payload.username};
    }
}
