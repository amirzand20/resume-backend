import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '@/entities/course.entity';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
  ],
  controllers: [CourseController],
  providers: [
    CourseRepository,
    CourseService,
  ],
  exports: [CourseRepository, CourseService],
})
export class CourseModule {} 