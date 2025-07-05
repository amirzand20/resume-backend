import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';

@Injectable()
export class Step3CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData);
    return await this.courseRepository.save(course);
  }

  async findById(id: number): Promise<Course | null> {
    return await this.courseRepository.findOne({
      where: { id }
    });
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async update(id: number, courseData: Partial<Course>): Promise<Course | null> {
    await this.courseRepository.update(id, courseData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.courseRepository.delete(id);
    return result.affected > 0;
  }

  async findByTitle(title: string, excludeId?: number): Promise<Course | null> {
    const query = this.courseRepository.createQueryBuilder('course')
      .where('course.title = :title', { title });
    
    if (excludeId) {
      query.andWhere('course.id != :excludeId', { excludeId });
    }
    
    return await query.getOne();
  }

  async findByEmployeeTypeId(employeeTypeId: number): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { employeeTypeId }
    });
  }

  async findByEmployeeForceId(employeeForceId: number): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { employeeForceId }
    });
  }
} 