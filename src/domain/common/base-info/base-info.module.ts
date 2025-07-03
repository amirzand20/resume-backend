import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BaseInfo} from "@/entities/base-info.entity";
import {BaseInfoRepository} from "@/domain/common/base-info/base-info.repository";
import {BaseInfoProfile} from "@/domain/common/base-info/base-info.profile";
import {BaseInfoService} from "@/domain/common/base-info/base-info.service";


@Module({
    imports: [TypeOrmModule.forFeature([BaseInfo])],
    controllers: [],
    providers: [BaseInfoService, BaseInfoProfile, BaseInfoRepository],
    exports: [BaseInfoService, BaseInfoRepository],
})
export class BaseInfoModule {
}
