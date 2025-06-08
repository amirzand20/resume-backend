import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_certificate')
export class Certificate extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  certificateTypeId: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  comment: string;

  @Column({ type: 'date', nullable: true })
  grantDate: Date;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  certificateIssuer: string;

  @ManyToOne(() => Person, person => person.certificates)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}