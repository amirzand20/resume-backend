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

  @Column({ type: 'varchar' })
  emailAddress: string;

  @Column({ type: 'varchar' })
  familiarMobileNumber: string;

  @Column({ type: 'varchar' })
  locationAddress: string;

  @Column({ type: 'varchar' })
  mobileNumber: string;

  @Column({ type: 'varchar' })
  telephoneNumber: string;

  @Column({ type: 'varchar' })
  postCode: string;

  @Column({ type: 'varchar' })
  fatherMobileNumber: string;

  @Column({ type: 'varchar' })
  motherMobileNumber: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.contactInfos)
  @JoinColumn({ name: 'personId' })
  person: Person;
}