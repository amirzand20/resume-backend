import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedCommand } from './commands/seed.command';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });

  try {
    const seedCommand = app.get(SeedCommand);
    await seedCommand.seed();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap(); 