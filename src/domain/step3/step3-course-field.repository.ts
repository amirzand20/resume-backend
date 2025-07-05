import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseField } from '../../entities/course-field.entity';

@Injectable()
export class Step3CourseFieldRepository {
  constructor(
    @InjectRepository(CourseField)
    private readonly courseFieldRepository: Repository<CourseField>,
  ) {}

  async create(courseFieldData: Partial<CourseField>): Promise<CourseField> {
    const courseField = this.courseFieldRepository.create(courseFieldData);
    return await this.courseFieldRepository.save(courseField);
  }

  async findById(id: number): Promise<CourseField | null> {
    return await this.courseFieldRepository.findOne({
      where: { id },
      relations: ['course']
    });
  }

  async findAll(): Promise<CourseField[]> {
    return await this.courseFieldRepository.find({
      relations: ['course']
    });
  }

  async update(id: number, courseFieldData: Partial<CourseField>): Promise<CourseField | null> {
    await this.courseFieldRepository.update(id, courseFieldData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.courseFieldRepository.delete(id);
    return result.affected > 0;
  }

  async findByCourseId(courseId: number): Promise<CourseField[]> {
    return await this.courseFieldRepository.find({
      where: { courseId },
      relations: ['course']
    });
  }

  async findByCourseFieldId(courseFieldId: number): Promise<CourseField[]> {
    return await this.courseFieldRepository.find({
      where: { courseFieldId },
      relations: ['course']
    });
  }

  async findByCourseAndField(courseId: number, courseFieldId: number, excludeId?: number): Promise<CourseField | null> {
    const query = this.courseFieldRepository.createQueryBuilder('courseField')
      .where('courseField.courseId = :courseId', { courseId })
      .andWhere('courseField.courseFieldId = :courseFieldId', { courseFieldId });
    
    if (excludeId) {
      query.andWhere('courseField.id != :excludeId', { excludeId });
    }
    
    return await query.getOne();
  }

  async findByCapacity(capacity: number): Promise<CourseField[]> {
    return await this.courseFieldRepository.find({
      where: { capacity },
      relations: ['course']
    });
  }
} 