import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step1Service } from './step1.service';
import { Step1Controller } from './step1.controller';
import { Step1Repository } from './step1.repository';
import { Person } from '@/entities/Person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [Step1Controller],
  providers: [Step1Service, Step1Repository],
  exports: [Step1Service, Step1Repository],
})
export class Step1Module {} 