import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateForcePriorityDto } from './dto/create-force-priority.dto';
import { ForcePriority } from '@/entities/force-priority.entity';
import { ReadForcePriorityDto } from './dto/read-force-priority.dto';
import { UpdateForcePriorityDto } from './dto/update-force-priority.dto';

@Injectable()
export class ForcePriorityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ForcePriority, ReadForcePriorityDto);
      createMap(mapper, ReadForcePriorityDto, ForcePriority);
      createMap(mapper, CreateForcePriorityDto, ForcePriority);
      createMap(mapper, UpdateForcePriorityDto, ForcePriority);
    };
  }
} 