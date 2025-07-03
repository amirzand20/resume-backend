import { Module } from '@nestjs/common';
import { WebVolunteerInfoController } from "@/domain/web/volunteer-info/web-volunteer-info.controller";
import { VolunteerInfoModule } from '@/domain/common/volunteer-info/volunteer-info.module';
import { OauthClientModule } from '@/external-client/oauth-client/oauth-client.module';

@Module({
    imports: [VolunteerInfoModule, OauthClientModule],
    controllers: [WebVolunteerInfoController],
    providers: [],
})
export class WebVolunteerInfoModule {
}
