import { Injectable, NotFoundException } from '@nestjs/common';
import { IAdminService } from '../domain/admin.interface';
import { IAdminRepository } from '../domain/admin.repository.interface';
import { Person } from '../../../entity/Person.entity';

@Injectable()
export class AdminService implements IAdminService {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async getAllUsers(): Promise<Person[]> {
    return this.adminRepository.findAllUsers();
  }

  async getUserById(id: number): Promise<Person> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getRecentResumes(limit: number): Promise<Person[]> {
    return this.adminRepository.findRecentResumes(limit);
  }

  async getResumeStatistics(): Promise<any> {
    return this.adminRepository.getStatistics();
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.adminRepository.deleteUser(id);
  }

  async getDashboardData(): Promise<any> {
    const recentResumes = await this.getRecentResumes(5);
    const statistics = await this.getResumeStatistics();
    const totalUsers = await this.adminRepository.countUsers();
    
    return {
      recentResumes,
      statistics,
      totalUsers,
      lastUpdated: new Date(),
    };
  }
} 