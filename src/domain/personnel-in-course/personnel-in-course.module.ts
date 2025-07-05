import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelInCourse } from '@/entities/personnel-in-course.entity';
import { PersonnelInCourseRepository } from './personnel-in-course.repository';
import { PersonnelInCourseService } from './personnel-in-course.service';
import { PersonnelInCourseController } from './personnel-in-course.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonnelInCourse]),
  ],
  controllers: [PersonnelInCourseController],
  providers: [
    PersonnelInCourseRepository,
    PersonnelInCourseService,
  ],
  exports: [PersonnelInCourseRepository, PersonnelInCourseService],
})
export class PersonnelInCourseModule {} 