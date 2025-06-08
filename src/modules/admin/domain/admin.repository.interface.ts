import { Person } from '../../../entity/Person.entity';

export interface IAdminRepository {
  findAllUsers(): Promise<Person[]>;
  findUserById(id: number): Promise<Person | null>;
  findRecentResumes(limit: number): Promise<Person[]>;
  getStatistics(): Promise<any>;
  deleteUser(id: number): Promise<void>;
  countUsers(): Promise<number>;
} 