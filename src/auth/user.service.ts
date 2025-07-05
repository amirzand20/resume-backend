import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    // Check if username already exists
    const existingUsername = await this.userRepository.findByUsername(registerDto.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash password before creating user
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user
    const user = await this.userRepository.createUser({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      role: 'user',
      isActive: true,
    });

    return user;
  }

  async validateUser(usernameOrEmail: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isActive) {
      throw new NotFoundException('User account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
} 