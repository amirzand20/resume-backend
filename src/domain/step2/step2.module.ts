import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step2Controller } from './step2.controller';
import { Step2Service } from './step2.service';
import { Step2Repository } from './step2.repository';
import { ContactInfo } from '../../entities/contact-info.entity';
import { Person } from '../../entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactInfo, Person])
  ],
  controllers: [Step2Controller],
  providers: [Step2Service, Step2Repository],
  exports: [Step2Service, Step2Repository]
})
export class Step2Module {} 