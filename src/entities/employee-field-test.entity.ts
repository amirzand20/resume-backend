import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Audit } from './audit.entity';

@Entity('tb_employee_field_test')
export class EmployeeFieldTest extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  employeeTypeId: number;

  @Column({ type: 'int', nullable: true })
  employeeFieldId: number;

  @Column({ type: 'int' })
  testTypeId: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}