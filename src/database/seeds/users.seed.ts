import { DataSource } from 'typeorm';
import { User } from '../../entity/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    },
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'user123',
      role: 'user',
      isActive: true,
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'user123',
      role: 'user',
      isActive: true,
    },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOne({
      where: [
        { username: userData.username },
        { email: userData.email },
      ],
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await userRepository.save({
        ...userData,
        password: hashedPassword,
      });
    }
  }
} 