import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseItem } from './base-item.entity';
import { Audit } from './audit.entity';

@Entity('tb_base_table')
export class BaseTable extends Audit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  parentId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  createdMethodId: number;

  @Column({ type: 'uuid' })
  tableId: string;

  @ManyToOne(() => BaseTable, baseTable => baseTable.children)
  @JoinColumn({ name: 'parentId' })
  parent: BaseTable;

  @OneToMany(() => BaseTable, baseTable => baseTable.parent)
  children: BaseTable[];

  @OneToMany(() => BaseItem, baseItem => baseItem.table)
  items: BaseItem[];
}