import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_property')
export class Property extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'property_type_id' })
  propertyTypeId: number;

  @Column({ type: 'varchar', name: 'property_title' })
  propertyTitle: string;

  @Column({ type: 'varchar', name: 'property_address' })
  propertyAddress: string;

  @Column({ type: 'int', name: 'property_value' })
  propertyValue: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.propertyRecords)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}