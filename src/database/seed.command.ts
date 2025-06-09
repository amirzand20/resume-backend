import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { runSeed } from './seeds/run-seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get('DataSource');
  
  try {
    await runSeed(dataSource);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 