import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Course } from '@/entities/course.entity';
import { ReadCourseDto } from './dto/read-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class Step3CourseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Course,
        ReadCourseDto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.employeeTypeId, mapFrom(src => src.employeeTypeId)),
        forMember(dest => dest.employeeForceId, mapFrom(src => src.employeeForceId)),
        forMember(dest => dest.title, mapFrom(src => src.title)),
        forMember(dest => dest.startDate, mapFrom(src => src.startDate)),
        forMember(dest => dest.endDate, mapFrom(src => src.endDate)),
        forMember(dest => dest.recruitmentStatusId, mapFrom(src => src.recruitmentStatusId)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.createdAt, mapFrom(src => src.createdDate)),
        // updatedAt does not exist on Course entity, so do not map
      );
      createMap(mapper, ReadCourseDto, Course);
      createMap(mapper, CreateCourseDto, Course);
      createMap(mapper, UpdateCourseDto, Course);
    };
  }
} 