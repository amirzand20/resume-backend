import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiClientModule } from '@/api-client/api-client.module';
import { SessionSerializer } from './session/session.serializer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from '@/entities/user.entity';
import { HttpClientService } from '@/http-client/http-client.service';
import { HttpClientModule } from '@/http-client/http-client.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { OAuthJwtStrategy } from './strategies/oauth-jwt.strategy';
// import { VolunteerInfoModule } from '@/domain/common/volunteer-info/volunteer-info.module';
// import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ApiClientModule,
    HttpClientModule,
    // VolunteerInfoModule,
    PassportModule,
    // ExamPersonModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [
    JwtStrategy, 
    OAuthJwtStrategy, 
    SessionSerializer, 
    AuthService, 
    UserService,
    UserRepository,
    HttpClientService
  ],
  controllers: [AuthController],
  exports: [AuthService, UserService],
})
export class AuthModule { }
