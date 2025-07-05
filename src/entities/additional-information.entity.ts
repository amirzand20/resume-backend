import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_additional_information')
export class AdditionalInformation extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'father_job_id' })
  fatherJobId: number;

  @Column({ type: 'int', name: 'father_job_organ_id' })
  fatherJobOrganId: number;

  @Column({ type: 'int', name: 'mother_job_id' })
  motherJobId: number;

  @Column({ type: 'int', name: 'mother_job_organ_id' })
  motherJobOrganId: number;

  @Column({ type: 'int', name: 'wife_job_id' })
  wifeJobId: number;

  @Column({ type: 'int', name: 'wife_job_organ_id' })
  wifeJobOrganId: number;

  @Column({ type: 'int', name: 'child_count' })
  childCount: number;

  @Column({ type: 'int', name: 'income_level_id' })
  incomeLevelId: number;

  @Column({ type: 'int', name: 'brother_count' })
  brotherCount: number;

  @Column({ type: 'int', name: 'sister_count' })
  sisterCount: number;

  @Column({ type: 'int', name: 'father_education_grade_id' })
  fatherEducationGradeId: number;

  @Column({ type: 'int', name: 'mother_education_grade_id' })
  motherEducationGradeId: number;

  @Column({ type: 'int', name: 'child_number' })
  childNumber: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.additionalInformations)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}