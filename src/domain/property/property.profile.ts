import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from '@/entities/property.entity';
import { ReadPropertyDto } from './dto/read-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Property, ReadPropertyDto);
      createMap(mapper, ReadPropertyDto, Property);
      createMap(mapper, CreatePropertyDto, Property);
      createMap(mapper, UpdatePropertyDto, Property);
    };
  }
} 