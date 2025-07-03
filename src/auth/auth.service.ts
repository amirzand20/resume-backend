import { ApiClientService } from '@/api-client/api-client.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as https from 'https';
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { ExamPersonRepository } from '@/domain/common/exam-person/exam-person.repository';

@Injectable()
export class AuthService {
    agent = new https.Agent({
        rejectUnauthorized: false,
    });

    constructor(
        private apiClient: ApiClientService,
        private jwtService: JwtService,
        private examPersonRepository: ExamPersonRepository,
    ) {
    }

    async validateUser(username: string, password: string) {
        const _examPersonel = await this.examPersonRepository.getByUserAndPassword(username, password)
        if (_examPersonel) {
            return _examPersonel
        }
        throw new NotFoundException('کاربری با این مشخصات وجود ندارد');
    }

    async login(user: any) {
        const payLoad = { userId: user.id, userName: user.username, exam: user, volunteerInfoId: 54 };
        return {
            access_token: this.jwtService.sign(payLoad),
            user: user,
            volunteerInfoId: 54
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
