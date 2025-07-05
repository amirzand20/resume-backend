import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from '@/entities/experience.entity';
import { ExperienceRepository } from './experience.repository';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
  ],
  controllers: [ExperienceController],
  providers: [
    ExperienceRepository,
    ExperienceService,
  ],
  exports: [ExperienceRepository, ExperienceService],
})
export class ExperienceModule {} 