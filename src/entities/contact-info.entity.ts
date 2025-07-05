import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_contact_info')
export class ContactInfo extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  locationPlaceId: number;

  @Column({ type: 'varchar', length: 300 })
  locationAddress: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  telephoneNumber: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postCode: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  fatherMobileNumber: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  motherMobileNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emailAddress: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  familiarMobileNumber: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.contactInfos)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}