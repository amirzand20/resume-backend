import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step5SkillController } from './step5-skill.controller';
import { Step5SkillService } from './step5-skill.service';
import { Step5SkillRepository } from './step5-skill.repository';
import { Skill } from '../../entities/skill.entity';
import { Person } from '../../entities/Person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill, Person]),
  ],
  controllers: [Step5SkillController],
  providers: [Step5SkillService, Step5SkillRepository],
  exports: [Step5SkillService, Step5SkillRepository],
})
export class Step5Module {} 