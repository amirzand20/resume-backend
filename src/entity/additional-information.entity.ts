import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_additional_information')
export class AdditionalInformation extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  fatherJobId: number;

  @Column({ type: 'int' })
  fatherJobOrganId: number;

  @Column({ type: 'int', nullable: true })
  motherJobId: number;

  @Column({ type: 'int', nullable: true })
  motherJobOrganId: number;

  @Column({ type: 'int', nullable: true })
  wifeJobId: number;

  @Column({ type: 'int', nullable: true })
  wifeJobOrganId: number;

  @Column({ type: 'smallint', nullable: true })
  childCount: number;

  @Column({ type: 'int', nullable: true })
  incomeLevelId: number;

  @Column({ type: 'smallint', nullable: true })
  brotherCount: number;

  @Column({ type: 'smallint', nullable: true })
  sisterCount: number;

  @Column({ type: 'int', nullable: true })
  fatherEducationGradeId: number;

  @Column({ type: 'int', nullable: true })
  motherEducationGradeId: number;

  @Column({ type: 'smallint', nullable: true })
  childNumber: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.additionalInformations)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}