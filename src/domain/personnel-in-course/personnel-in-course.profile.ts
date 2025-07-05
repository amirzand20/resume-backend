import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePersonnelInCourseDto } from './dto/create-personnel-in-course.dto';
import { PersonnelInCourse } from '@/entities/personnel-in-course.entity';
import { ReadPersonnelInCourseDto } from './dto/read-personnel-in-course.dto';
import { UpdatePersonnelInCourseDto } from './dto/update-personnel-in-course.dto';

@Injectable()
export class PersonnelInCourseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, PersonnelInCourse, ReadPersonnelInCourseDto);
      createMap(mapper, ReadPersonnelInCourseDto, PersonnelInCourse);
      createMap(mapper, CreatePersonnelInCourseDto, PersonnelInCourse);
      createMap(mapper, UpdatePersonnelInCourseDto, PersonnelInCourse);
    };
  }
} 