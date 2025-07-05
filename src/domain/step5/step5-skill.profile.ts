import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Skill } from '@/entities/skill.entity';
import { ReadSkillDto } from './dto/read-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class Step5SkillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Skill,
        ReadSkillDto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.personId, mapFrom(src => src.personId)),
        forMember(dest => dest.skillTypeId, mapFrom(src => src.skillTypeId)),
        forMember(dest => dest.skillLevel, mapFrom(src => src.skillLevel)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.createdBy, mapFrom(src => src.createdBy)),
        forMember(dest => dest.createdDate, mapFrom(src => src.createdDate)),
        forMember(dest => dest.updatedBy, mapFrom(src => src.updatedBy)),
        forMember(dest => dest.updatedDate, mapFrom(src => src.updatedDate)),
      );
      createMap(mapper, ReadSkillDto, Skill);
      createMap(mapper, CreateSkillDto, Skill);
      createMap(mapper, UpdateSkillDto, Skill);
    };
  }
} 