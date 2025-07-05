import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { CourseEducationGrade } from '../../entities/course-education-grade.entity';
import { CourseField } from '../../entities/course-field.entity';

// Repositories
import { Step3CourseRepository } from './step3-course.repository';
import { Step3CourseEducationGradeRepository } from './step3-course-education-grade.repository';
import { Step3CourseFieldRepository } from './step3-course-field.repository';

// Services
import { Step3CourseService } from './step3-course.service';
import { Step3CourseEducationGradeService } from './step3-course-education-grade.service';
import { Step3CourseFieldService } from './step3-course-field.service';

// Controllers
import { Step3CourseController } from './step3-course.controller';
import { Step3CourseEducationGradeController } from './step3-course-education-grade.controller';
import { Step3CourseFieldController } from './step3-course-field.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CourseEducationGrade,
      CourseField
    ])
  ],
  controllers: [
    Step3CourseController,
    Step3CourseEducationGradeController,
    Step3CourseFieldController
  ],
  providers: [
    // Repositories
    Step3CourseRepository,
    Step3CourseEducationGradeRepository,
    Step3CourseFieldRepository,
    
    // Services
    Step3CourseService,
    Step3CourseEducationGradeService,
    Step3CourseFieldService
  ],
  exports: [
    // Repositories
    Step3CourseRepository,
    Step3CourseEducationGradeRepository,
    Step3CourseFieldRepository,
    
    // Services
    Step3CourseService,
    Step3CourseEducationGradeService,
    Step3CourseFieldService
  ]
})
export class Step3Module {} 