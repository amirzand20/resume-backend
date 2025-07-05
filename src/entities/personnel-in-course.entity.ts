import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { CourseField } from './course-field.entity';

@Entity('tb_personnel_in_course')
export class PersonnelInCourse extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  courseFieldId: number;

  @Column({ type: 'bigint' })
  applicantId: number;

  @Column({ type: 'int' })
  volunteerCode: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => CourseField, courseField => courseField.personnel)
  @JoinColumn({ name: 'course_field_id' })
  courseField: CourseField;
}