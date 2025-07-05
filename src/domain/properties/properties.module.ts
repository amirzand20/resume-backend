import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Properties } from '@/entities/properties.entity';
import { PropertiesRepository } from './properties.repository';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PropertiesProfile } from './properties.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Properties]),
  ],
  controllers: [PropertiesController],
  providers: [
    PropertiesRepository,
    PropertiesService,
    PropertiesProfile,
  ],
  exports: [PropertiesRepository, PropertiesService],
})
export class PropertiesModule {} 