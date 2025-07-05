import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_education')
export class Education extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  educationGradeId: number;

  @Column({ type: 'int' })
  educationFieldId: number;

  @Column({ type: 'int' })
  educationInstitutionId: number;

  @Column({ type: 'int' })
  educationCountryId: number;

  @Column({ type: 'int' })
  educationProvinceId: number;

  @Column({ type: 'int' })
  educationCityId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.educations)
  @JoinColumn({ name: 'personId' })
  person: Person;
}