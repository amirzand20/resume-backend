import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';
import { EmployeeApplicant } from './employee-applicant.entity';
import { ForcePriority } from './force-priority.entity';

@Entity('tb_applicant')
export class Applicant extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'applicant_status_id' })
  applicantStatusId: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Person, person => person.applicants)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => EmployeeApplicant, employeeApplicant => employeeApplicant.applicant)
  employeeApplicants: EmployeeApplicant[];

  @OneToMany(() => ForcePriority, forcePriority => forcePriority.applicant)
  forcePriorities: ForcePriority[];
}