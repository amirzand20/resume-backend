import { Person } from '../../../entity/Person.entity';

export interface IAdminService {
  getAllUsers(): Promise<Person[]>;
  getUserById(id: number): Promise<Person>;
  getRecentResumes(limit: number): Promise<Person[]>;
  getResumeStatistics(): Promise<any>;
  deleteUser(id: number): Promise<void>;
  getDashboardData(): Promise<any>;
} 