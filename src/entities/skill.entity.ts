import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_skill')
export class Skill extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'skill_type_id' })
  skillTypeId: number;

  @Column({ type: 'int', name: 'skill_level' })
  skillLevel: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Person, person => person.skills)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}