import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from '@/entities/skill.entity';
import { ReadSkillDto } from './dto/read-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Skill, ReadSkillDto);
      createMap(mapper, ReadSkillDto, Skill);
      createMap(mapper, CreateSkillDto, Skill);
      createMap(mapper, UpdateSkillDto, Skill);
    };
  }
} 