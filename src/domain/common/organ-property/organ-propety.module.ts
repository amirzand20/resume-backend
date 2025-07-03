import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {OrganProperty} from "@/entities/organ-property.entity";
import {OrganPropertyService} from "@/domain/common/organ-property/organ-property.service";
import {OrganPropertyProfile} from "@/domain/common/organ-property/organ-property.profile";
import {OrganPropertyRepository} from "@/domain/common/organ-property/organ-property.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrganProperty])],
    providers: [
        OrganPropertyService,
        OrganPropertyProfile,
        OrganPropertyRepository,
    ],
    exports: [OrganPropertyRepository, OrganPropertyService],
})
export class OrganPropertyModule {
}
