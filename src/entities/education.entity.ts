import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_education')
export class Education extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'education_grade_id' })
  educationGradeId: number;

  @Column({ type: 'int', name: 'education_field_id' })
  educationFieldId: number;

  @Column({ type: 'int', name: 'education_institution_id' })
  educationInstitutionId: number;

  @Column({ type: 'int', name: 'education_country_id' })
  educationCountryId: number;

  @Column({ type: 'int', name: 'education_province_id' })
  educationProvinceId: number;

  @Column({ type: 'int', name: 'education_city_id' })
  educationCityId: number;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Person, person => person.educations)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}