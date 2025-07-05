import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_document')
export class Document extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  documentTypeId: number;

  @Column({ type: 'varchar' })
  documentNumber: string;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Person, person => person.documents)
  @JoinColumn({ name: 'personId' })
  person: Person;
}