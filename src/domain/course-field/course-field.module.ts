import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseField } from '@/entities/course-field.entity';
import { CourseFieldRepository } from './course-field.repository';
import { CourseFieldService } from './course-field.service';
import { CourseFieldController } from './course-field.controller';
import { CourseFieldProfile } from './course-field.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseField]),
  ],
  controllers: [CourseFieldController],
  providers: [
    CourseFieldRepository,
    CourseFieldService,
    CourseFieldProfile,
  ],
  exports: [CourseFieldRepository, CourseFieldService],
})
export class CourseFieldModule {} 