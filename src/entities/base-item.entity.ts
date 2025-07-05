import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { BaseTable } from './base-table.entity';

@Entity('tb_base_item')
export class BaseItem extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @Column({ type: 'bigint', nullable: true })
  parentId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @ManyToOne(() => BaseTable, baseTable => baseTable.items)
  @JoinColumn({ name: 'tableId' })
  table: BaseTable;

  @ManyToOne(() => BaseItem, baseItem => baseItem.children)
  @JoinColumn({ name: 'parentId' })
  parent: BaseItem;

  @OneToMany(() => BaseItem, baseItem => baseItem.parent)
  children: BaseItem[];
}