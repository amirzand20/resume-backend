import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PersonEntity, person => person.user)
  persons: PersonEntity[];
} 