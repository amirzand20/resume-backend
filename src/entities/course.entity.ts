import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Audit } from './audit.entity';
import { CourseEducationGrade } from './course-education-grade.entity';
import { CourseField } from './course-field.entity';

@Entity('tb_course')
export class Course extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', name: 'employee_type_id' })
  employeeTypeId: number;

  @Column({ type: 'int', name: 'employee_force_id' })
  employeeForceId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int', name: 'recruitment_status_id' })
  recruitmentStatusId: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @OneToMany(() => CourseEducationGrade, grade => grade.course)
  educationGrades: CourseEducationGrade[];

  @OneToMany(() => CourseField, field => field.course)
  courseFields: CourseField[];
}
