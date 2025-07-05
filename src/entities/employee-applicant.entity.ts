import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Applicant } from './applicant.entity';

@Entity('tb_employee_applicant')
export class EmployeeApplicant extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'applicant_id' })
  applicantId: number;

  @Column({ type: 'int', name: 'employee_type_id' })
  employeeTypeId: number;

  @Column({ type: 'int', name: 'priority_number' })
  priorityNumber: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Applicant, applicant => applicant.employeeApplicants)
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;
}