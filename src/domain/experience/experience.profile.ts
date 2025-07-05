import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from '@/entities/experience.entity';
import { ReadExperienceDto } from './dto/read-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Experience, ReadExperienceDto);
      createMap(mapper, ReadExperienceDto, Experience);
      createMap(mapper, CreateExperienceDto, Experience);
      createMap(mapper, UpdateExperienceDto, Experience);
    };
  }
} 