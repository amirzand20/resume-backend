import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from '@/entities/education.entity';
import { EducationRepository } from './education.repository';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education]),
  ],
  controllers: [EducationController],
  providers: [
    EducationRepository,
    EducationService,
  ],
  exports: [EducationRepository, EducationService],
})
export class EducationModule {} 