import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseItem } from './base-item.entity';

@Entity('tb_base_table')
export class BaseTable {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  tableName: string;

  @Column({ type: 'int', nullable: true })
  parentId: number;

  @ManyToOne(() => BaseTable, baseTable => baseTable.children)
  @JoinColumn({ name: 'parent_id' })
  parent: BaseTable;

  @OneToMany(() => BaseTable, baseTable => baseTable.parent)
  children: BaseTable[];

  @OneToMany(() => BaseItem, baseItem => baseItem.table)
  items: BaseItem[];
}