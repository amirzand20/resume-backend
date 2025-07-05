import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '@/entities/skill.entity';
import { SkillRepository } from './skill.repository';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
  ],
  controllers: [SkillController],
  providers: [
    SkillRepository,
    SkillService,
  ],
  exports: [SkillRepository, SkillService],
})
export class SkillModule {} 