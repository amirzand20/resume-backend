import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import {CreateOrganDto} from "@/domain/common/organ/dto/create-organ.dto";

export class UpdateOrganDto extends PartialType(CreateOrganDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}