import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_document')
export class Document extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'document_type_id' })
  documentTypeId: number;

  @Column({ type: 'varchar', name: 'document_number' })
  documentNumber: string;

  @Column({ type: 'date', name: 'issue_date' })
  issueDate: Date;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Person, person => person.documents)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}