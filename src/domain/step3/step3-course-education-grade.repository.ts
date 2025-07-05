import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEducationGrade } from '../../entities/course-education-grade.entity';

@Injectable()
export class Step3CourseEducationGradeRepository {
  constructor(
    @InjectRepository(CourseEducationGrade)
    private readonly courseEducationGradeRepository: Repository<CourseEducationGrade>,
  ) {}

  async create(courseEducationGradeData: Partial<CourseEducationGrade>): Promise<CourseEducationGrade> {
    const courseEducationGrade = this.courseEducationGradeRepository.create(courseEducationGradeData);
    return await this.courseEducationGradeRepository.save(courseEducationGrade);
  }

  async findById(id: number): Promise<CourseEducationGrade | null> {
    return await this.courseEducationGradeRepository.findOne({
      where: { id },
      relations: ['course']
    });
  }

  async findAll(): Promise<CourseEducationGrade[]> {
    return await this.courseEducationGradeRepository.find({
      relations: ['course']
    });
  }

  async update(id: number, courseEducationGradeData: Partial<CourseEducationGrade>): Promise<CourseEducationGrade | null> {
    await this.courseEducationGradeRepository.update(id, courseEducationGradeData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.courseEducationGradeRepository.delete(id);
    return result.affected > 0;
  }

  async findByCourseId(courseId: number): Promise<CourseEducationGrade[]> {
    return await this.courseEducationGradeRepository.find({
      where: { courseId },
      relations: ['course']
    });
  }

  async findByEducationGradeId(educationGradeId: number): Promise<CourseEducationGrade[]> {
    return await this.courseEducationGradeRepository.find({
      where: { educationGradeId },
      relations: ['course']
    });
  }

  async findByCourseAndEducationGrade(courseId: number, educationGradeId: number, excludeId?: number): Promise<CourseEducationGrade | null> {
    const query = this.courseEducationGradeRepository.createQueryBuilder('courseEducationGrade')
      .where('courseEducationGrade.courseId = :courseId', { courseId })
      .andWhere('courseEducationGrade.educationGradeId = :educationGradeId', { educationGradeId });
    
    if (excludeId) {
      query.andWhere('courseEducationGrade.id != :excludeId', { excludeId });
    }
    
    return await query.getOne();
  }
} 