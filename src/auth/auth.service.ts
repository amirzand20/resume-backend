import { ApiClientService } from '@/api-client/api-client.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as https from 'https';
import { UserService } from './user.service';
import { User } from '@/entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
    agent = new https.Agent({
        rejectUnauthorized: false,
    });

    constructor(
        private apiClient: ApiClientService,
        private jwtService: JwtService,
        private userService: UserService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<User> {
        return await this.userService.validateUser(username, password);
    }

    async login(user: User) {
        const payload = { 
            userId: user.id, 
            username: user.username, 
            email: user.email,
            role: user.role 
        };
        
        const userDto: UserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: userDto,
        };
    }

    async register(registerDto: any) {
        const user = await this.userService.register(registerDto);
        
        const userDto: UserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };

        return {
            message: 'User registered successfully',
            user: userDto,
        };
    }

    async oAuthCheckToken(
        userId: string,
        jti: string,
        clientId: string,
        systemId: string,
        headers: any
    ): Promise<boolean> {
        const data = {
            userId: userId,
            jti: jti,
            clientId: clientId,
            systemId: systemId,
        };
        const result = await this.apiClient
            .post(
                `${process.env.OAUTH_BACKEND_URL}/auth/check/subsystem/token`,
                data,
                { ...headers, httpsAgent: this.agent },
            )
            .toPromise();
        return !!result;
    }
}
