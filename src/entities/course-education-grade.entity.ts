import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Course } from './course.entity';

@Entity('tb_course_education_grade')
export class CourseEducationGrade extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  courseId: number;

  @Column({ type: 'int' })
  educationGradeId: number;

  @Column({ type: 'int', nullable: true })
  educationFieldId: number;

  @Column({ type: 'int' })
  adjustedMin: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Course, course => course.educationGrades)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}