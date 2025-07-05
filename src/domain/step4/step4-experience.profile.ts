import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Experience } from '@/entities/experience.entity';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class Step4ExperienceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Experience,
        ReadExperienceDto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.personId, mapFrom(src => src.personId)),
        forMember(dest => dest.jobTitle, mapFrom(src => src.jobTitle)),
        forMember(dest => dest.jobTypeId, mapFrom(src => src.jobTypeId)),
        forMember(dest => dest.jobOrganId, mapFrom(src => src.jobOrganId)),
        forMember(dest => dest.startDate, mapFrom(src => src.startDate)),
        forMember(dest => dest.endDate, mapFrom(src => src.endDate)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.createdDate, mapFrom(src => src.createdDate)),
        forMember(dest => dest.updatedDate, mapFrom(src => src.updatedDate)),
      );
      createMap(mapper, ReadExperienceDto, Experience);
      createMap(mapper, CreateExperienceDto, Experience);
      createMap(mapper, UpdateExperienceDto, Experience);
    };
  }
} 