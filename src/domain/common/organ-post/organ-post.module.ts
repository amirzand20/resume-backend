import {TypeOrmModule} from "@nestjs/typeorm";
import {OrganPost} from "@/entities/organ-post.entity";
import {Module} from "@nestjs/common";
import {OrganPostService} from "@/domain/common/organ-post/organ-post.service";
import {OrganPostProfile} from "@/domain/common/organ-post/organ-post.profile";
import {OrganPostRepository} from "@/domain/common/organ-post/organ-post.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrganPost])],
    providers: [OrganPostService, OrganPostProfile, OrganPostRepository],
    exports: [OrganPostRepository, OrganPostService],
})
export class OrganPostModule {
}
