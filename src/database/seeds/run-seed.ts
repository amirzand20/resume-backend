import { DataSource } from 'typeorm';
import { seedBaseTables } from './base-tables.seed';
import { seedBaseItems } from './base-items.seed';
import { seedUsers } from './users.seed';

export async function runSeed(dataSource: DataSource): Promise<void> {
  try {
    console.log('Starting database seeding...');

    // Run seeders in order
    console.log('Seeding base tables...');
    await seedBaseTables(dataSource);

    console.log('Seeding base items...');
    await seedBaseItems(dataSource);

    console.log('Seeding users...');
    await seedUsers(dataSource);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
} 