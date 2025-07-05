import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { LanguageInfo } from '@/entities/language-info.entity';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';

@Injectable()
export class LanguageInfoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, LanguageInfo, ReadLanguageInfoDto);
      createMap(mapper, ReadLanguageInfoDto, LanguageInfo);
      createMap(mapper, CreateLanguageInfoDto, LanguageInfo);
      createMap(mapper, UpdateLanguageInfoDto, LanguageInfo);
    };
  }
} 