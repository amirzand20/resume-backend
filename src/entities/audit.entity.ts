import { Column, DeleteDateColumn } from 'typeorm';

export abstract class Audit {
  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string; // Inserting user

  @Column({ type: 'timestamp', name: 'created_date' })
  createdDate: Date; // Record creation time

  @Column({ type: 'uuid', nullable: true, name: 'updated_by' })
  updatedBy: string; // Updating user

  @Column({ type: 'timestamp', nullable: true, name: 'updated_date' })
  updatedDate: Date; // Update time

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date; // Soft delete timestamp
}