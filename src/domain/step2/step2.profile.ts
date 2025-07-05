import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ContactInfo } from '@/entities/contact-info.entity';
import { ReadStep2Dto } from './dto/read-step2.dto';
import { CreateStep2Dto } from './dto/create-step2.dto';
import { UpdateStep2Dto } from './dto/update-step2.dto';

@Injectable()
export class Step2Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ContactInfo,
        ReadStep2Dto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.personId, mapFrom(src => src.personId)),
        forMember(dest => dest.locationPlaceId, mapFrom(src => src.locationPlaceId)),
        forMember(dest => dest.locationAddress, mapFrom(src => src.locationAddress)),
        forMember(dest => dest.mobileNumber, mapFrom(src => src.mobileNumber)),
        forMember(dest => dest.telephoneNumber, mapFrom(src => src.telephoneNumber)),
        forMember(dest => dest.postCode, mapFrom(src => src.postCode)),
        forMember(dest => dest.fatherMobileNumber, mapFrom(src => src.fatherMobileNumber)),
        forMember(dest => dest.motherMobileNumber, mapFrom(src => src.motherMobileNumber)),
        forMember(dest => dest.emailAddress, mapFrom(src => src.emailAddress)),
        forMember(dest => dest.familiarMobileNumber, mapFrom(src => src.familiarMobileNumber)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.isActive, mapFrom(src => src.isActive)),
        forMember(dest => dest.createdAt, mapFrom(src => src.createdDate)),
        forMember(dest => dest.updatedAt, mapFrom(src => src.updatedDate)),
      );
      createMap(mapper, ReadStep2Dto, ContactInfo);
      createMap(mapper, CreateStep2Dto, ContactInfo);
      createMap(mapper, UpdateStep2Dto, ContactInfo);
    };
  }
} 