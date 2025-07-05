import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_certificate')
export class Certificate extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'certificate_type_id' })
  certificateTypeId: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  comment: string;

  @Column({ type: 'date', nullable: true, name: 'grant_date' })
  grantDate: Date;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'varchar', length: 300, nullable: true, name: 'certificate_issuer' })
  certificateIssuer: string;

  @ManyToOne(() => Person, person => person.certificates)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}