import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Audit } from './audit.entity';

@Entity('tb_employee_test')
export class EmployeeTest extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', name: 'employee_type_id' })
  employeeTypeId: number;

  @Column({ type: 'int', name: 'test_type_id' })
  testTypeId: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}