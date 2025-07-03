import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {OrganOperational} from "@/entities/organ-operational.entity";
import {OrganOperationalService} from "@/domain/common/organ-operational/organ-operational.service";
import {OrganOperationalProfile} from "@/domain/common/organ-operational/organ-operational.profile";
import {OrganOperationalRepository} from "@/domain/common/organ-operational/organ-operational.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrganOperational])],
    providers: [OrganOperationalService, OrganOperationalProfile, OrganOperationalRepository],
    exports: [OrganOperationalRepository, OrganOperationalService],
})
export class OrganOperationalModule {
}
