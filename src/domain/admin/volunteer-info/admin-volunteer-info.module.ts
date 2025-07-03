import { Module } from '@nestjs/common';
import { AdminVolunteerInfoController } from "@/domain/admin/volunteer-info/admin-volunteer-info.controller";
import { VolunteerInfoModule } from '@/domain/common/volunteer-info/volunteer-info.module';
import { OauthClientModule } from '@/external-client/oauth-client/oauth-client.module';

@Module({
    imports: [VolunteerInfoModule,OauthClientModule],
    controllers: [AdminVolunteerInfoController],
    providers: [],
})
export class AdminVolunteerInfoModule {
}
