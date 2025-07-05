import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Step3CourseEducationGradeRepository } from './step3-course-education-grade.repository';
import { Step3CourseRepository } from './step3-course.repository';
import { 
  CreateCourseEducationGradeDto, 
  UpdateCourseEducationGradeDto, 
  ReadCourseEducationGradeDto 
} from './dto';
import { CourseEducationGrade } from '../../entities/course-education-grade.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class Step3CourseEducationGradeService {
  constructor(
    private readonly courseEducationGradeRepository: Step3CourseEducationGradeRepository,
    private readonly courseRepository: Step3CourseRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(createCourseEducationGradeDto: CreateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    // Validate course exists
    const course = await this.courseRepository.findById(createCourseEducationGradeDto.courseId);
    if (!course) {
      throw new BadRequestException('دوره مورد نظر یافت نشد');
    }

    // Check if education grade already exists for this course
    const existingEducationGrade = await this.courseEducationGradeRepository.findByCourseAndEducationGrade(
      createCourseEducationGradeDto.courseId,
      createCourseEducationGradeDto.educationGradeId
    );
    
    if (existingEducationGrade) {
      throw new ConflictException('مقطع تحصیلی برای این دوره قبلاً تعریف شده است');
    }

    // Create course education grade with audit fields
    const courseEducationGradeData: Partial<CourseEducationGrade> = {
      ...createCourseEducationGradeDto,
      createdDate: new Date(),
      createdBy: createCourseEducationGradeDto.createdBy
    };

    const courseEducationGrade = await this.courseEducationGradeRepository.create(courseEducationGradeData);
    return this.mapper.map(courseEducationGrade, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async findAll(): Promise<ReadCourseEducationGradeDto[]> {
    const courseEducationGrades = await this.courseEducationGradeRepository.findAll();
    return this.mapper.mapArray(courseEducationGrades, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async findById(id: number): Promise<ReadCourseEducationGradeDto> {
    const courseEducationGrade = await this.courseEducationGradeRepository.findById(id);
    if (!courseEducationGrade) {
      throw new NotFoundException('مقطع تحصیلی دوره مورد نظر یافت نشد');
    }
    return this.mapper.map(courseEducationGrade, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async update(id: number, updateCourseEducationGradeDto: UpdateCourseEducationGradeDto): Promise<ReadCourseEducationGradeDto> {
    const existingCourseEducationGrade = await this.courseEducationGradeRepository.findById(id);
    if (!existingCourseEducationGrade) {
      throw new NotFoundException('مقطع تحصیلی دوره مورد نظر یافت نشد');
    }

    // Validate course exists if courseId is being updated
    if (updateCourseEducationGradeDto.courseId) {
      const course = await this.courseRepository.findById(updateCourseEducationGradeDto.courseId);
      if (!course) {
        throw new BadRequestException('دوره مورد نظر یافت نشد');
      }
    }

    // Check if education grade already exists for this course (excluding current record)
    if (updateCourseEducationGradeDto.courseId && updateCourseEducationGradeDto.educationGradeId) {
      const existingEducationGrade = await this.courseEducationGradeRepository.findByCourseAndEducationGrade(
        updateCourseEducationGradeDto.courseId,
        updateCourseEducationGradeDto.educationGradeId,
        id
      );
      
      if (existingEducationGrade) {
        throw new ConflictException('مقطع تحصیلی برای این دوره قبلاً تعریف شده است');
      }
    }

    // Prepare update data - only include defined fields
    const updateData: Partial<CourseEducationGrade> = {};
    
    if (updateCourseEducationGradeDto.courseId !== undefined) {
      updateData.courseId = updateCourseEducationGradeDto.courseId;
    }
    
    if (updateCourseEducationGradeDto.educationGradeId !== undefined) {
      updateData.educationGradeId = updateCourseEducationGradeDto.educationGradeId;
    }
    
    if (updateCourseEducationGradeDto.educationFieldId !== undefined) {
      updateData.educationFieldId = updateCourseEducationGradeDto.educationFieldId;
    }
    
    if (updateCourseEducationGradeDto.adjustedMin !== undefined) {
      updateData.adjustedMin = updateCourseEducationGradeDto.adjustedMin;
    }
    
    if (updateCourseEducationGradeDto.createdMethodId !== undefined) {
      updateData.createdMethodId = updateCourseEducationGradeDto.createdMethodId;
    }
    
    if (updateCourseEducationGradeDto.tableId !== undefined) {
      updateData.tableId = updateCourseEducationGradeDto.tableId;
    }

    if (updateCourseEducationGradeDto.updatedBy) {
      updateData.updatedBy = updateCourseEducationGradeDto.updatedBy;
      updateData.updatedDate = new Date();
    }

    const updatedCourseEducationGrade = await this.courseEducationGradeRepository.update(id, updateData);
    if (!updatedCourseEducationGrade) {
      throw new NotFoundException('خطا در بروزرسانی مقطع تحصیلی دوره');
    }

    return this.mapper.map(updatedCourseEducationGrade, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existingCourseEducationGrade = await this.courseEducationGradeRepository.findById(id);
    if (!existingCourseEducationGrade) {
      throw new NotFoundException('مقطع تحصیلی دوره مورد نظر یافت نشد');
    }

    const deleted = await this.courseEducationGradeRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException('خطا در حذف مقطع تحصیلی دوره');
    }

    return { message: 'مقطع تحصیلی دوره با موفقیت حذف شد' };
  }

  async findByCourseId(courseId: number): Promise<ReadCourseEducationGradeDto[]> {
    // Validate course exists
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('دوره مورد نظر یافت نشد');
    }

    const courseEducationGrades = await this.courseEducationGradeRepository.findByCourseId(courseId);
    return this.mapper.mapArray(courseEducationGrades, CourseEducationGrade, ReadCourseEducationGradeDto);
  }

  async findByEducationGradeId(educationGradeId: number): Promise<ReadCourseEducationGradeDto[]> {
    const courseEducationGrades = await this.courseEducationGradeRepository.findByEducationGradeId(educationGradeId);
    return this.mapper.mapArray(courseEducationGrades, CourseEducationGrade, ReadCourseEducationGradeDto);
  }
} 