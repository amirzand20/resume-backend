import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Course } from './course.entity';
import { PersonnelInCourse } from './personnel-in-course.entity';

@Entity('tb_course_field')
export class CourseField extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'course_id' })
  courseId: number;

  @Column({ type: 'int', name: 'course_field_id' })
  courseFieldId: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Course, course => course.courseFields)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => PersonnelInCourse, personnel => personnel.courseField)
  personnel: PersonnelInCourse[];
}