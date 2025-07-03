import {createMap, forMember, Mapper, mapWith} from "@automapper/core";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {Injectable} from "@nestjs/common";
import {BaseInfoItem} from "@/entities/base-info-item.entity";
import {OrganOperational} from "@/entities/organ-operational.entity";
import {ReadOrganOperationalDto} from "@/domain/common/organ-operational/dto/read-organ-operational.dto";
import {ReadOrganDto} from "@/domain/common/organ/dto/read-organ.dto";
import {Organ} from "@/entities/organ.entity";
import {ReadBaseInfoItemDto} from "@/domain/common/base-info-item/dto/read-base-info-item.dto";
import {CreateOrganOperationalDto} from "@/domain/common/organ-operational/dto/create-organ-operational.dto";
import {UpdateOrganOperationalDto} from "@/domain/common/organ-operational/dto/update-organ-operational.dto";


@Injectable()
export class OrganOperationalProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                OrganOperational,
                ReadOrganOperationalDto,
                forMember(
                    (d) => d.organ,
                    mapWith(ReadOrganDto, Organ, (s) => s.organ),
                ),
                forMember(
                    (d) => d.operational,
                    mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.operational),
                ),
            );
            createMap(mapper, ReadOrganOperationalDto, OrganOperational);
            createMap(mapper, CreateOrganOperationalDto, OrganOperational);
            createMap(mapper, UpdateOrganOperationalDto, OrganOperational);
        };
    }
}

