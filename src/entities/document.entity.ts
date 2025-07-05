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

  @Column({ type: 'varchar', length: 300 })
  documentName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  documentTitle: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  documentId: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Person, person => person.documents)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}