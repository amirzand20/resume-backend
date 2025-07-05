
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Applicant } from './applicant.entity';

@Entity('tb_force_priority')
export class ForcePriority extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  applicantId: number;

  @Column({ type: 'int' })
  forceId: number;

  @Column({ type: 'smallint' })
  priorityNumber: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Applicant, applicant => applicant.forcePriorities)
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;
}