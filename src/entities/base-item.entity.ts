import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseTable } from './base-table.entity';

@Entity('tb_base_item')
export class BaseItem {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  tableId: number;

  @Column({ type: 'varchar', length: 255 })
  itemName: string;

  @Column({ type: 'int', nullable: true })
  parentId: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  itemCode: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => BaseTable, baseTable => baseTable.items)
  @JoinColumn({ name: 'table_id' })
  table: BaseTable;

  @ManyToOne(() => BaseItem, baseItem => baseItem.children)
  @JoinColumn({ name: 'parent_id' })
  parent: BaseItem;

  @OneToMany(() => BaseItem, baseItem => baseItem.parent)
  children: BaseItem[];
}