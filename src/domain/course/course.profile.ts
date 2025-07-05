import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from '@/entities/course.entity';
import { ReadCourseDto } from './dto/read-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Course, ReadCourseDto);
      createMap(mapper, ReadCourseDto, Course);
      createMap(mapper, CreateCourseDto, Course);
      createMap(mapper, UpdateCourseDto, Course);
    };
  }
} 