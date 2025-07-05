import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any, status?: any){
        if(err || !user) {
            console.log(info);
            throw err || new UnauthorizedException()
        }
        return user
    }
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;   
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}