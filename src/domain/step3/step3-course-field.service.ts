import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { Step3CourseFieldRepository } from './step3-course-field.repository';
import { Step3CourseRepository } from './step3-course.repository';
import { 
  CreateCourseFieldDto, 
  UpdateCourseFieldDto, 
  ReadCourseFieldDto 
} from './dto';
import { CourseField } from '../../entities/course-field.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class Step3CourseFieldService {
  constructor(
    private readonly courseFieldRepository: Step3CourseFieldRepository,
    private readonly courseRepository: Step3CourseRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(createCourseFieldDto: CreateCourseFieldDto): Promise<ReadCourseFieldDto> {
    // Validate course exists
    const course = await this.courseRepository.findById(createCourseFieldDto.courseId);
    if (!course) {
      throw new BadRequestException('دوره مورد نظر یافت نشد');
    }

    // Check if course field already exists for this course
    const existingCourseField = await this.courseFieldRepository.findByCourseAndField(
      createCourseFieldDto.courseId,
      createCourseFieldDto.courseFieldId
    );
    
    if (existingCourseField) {
      throw new ConflictException('رشته دوره برای این دوره قبلاً تعریف شده است');
    }

    // Validate capacity is positive
    if (createCourseFieldDto.capacity <= 0) {
      throw new BadRequestException('ظرفیت باید عدد مثبت باشد');
    }

    // Create course field with audit fields
    const courseFieldData: Partial<CourseField> = {
      ...createCourseFieldDto,
      createdDate: new Date(),
      createdBy: createCourseFieldDto.createdBy
    };

    const courseField = await this.courseFieldRepository.create(courseFieldData);
    return this.mapper.map(courseField, CourseField, ReadCourseFieldDto);
  }

  async findAll(): Promise<ReadCourseFieldDto[]> {
    const courseFields = await this.courseFieldRepository.findAll();
    return this.mapper.mapArray(courseFields, CourseField, ReadCourseFieldDto);
  }

  async findById(id: number): Promise<ReadCourseFieldDto> {
    const courseField = await this.courseFieldRepository.findById(id);
    if (!courseField) {
      throw new NotFoundException('رشته دوره مورد نظر یافت نشد');
    }
    return this.mapper.map(courseField, CourseField, ReadCourseFieldDto);
  }

  async update(id: number, updateCourseFieldDto: UpdateCourseFieldDto): Promise<ReadCourseFieldDto> {
    const existingCourseField = await this.courseFieldRepository.findById(id);
    if (!existingCourseField) {
      throw new NotFoundException('رشته دوره مورد نظر یافت نشد');
    }

    // Validate course exists if courseId is being updated
    if (updateCourseFieldDto.courseId) {
      const course = await this.courseRepository.findById(updateCourseFieldDto.courseId);
      if (!course) {
        throw new BadRequestException('دوره مورد نظر یافت نشد');
      }
    }

    // Check if course field already exists for this course (excluding current record)
    if (updateCourseFieldDto.courseId && updateCourseFieldDto.courseFieldId) {
      const existingCourseFieldRecord = await this.courseFieldRepository.findByCourseAndField(
        updateCourseFieldDto.courseId,
        updateCourseFieldDto.courseFieldId,
        id
      );
      
      if (existingCourseFieldRecord) {
        throw new ConflictException('رشته دوره برای این دوره قبلاً تعریف شده است');
      }
    }

    // Validate capacity is positive if being updated
    if (updateCourseFieldDto.capacity !== undefined && updateCourseFieldDto.capacity <= 0) {
      throw new BadRequestException('ظرفیت باید عدد مثبت باشد');
    }

    // Prepare update data - only include defined fields
    const updateData: Partial<CourseField> = {};
    
    if (updateCourseFieldDto.courseId !== undefined) {
      updateData.courseId = updateCourseFieldDto.courseId;
    }
    
    if (updateCourseFieldDto.courseFieldId !== undefined) {
      updateData.courseFieldId = updateCourseFieldDto.courseFieldId;
    }
    
    if (updateCourseFieldDto.capacity !== undefined) {
      updateData.capacity = updateCourseFieldDto.capacity;
    }
    
    if (updateCourseFieldDto.createdMethodId !== undefined) {
      updateData.createdMethodId = updateCourseFieldDto.createdMethodId;
    }
    
    if (updateCourseFieldDto.tableId !== undefined) {
      updateData.tableId = updateCourseFieldDto.tableId;
    }

    if (updateCourseFieldDto.updatedBy) {
      updateData.updatedBy = updateCourseFieldDto.updatedBy;
      updateData.updatedDate = new Date();
    }

    const updatedCourseField = await this.courseFieldRepository.update(id, updateData);
    if (!updatedCourseField) {
      throw new NotFoundException('خطا در بروزرسانی رشته دوره');
    }

    return this.mapper.map(updatedCourseField, CourseField, ReadCourseFieldDto);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existingCourseField = await this.courseFieldRepository.findById(id);
    if (!existingCourseField) {
      throw new NotFoundException('رشته دوره مورد نظر یافت نشد');
    }

    const deleted = await this.courseFieldRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException('خطا در حذف رشته دوره');
    }

    return { message: 'رشته دوره با موفقیت حذف شد' };
  }

  async findByCourseId(courseId: number): Promise<ReadCourseFieldDto[]> {
    // Validate course exists
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException('دوره مورد نظر یافت نشد');
    }

    const courseFields = await this.courseFieldRepository.findByCourseId(courseId);
    return this.mapper.mapArray(courseFields, CourseField, ReadCourseFieldDto);
  }

  async findByCourseFieldId(courseFieldId: number): Promise<ReadCourseFieldDto[]> {
    const courseFields = await this.courseFieldRepository.findByCourseFieldId(courseFieldId);
    return this.mapper.mapArray(courseFields, CourseField, ReadCourseFieldDto);
  }

  async findByCapacity(capacity: number): Promise<ReadCourseFieldDto[]> {
    const courseFields = await this.courseFieldRepository.findByCapacity(capacity);
    return this.mapper.mapArray(courseFields, CourseField, ReadCourseFieldDto);
  }
} 