import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  @ApiProperty({ description: 'The role of the user', enum: ['admin', 'user'] })
  role: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @ApiProperty({ description: 'Whether the user is active' })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  @ApiProperty({ description: 'When the user was created' })
  createdAt: Date;
} 