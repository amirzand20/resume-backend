import { Column, DeleteDateColumn } from 'typeorm';

export abstract class Audit {
  @Column({ type: 'uuid' })
  createdBy: string; // Inserting user

  @Column({ type: 'timestamp' })
  createdDate: Date; // Record creation time

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string; // Updating user

  @Column({ type: 'timestamp', nullable: true })
  updatedDate: Date; // Update time

  @DeleteDateColumn()
  deletedAt?: Date; // Soft delete timestamp
}