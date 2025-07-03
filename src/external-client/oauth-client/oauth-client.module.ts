import { Module } from '@nestjs/common';
import { OauthClientService } from './oauth-client.service';
import { OauthClientController } from './oauth-client.controller';
import { ApiClientModule } from '@/api-client/api-client.module';
import {HttpClientModule} from "@/http-client/http-client.module";
import {HttpClientService} from "@/http-client/http-client.service";

@Module({
  imports: [ApiClientModule, HttpClientModule],
  providers: [
    OauthClientService,
    HttpClientService,
  ],
  controllers: [OauthClientController],
  exports: [
    OauthClientService,
],
})
export class OauthClientModule {}
