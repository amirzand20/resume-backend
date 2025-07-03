import {TypeOrmModule} from "@nestjs/typeorm";
import {VolunteerInfo} from "@/entities/volunteer-info.entity";
import {Module} from "@nestjs/common";
import {OauthClientModule} from "@/external-client/oauth-client/oauth-client.module";
import {VolunteerInfoRepository} from "@/domain/common/volunteer-info/volunteer-info.repository";
import {VolunteerInfoService} from "@/domain/common/volunteer-info/volunteer-info.service";
import {VolunteerInfoProfile} from "@/domain/common/volunteer-info/volunteer-info.profile";
import { ExamPersonModule } from "../exam-person/exam-person.module";

@Module({
    imports: [TypeOrmModule.forFeature([VolunteerInfo]), OauthClientModule, ExamPersonModule],
    providers: [
        VolunteerInfoRepository,
        VolunteerInfoService,
        VolunteerInfoProfile
    ],
    exports: [
        VolunteerInfoRepository,
        VolunteerInfoService
    ],
})
export class VolunteerInfoModule {
}
