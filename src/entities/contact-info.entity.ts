import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_contact_info')
export class ContactInfo extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'location_place_id' })
  locationPlaceId: number;

  @Column({ type: 'varchar', name: 'email_address' })
  emailAddress: string;

  @Column({ type: 'varchar', name: 'familiar_mobile_number' })
  familiarMobileNumber: string;

  @Column({ type: 'varchar', name: 'location_address' })
  locationAddress: string;

  @Column({ type: 'varchar', name: 'mobile_number' })
  mobileNumber: string;

  @Column({ type: 'varchar', name: 'telephone_number' })
  telephoneNumber: string;

  @Column({ type: 'varchar', name: 'post_code' })
  postCode: string;

  @Column({ type: 'varchar', name: 'father_mobile_number' })
  fatherMobileNumber: string;

  @Column({ type: 'varchar', name: 'mother_mobile_number' })
  motherMobileNumber: string;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.contactInfos)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}