import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '@/entities/course.entity';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseProfile } from './course.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
  ],
  controllers: [CourseController],
  providers: [
    CourseRepository,
    CourseService,
    CourseProfile,
  ],
  exports: [CourseRepository, CourseService],
})
export class CourseModule {} 