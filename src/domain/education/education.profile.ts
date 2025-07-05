import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from '@/entities/education.entity';
import { ReadEducationDto } from './dto/read-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Education, ReadEducationDto);
      createMap(mapper, ReadEducationDto, Education);
      createMap(mapper, CreateEducationDto, Education);
      createMap(mapper, UpdateEducationDto, Education);
    };
  }
} 