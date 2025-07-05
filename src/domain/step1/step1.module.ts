import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step1Service } from './step1.service';
import { Step1Controller } from './step1.controller';
import { Step1Repository } from './step1.repository';
import { Person } from '@/entities/Person.entity';
import { Step1Profile } from './step1.profile';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), AutomapperModule],
  controllers: [Step1Controller],
  providers: [Step1Service, Step1Repository, Step1Profile],
  exports: [Step1Service],
})
export class Step1Module {} 