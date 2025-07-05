import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { ContactInfo } from '@/entities/contact-info.entity';
import { ReadContactInfoDto } from './dto/read-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Injectable()
export class ContactInfoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ContactInfo, ReadContactInfoDto);
      createMap(mapper, ReadContactInfoDto, ContactInfo);
      createMap(mapper, CreateContactInfoDto, ContactInfo);
      createMap(mapper, UpdateContactInfoDto, ContactInfo);
    };
  }
} 