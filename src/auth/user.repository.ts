import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return await this.repository.findOne({
      where:  {username: usernameOrEmail}
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }
} 