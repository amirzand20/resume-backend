import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @Column()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Column({ default: 'user' })
  @ApiProperty({ description: 'The role of the user', enum: ['admin', 'user'] })
  role: string;

  @Column({ default: true })
  @ApiProperty({ description: 'Whether the user is active' })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'When the user was created' })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
} 