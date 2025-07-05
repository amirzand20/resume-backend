import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '@/entities/property.entity';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyProfile } from './property.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
  ],
  controllers: [PropertyController],
  providers: [
    PropertyRepository,
    PropertyService,
    PropertyProfile,
  ],
  exports: [PropertyRepository, PropertyService],
})
export class PropertyModule {} 