import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { CourseField } from './course-field.entity';

@Entity('tb_personnel_in_course')
export class PersonnelInCourse extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'course_field_id' })
  courseFieldId: number;

  @Column({ type: 'bigint', name: 'applicant_id' })
  applicantId: number;

  @Column({ type: 'varchar', name: 'volunteer_code' })
  volunteerCode: string;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => CourseField, courseField => courseField.personnel)
  @JoinColumn({ name: 'course_field_id' })
  courseField: CourseField;
}