import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Applicant } from './applicant.entity';

@Entity('tb_employee_applicant')
export class EmployeeApplicant extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  applicantId: number;

  @Column({ type: 'int' })
  employeeTypeId: number;

  @Column({ type: 'smallint' })
  priorityNumber: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Applicant, applicant => applicant.employeeApplicants)
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;
}