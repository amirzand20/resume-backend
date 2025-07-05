import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Person } from './Person.entity';

@Entity('tb_language_info')
export class LanguageInfo extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'person_id' })
  personId: number;

  @Column({ type: 'int', name: 'language_id' })
  languageId: number;

  @Column({ type: 'int', name: 'reading_level' })
  readingLevel: number;

  @Column({ type: 'int', name: 'writing_level' })
  writingLevel: number;

  @Column({ type: 'int', name: 'speaking_level' })
  speakingLevel: number;

  @Column({ type: 'int', name: 'listening_level' })
  listeningLevel: number;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => Person, person => person.languageInfos)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}