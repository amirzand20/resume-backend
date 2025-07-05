import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '@/entities/skill.entity';
import { SkillRepository } from './skill.repository';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillProfile } from './skill.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
  ],
  controllers: [SkillController],
  providers: [
    SkillRepository,
    SkillService,
    SkillProfile,
  ],
  exports: [SkillRepository, SkillService],
})
export class SkillModule {} 