import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { BaseTable } from './base-table.entity';

@Entity('tb_base_item')
export class BaseItem extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid', name: 'table_id' })
  tableId: string;

  @Column({ type: 'bigint', nullable: true, name: 'parent_id' })
  parentId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int', name: 'created_method_id' })
  createdMethodId: number;

  @ManyToOne(() => BaseTable, baseTable => baseTable.items)
  @JoinColumn({ name: 'table_id' })
  table: BaseTable;

  @ManyToOne(() => BaseItem, baseItem => baseItem.children)
  @JoinColumn({ name: 'parent_id' })
  parent: BaseItem;

  @OneToMany(() => BaseItem, baseItem => baseItem.parent)
  children: BaseItem[];
}