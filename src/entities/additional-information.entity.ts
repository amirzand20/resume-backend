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

  @Column({ type: 'int' })
  motherJobId: number;

  @Column({ type: 'int' })
  motherJobOrganId: number;

  @Column({ type: 'int' })
  wifeJobId: number;

  @Column({ type: 'int' })
  wifeJobOrganId: number;

  @Column({ type: 'int' })
  childCount: number;

  @Column({ type: 'int' })
  incomeLevelId: number;

  @Column({ type: 'int' })
  brotherCount: number;

  @Column({ type: 'int' })
  sisterCount: number;

  @Column({ type: 'int' })
  fatherEducationGradeId: number;

  @Column({ type: 'int' })
  motherEducationGradeId: number;

  @Column({ type: 'int' })
  childNumber: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.additionalInformations)
  @JoinColumn({ name: 'personId' })
  person: Person;
}