import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_education')
export class Education extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  gradeId: number;

  @Column({ type: 'int' })
  levelId: number;

  @Column({ type: 'int', nullable: true })
  fieldId: number;

  @Column({ type: 'int', nullable: true })
  instituteId: number;

  @Column({ type: 'date', nullable: true })
  graduationDate: Date;

  @Column({ type: 'float', nullable: true })
  adjusted: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.educations)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}