import { DeepPartial } from 'typeorm';

export interface ICrudService<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: DeepPartial<T>): Promise<T>;
  remove(id: number): Promise<void>;
} 