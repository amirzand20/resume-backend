import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from '@/entities/experience.entity';
import { ExperienceRepository } from './experience.repository';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { ExperienceProfile } from './experience.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
  ],
  controllers: [ExperienceController],
  providers: [
    ExperienceRepository,
    ExperienceService,
    ExperienceProfile,
  ],
  exports: [ExperienceRepository, ExperienceService],
})
export class ExperienceModule {} 