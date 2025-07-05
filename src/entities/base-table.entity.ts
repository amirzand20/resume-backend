import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseItem } from './base-item.entity';
import { Audit } from './audit.entity';

@Entity('tb_base_table')
export class BaseTable extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true, name: 'parent_id' })
  parentId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @ManyToOne(() => BaseTable, baseTable => baseTable.children)
  @JoinColumn({ name: 'parent_id' })
  parent: BaseTable;

  @OneToMany(() => BaseTable, baseTable => baseTable.parent)
  children: BaseTable[];

  @OneToMany(() => BaseItem, baseItem => baseItem.table)
  items: BaseItem[];
}