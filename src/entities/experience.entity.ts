import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_experience')
export class Experience extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'job_type_id' })
  jobTypeId: number;

  @Column({ type: 'int', name: 'job_organ_id' })
  jobOrganId: number;

  @Column({ type: 'varchar', name: 'job_title' })
  jobTitle: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Person, person => person.experiences)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}
