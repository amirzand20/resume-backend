import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForcePriority } from '@/entities/force-priority.entity';
import { ForcePriorityRepository } from './force-priority.repository';
import { ForcePriorityService } from './force-priority.service';
import { ForcePriorityController } from './force-priority.controller';
import { ForcePriorityProfile } from './force-priority.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForcePriority]),
  ],
  controllers: [ForcePriorityController],
  providers: [
    ForcePriorityRepository,
    ForcePriorityService,
    ForcePriorityProfile,
  ],
  exports: [ForcePriorityRepository, ForcePriorityService],
})
export class ForcePriorityModule {} 