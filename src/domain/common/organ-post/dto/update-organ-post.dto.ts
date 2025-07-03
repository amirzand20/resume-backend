import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import {CreateOrganPostDto} from "@/domain/common/organ-post/dto/create-organ-post.dto";

export class UpdateOrganPostDto extends PartialType(CreateOrganPostDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}