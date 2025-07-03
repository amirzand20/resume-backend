import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, Mapper, mapWith} from "@automapper/core";
import {Personal} from "@/entities/personal.entity";
import { Organ } from "@/entities/organ.entity";
import { ReadOrganDto } from "../organ/dto/read-organ.dto";
import { CreatePersonalDto } from "./dto/create-personal.dto";
import { ReadPersonalDto } from "./dto/read-personal.dto";
import { UpdatePersonalDto } from "./dto/update-personal.dto";

@Injectable()
export class PersonalProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreatePersonalDto, Personal);

      createMap(
        mapper,
        ReadPersonalDto,
        Personal,
        forMember(
          (d) => d.organ,
          mapWith(Organ, ReadOrganDto, (s) => s.organ),
        ),
      );
      createMap(
        mapper,
        Personal,
        ReadPersonalDto,
        forMember(
          (d) => d.organ,
          mapWith(Organ, ReadOrganDto, (s) => s.organ),
        ),
      );
      createMap(mapper, UpdatePersonalDto, Personal);

    };
  }
}
