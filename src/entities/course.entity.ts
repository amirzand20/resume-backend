import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Audit } from './audit.entity';
import { CourseEducationGrade } from './course-education-grade.entity';
import { CourseField } from './course-field.entity';

@Entity('tb_course')
export class Course extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  employeeTypeId: number;

  @Column({ type: 'int' })
  employeeForceId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'int' })
  recruitmentStatusId: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @OneToMany(() => CourseEducationGrade, grade => grade.course)
  educationGrades: CourseEducationGrade[];

  @OneToMany(() => CourseField, field => field.course)
  courseFields: CourseField[];
}
