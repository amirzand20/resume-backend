import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePropertiesDto } from './dto/create-properties.dto';
import { Properties } from '@/entities/properties.entity';
import { ReadPropertiesDto } from './dto/read-properties.dto';
import { UpdatePropertiesDto } from './dto/update-properties.dto';

@Injectable()
export class PropertiesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Properties, ReadPropertiesDto);
      createMap(mapper, ReadPropertiesDto, Properties);
      createMap(mapper, CreatePropertiesDto, Properties);
      createMap(mapper, UpdatePropertiesDto, Properties);
    };
  }
} 