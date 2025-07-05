import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEducationGrade } from '@/entities/course-education-grade.entity';
import { CourseEducationGradeRepository } from './course-education-grade.repository';
import { CourseEducationGradeService } from './course-education-grade.service';
import { CourseEducationGradeController } from './course-education-grade.controller';
import { CourseEducationGradeProfile } from './course-education-grade.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEducationGrade]),
  ],
  controllers: [CourseEducationGradeController],
  providers: [
    CourseEducationGradeRepository,
    CourseEducationGradeService,
    CourseEducationGradeProfile,
  ],
  exports: [CourseEducationGradeRepository, CourseEducationGradeService],
})
export class CourseEducationGradeModule {} 