import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Properties } from '@/entities/properties.entity';
import { PropertiesRepository } from './properties.repository';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Properties]),
  ],
  controllers: [PropertiesController],
  providers: [
    PropertiesRepository,
    PropertiesService,
  ],
  exports: [PropertiesRepository, PropertiesService],
})
export class PropertiesModule {} 