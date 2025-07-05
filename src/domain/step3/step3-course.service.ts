import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Step3CourseRepository } from './step3-course.repository';
import { 
  CreateCourseDto, 
  UpdateCourseDto, 
  ReadCourseDto 
} from './dto';
import { Course } from '../../entities/course.entity';

@Injectable()
export class Step3CourseService {
  constructor(
    private readonly courseRepository: Step3CourseRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<ReadCourseDto> {
    // Validate start date is before end date
    const startDate = new Date(createCourseDto.startDate);
    const endDate = new Date(createCourseDto.endDate);
    
    if (startDate >= endDate) {
      throw new BadRequestException('تاریخ شروع باید قبل از تاریخ پایان باشد');
    }

    // Check if course with same title exists
    const existingCourse = await this.courseRepository.findByTitle(createCourseDto.title);
    if (existingCourse) {
      throw new ConflictException('دوره با این عنوان قبلاً وجود دارد');
    }

    // Create course with audit fields
    const courseData: Partial<Course> = {
      ...createCourseDto,
      startDate,
      endDate,
      createdDate: new Date(),
      createdBy: createCourseDto.createdBy
    };

    const course = await this.courseRepository.create(courseData);
    return this.mapToReadDto(course);
  }

  async findAll(): Promise<ReadCourseDto[]> {
    const courses = await this.courseRepository.findAll();
    return courses.map(course => this.mapToReadDto(course));
  }

  async findById(id: number): Promise<ReadCourseDto> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException('دوره مورد نظر یافت نشد');
    }
    return this.mapToReadDto(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<ReadCourseDto> {
    const existingCourse = await this.courseRepository.findById(id);
    if (!existingCourse) {
      throw new NotFoundException('دوره مورد نظر یافت نشد');
    }

    // Validate start date is before end date if both are provided
    if (updateCourseDto.startDate && updateCourseDto.endDate) {
      const startDate = new Date(updateCourseDto.startDate);
      const endDate = new Date(updateCourseDto.endDate);
      
      if (startDate >= endDate) {
        throw new BadRequestException('تاریخ شروع باید قبل از تاریخ پایان باشد');
      }
    }

    // Check if course with same title exists (excluding current course)
    if (updateCourseDto.title) {
      const existingCourseWithTitle = await this.courseRepository.findByTitle(updateCourseDto.title, id);
      if (existingCourseWithTitle) {
        throw new ConflictException('دوره با این عنوان قبلاً وجود دارد');
      }
    }

    // Prepare update data - only include defined fields
    const updateData: Partial<Course> = {};
    
    if (updateCourseDto.employeeTypeId !== undefined) {
      updateData.employeeTypeId = updateCourseDto.employeeTypeId;
    }
    
    if (updateCourseDto.employeeForceId !== undefined) {
      updateData.employeeForceId = updateCourseDto.employeeForceId;
    }
    
    if (updateCourseDto.title !== undefined) {
      updateData.title = updateCourseDto.title;
    }
    
    if (updateCourseDto.startDate) {
      updateData.startDate = new Date(updateCourseDto.startDate);
    }
    
    if (updateCourseDto.endDate) {
      updateData.endDate = new Date(updateCourseDto.endDate);
    }
    
    if (updateCourseDto.recruitmentStatusId !== undefined) {
      updateData.recruitmentStatusId = updateCourseDto.recruitmentStatusId;
    }
    
    if (updateCourseDto.createdMethodId !== undefined) {
      updateData.createdMethodId = updateCourseDto.createdMethodId;
    }
    
    if (updateCourseDto.tableId !== undefined) {
      updateData.tableId = updateCourseDto.tableId;
    }

    if (updateCourseDto.updatedBy) {
      updateData.updatedBy = updateCourseDto.updatedBy;
      updateData.updatedDate = new Date();
    }

    const updatedCourse = await this.courseRepository.update(id, updateData);
    if (!updatedCourse) {
      throw new NotFoundException('خطا در بروزرسانی دوره');
    }

    return this.mapToReadDto(updatedCourse);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existingCourse = await this.courseRepository.findById(id);
    if (!existingCourse) {
      throw new NotFoundException('دوره مورد نظر یافت نشد');
    }

    const deleted = await this.courseRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException('خطا در حذف دوره');
    }

    return { message: 'دوره با موفقیت حذف شد' };
  }

  async findByEmployeeTypeId(employeeTypeId: number): Promise<ReadCourseDto[]> {
    const courses = await this.courseRepository.findByEmployeeTypeId(employeeTypeId);
    return courses.map(course => this.mapToReadDto(course));
  }

  async findByEmployeeForceId(employeeForceId: number): Promise<ReadCourseDto[]> {
    const courses = await this.courseRepository.findByEmployeeForceId(employeeForceId);
    return courses.map(course => this.mapToReadDto(course));
  }

  private mapToReadDto(course: Course): ReadCourseDto {
    return {
      id: course.id,
      employeeTypeId: course.employeeTypeId,
      employeeForceId: course.employeeForceId,
      title: course.title,
      startDate: course.startDate,
      endDate: course.endDate,
      recruitmentStatusId: course.recruitmentStatusId,
      createdMethodId: course.createdMethodId,
      tableId: course.tableId,
      createdAt: course.createdDate,
      updatedAt: course.updatedDate
    };
  }
} 