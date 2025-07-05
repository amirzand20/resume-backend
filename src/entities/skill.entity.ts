import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_skill')
export class Skill extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  skillId: number;

  @Column({ type: 'int' })
  levelId: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Person, person => person.skills)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}