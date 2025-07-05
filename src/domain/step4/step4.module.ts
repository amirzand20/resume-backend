import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from '../../entities/experience.entity';
import { Step4ExperienceRepository } from './step4-experience.repository';
import { Step4ExperienceService } from './step4-experience.service';
import { Step4ExperienceController } from './step4-experience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [Step4ExperienceController],
  providers: [Step4ExperienceRepository, Step4ExperienceService],
  exports: [Step4ExperienceRepository, Step4ExperienceService]
})
export class Step4Module {} 