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

  @Column({ type: 'int' })
  readingLevel: number;

  @Column({ type: 'int' })
  writingLevel: number;

  @Column({ type: 'int' })
  speakingLevel: number;

  @Column({ type: 'int' })
  listeningLevel: number;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => Person, person => person.languageInfos)
  @JoinColumn({ name: 'personId' })
  person: Person;
}