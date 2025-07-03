import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { OrganPost } from "@/entities/organ-post.entity";
import { Organ } from "@/entities/organ.entity";
import { TreeRepository } from "typeorm";
import { WebOrganController } from "./web-organ.controller";
import {OrganProperty} from "@/entities/organ-property.entity";
import { OrganOperationalRepository } from "@/domain/common/organ-operational/organ-operational.repository";
import { OrganPostRepository } from "@/domain/common/organ-post/organ-post.repository";
import { OrganProfile } from "@/domain/common/organ/organ.profile";
import { OrganRepository } from "@/domain/common/organ/organ.repository";
import { OrganService } from "@/domain/common/organ/organ.service";

@Module({
    imports: [TypeOrmModule.forFeature([Organ, OrganOperational, OrganPost,OrganProperty])],
    controllers: [WebOrganController],
    providers: [OrganService, OrganProfile, OrganRepository, OrganOperationalRepository, OrganPostRepository, TreeRepository],
    exports: [OrganRepository, OrganService],

})
export class WebOrganModule { }