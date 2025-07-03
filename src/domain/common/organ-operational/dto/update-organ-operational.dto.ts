import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import {CreateOrganOperationalDto} from "@/domain/common/organ-operational/dto/create-organ-operational.dto";


export class UpdateOrganOperationalDto extends PartialType(CreateOrganOperationalDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}