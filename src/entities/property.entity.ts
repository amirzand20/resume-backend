import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_property')
export class Property extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  propertyTypeId: number;

  @Column({ type: 'varchar' })
  propertyTitle: string;

  @Column({ type: 'varchar' })
  propertyAddress: string;

  @Column({ type: 'int' })
  propertyValue: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.propertyRecords)
  @JoinColumn({ name: 'personId' })
  person: Person;
}