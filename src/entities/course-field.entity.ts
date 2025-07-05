import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Course } from './course.entity';
import { PersonnelInCourse } from './personnel-in-course.entity';

@Entity('tb_course_field')
export class CourseField extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  courseId: number;

  @Column({ type: 'int' })
  courseFieldId: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Course, course => course.courseFields)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => PersonnelInCourse, personnel => personnel.courseField)
  personnel: PersonnelInCourse[];
}