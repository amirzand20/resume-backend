import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';
import { EmployeeApplicant } from './employee-applicant.entity';
import { ForcePriority } from './force-priority.entity';

@Entity('tb_applicant')
export class Applicant extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  applicantStatusId: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Person, person => person.applicants)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => EmployeeApplicant, employeeApplicant => employeeApplicant.applicant)
  employeeApplicants: EmployeeApplicant[];

  @OneToMany(() => ForcePriority, forcePriority => forcePriority.applicant)
  forcePriorities: ForcePriority[];
}