import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_experience')
export class Experience extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'varchar', length: 200 })
  jobTitle: string;

  @Column({ type: 'varchar', length: 200 })
  companyName: string;

  @Column({ type: 'int' })
  companyLocationId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'int' })
  createdMethodId: number;
  
  @ManyToOne(() => Person, person => person.experiences)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}
