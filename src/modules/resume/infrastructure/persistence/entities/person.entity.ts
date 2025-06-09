import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nationalNo: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, user => user.persons)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
} 