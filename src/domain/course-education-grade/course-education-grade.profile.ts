import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCourseEducationGradeDto } from './dto/create-course-education-grade.dto';
import { CourseEducationGrade } from '@/entities/course-education-grade.entity';
import { ReadCourseEducationGradeDto } from './dto/read-course-education-grade.dto';
import { UpdateCourseEducationGradeDto } from './dto/update-course-education-grade.dto';

@Injectable()
export class CourseEducationGradeProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CourseEducationGrade, ReadCourseEducationGradeDto);
      createMap(mapper, ReadCourseEducationGradeDto, CourseEducationGrade);
      createMap(mapper, CreateCourseEducationGradeDto, CourseEducationGrade);
      createMap(mapper, UpdateCourseEducationGradeDto, CourseEducationGrade);
    };
  }
} 