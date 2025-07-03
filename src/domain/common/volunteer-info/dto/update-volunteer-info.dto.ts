import {PartialType} from "@nestjs/swagger";
import {CreateVolunteerInfoDto} from "@/domain/common/volunteer-info/dto/create-volunteer-info.dto";


export class UpdateVolunteerInfoDto extends PartialType(CreateVolunteerInfoDto) {}
