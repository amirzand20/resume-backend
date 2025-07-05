
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_language_info')
export class LanguageInfo extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  personId: number;

  @Column({ type: 'int' })
  languageId: number;

  @Column({ type: 'int', nullable: true })
  readingLevelId: number;

  @Column({ type: 'int', nullable: true })
  writingLevelId: number;

  @Column({ type: 'int', nullable: true })
  conversationLevelId: number;

  @Column({ type: 'int', nullable: true })
  comment: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @ManyToOne(() => Person, person => person.languageInfos)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}