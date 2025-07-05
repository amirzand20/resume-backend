import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForcePriority } from '@/entities/force-priority.entity';
import { ForcePriorityRepository } from './force-priority.repository';
import { ForcePriorityService } from './force-priority.service';
import { ForcePriorityController } from './force-priority.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForcePriority]),
  ],
  controllers: [ForcePriorityController],
  providers: [
    ForcePriorityRepository,
    ForcePriorityService,
  ],
  exports: [ForcePriorityRepository, ForcePriorityService],
})
export class ForcePriorityModule {} 