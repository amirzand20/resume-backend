import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Course } from './course.entity';

@Entity('tb_course_education_grade')
export class CourseEducationGrade extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'course_id' })
  courseId: number;

  @Column({ type: 'int', name: 'education_grade_id' })
  educationGradeId: number;

  @Column({ type: 'int', nullable: true, name: 'education_field_id' })
  educationFieldId: number;

  @Column({ type: 'int', name: 'adjusted_min' })
  adjustedMin: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Course, course => course.educationGrades)
  @JoinColumn({ name: 'courseId' })
  course: Course;
}