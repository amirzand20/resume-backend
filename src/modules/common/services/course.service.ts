// Course service file

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Course } from '../../../entity/course.entity';
import { CourseEducationGrade } from '../../../entity/course-education-grade.entity';
import { CourseField } from '../../../entity/course-field.entity';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseEducationGrade)
    private courseEducationGradeRepository: Repository<CourseEducationGrade>,
    @InjectRepository(CourseField)
    private courseFieldRepository: Repository<CourseField>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['educationGrades', 'courseFields'],
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['educationGrades', 'courseFields'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    // Validate required fields
    if (!createCourseDto.employeeTypeId) {
      throw new BadRequestException('Employee type ID is required');
    }
    
    if (!createCourseDto.employeeForceId) {
      throw new BadRequestException('Employee force ID is required');
    }

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create course
      const course = this.courseRepository.create({
        employeeTypeId: createCourseDto.employeeTypeId,
        employeeForceId: createCourseDto.employeeForceId,
        title: createCourseDto.title,
        startDate: createCourseDto.startDate,
        endDate: createCourseDto.endDate,
        recruitmentStatusId: createCourseDto.recruitmentStatusId,
        createdMethodId: createCourseDto.createdMethodId,
        tableId: createCourseDto.tableId,
      });

      const savedCourse = await this.courseRepository.save(course);

      // Create education grades if provided
      if (createCourseDto.educationGradeIds && createCourseDto.educationGradeIds.length > 0) {
        const educationGrades = createCourseDto.educationGradeIds.map(gradeId => {
          return this.courseEducationGradeRepository.create({
            courseId: savedCourse.id,
            educationGradeId: gradeId,
            adjustedMin: 0, // Default value
            createdMethodId: createCourseDto.createdMethodId,
            tableId: createCourseDto.tableId,
          });
        });
        await this.courseEducationGradeRepository.save(educationGrades);
      }

      // Create course fields if provided
      if (createCourseDto.courseFieldIds && createCourseDto.courseFieldIds.length > 0) {
        const courseFields = createCourseDto.courseFieldIds.map(fieldId => {
          return this.courseFieldRepository.create({
            courseId: savedCourse.id,
            courseFieldId: fieldId,
            capacity: 0, // Default value
            createdMethodId: createCourseDto.createdMethodId,
            tableId: createCourseDto.tableId,
          });
        });
        await this.courseFieldRepository.save(courseFields);
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      // Return the course with relations
      return this.findOne(savedCourse.id);
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update course properties
      if (updateCourseDto.employeeTypeId !== undefined) {
        course.employeeTypeId = updateCourseDto.employeeTypeId;
      }
      if (updateCourseDto.employeeForceId !== undefined) {
        course.employeeForceId = updateCourseDto.employeeForceId;
      }
      if (updateCourseDto.title !== undefined) {
        course.title = updateCourseDto.title;
      }
      if (updateCourseDto.startDate !== undefined) {
        course.startDate = updateCourseDto.startDate;
      }
      if (updateCourseDto.endDate !== undefined) {
        course.endDate = updateCourseDto.endDate;
      }
      if (updateCourseDto.recruitmentStatusId !== undefined) {
        course.recruitmentStatusId = updateCourseDto.recruitmentStatusId;
      }
      if (updateCourseDto.createdMethodId !== undefined) {
        course.createdMethodId = updateCourseDto.createdMethodId;
      }
      if (updateCourseDto.tableId !== undefined) {
        course.tableId = updateCourseDto.tableId;
      }

      // Save updated course
      await this.courseRepository.save(course);

      // Update education grades if provided
      if (updateCourseDto.educationGradeIds) {
        // Remove existing education grades
        await this.courseEducationGradeRepository.delete({ courseId: id });

        // Create new education grades
        if (updateCourseDto.educationGradeIds.length > 0) {
          const educationGrades = updateCourseDto.educationGradeIds.map(gradeId => {
            return this.courseEducationGradeRepository.create({
              courseId: id,
              educationGradeId: gradeId,
              adjustedMin: 0, // Default value
              createdMethodId: course.createdMethodId,
              tableId: course.tableId,
            });
          });
          await this.courseEducationGradeRepository.save(educationGrades);
        }
      }

      // Update course fields if provided
      if (updateCourseDto.courseFieldIds) {
        // Remove existing course fields
        await this.courseFieldRepository.delete({ courseId: id });

        // Create new course fields
        if (updateCourseDto.courseFieldIds.length > 0) {
          const courseFields = updateCourseDto.courseFieldIds.map(fieldId => {
            return this.courseFieldRepository.create({
              courseId: id,
              courseFieldId: fieldId,
              capacity: 0, // Default value
              createdMethodId: course.createdMethodId,
              tableId: course.tableId,
            });
          });
          await this.courseFieldRepository.save(courseFields);
        }
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      // Return the updated course with relations
      return this.findOne(id);
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Remove related education grades
      await this.courseEducationGradeRepository.delete({ courseId: id });

      // Remove related course fields
      await this.courseFieldRepository.delete({ courseId: id });

      // Remove course
      await this.courseRepository.remove(course);

      // Commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }
}
