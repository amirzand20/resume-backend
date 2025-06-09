import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AllSeeder } from '../seeds/all.seed';

@Injectable()
export class SeedCommand {
  constructor(private dataSource: DataSource) {}

  async seed() {
    try {
      console.log('Starting seeding...');
      const seeder = new AllSeeder(this.dataSource);
      await seeder.seed();
      console.log('Seeding completed successfully!');
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }
} 