import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { LanguageInfo } from '@/entities/language-info.entity';
import { ReadLanguageInfoDto } from './dto/read-language-info.dto';
import { CreateLanguageInfoDto } from './dto/create-language-info.dto';
import { UpdateLanguageInfoDto } from './dto/update-language-info.dto';

@Injectable()
export class Step6LanguageInfoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        LanguageInfo,
        ReadLanguageInfoDto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.personId, mapFrom(src => src.personId)),
        forMember(dest => dest.languageId, mapFrom(src => src.languageId)),
        forMember(dest => dest.readingLevel, mapFrom(src => src.readingLevel)),
        forMember(dest => dest.writingLevel, mapFrom(src => src.writingLevel)),
        forMember(dest => dest.speakingLevel, mapFrom(src => src.speakingLevel)),
        forMember(dest => dest.listeningLevel, mapFrom(src => src.listeningLevel)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.createdBy, mapFrom(src => src.createdBy)),
        forMember(dest => dest.createdDate, mapFrom(src => src.createdDate)),
        forMember(dest => dest.updatedBy, mapFrom(src => src.updatedBy)),
        forMember(dest => dest.updatedDate, mapFrom(src => src.updatedDate)),
      );
      createMap(mapper, ReadLanguageInfoDto, LanguageInfo);
      createMap(mapper, CreateLanguageInfoDto, LanguageInfo);
      createMap(mapper, UpdateLanguageInfoDto, LanguageInfo);
    };
  }
} 