import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCourseFieldDto } from './dto/create-course-field.dto';
import { CourseField } from '@/entities/course-field.entity';
import { ReadCourseFieldDto } from './dto/read-course-field.dto';
import { UpdateCourseFieldDto } from './dto/update-course-field.dto';

@Injectable()
export class CourseFieldProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CourseField, ReadCourseFieldDto);
      createMap(mapper, ReadCourseFieldDto, CourseField);
      createMap(mapper, CreateCourseFieldDto, CourseField);
      createMap(mapper, UpdateCourseFieldDto, CourseField);
    };
  }
} 