import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Person } from '@/entities/Person.entity';
import { ReadStep1Dto } from './dto/read-step1.dto';
import { CreateStep1Dto } from './dto/create-step1.dto';
import { UpdateStep1Dto } from './dto/update-step1.dto';

@Injectable()
export class Step1Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Person,
        ReadStep1Dto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.nationalNo, mapFrom(src => src.nationalNo)),
        forMember(dest => dest.firstName, mapFrom(src => src.firstName)),
        forMember(dest => dest.lastName, mapFrom(src => src.lastName)),
        forMember(dest => dest.birthDate, mapFrom(src => src.birthDate)),
        forMember(dest => dest.birthPlaceId, mapFrom(src => src.birthPlaceId)),
        forMember(dest => dest.locationPlaceId, mapFrom(src => src.locationPlaceId)),
        forMember(dest => dest.sexId, mapFrom(src => src.sexId)),
        forMember(dest => dest.aboutMe, mapFrom(src => src.aboutMe)),
        forMember(dest => dest.mobileNumber, mapFrom(src => src.mobileNumber)),
        forMember(dest => dest.telephoneNumber, mapFrom(src => src.telephoneNumber)),
        forMember(dest => dest.emailAddress, mapFrom(src => src.emailAddress)),
        forMember(dest => dest.address, mapFrom(src => src.address)),
        forMember(dest => dest.postCode, mapFrom(src => src.postCode)),
        forMember(dest => dest.profileImage, mapFrom(src => src.profileImage)),
        forMember(dest => dest.createdDate, mapFrom(src => src.createdDate)),
      );
      createMap(mapper, ReadStep1Dto, Person);
      createMap(mapper, CreateStep1Dto, Person);
      createMap(mapper, UpdateStep1Dto, Person);
    };
  }
} 