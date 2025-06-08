import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { ICrudRepository } from '../interfaces/crud-repository.interface';

export abstract class BaseRepository<T extends ObjectLiteral> implements ICrudRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as any,
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    const updatedEntity = await this.findById(id);
    if (!updatedEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return updatedEntity;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 