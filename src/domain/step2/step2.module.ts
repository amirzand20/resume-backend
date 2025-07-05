import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step2Controller } from './step2.controller';
import { Step2Service } from './step2.service';
import { Step2Repository } from './step2.repository';
import { ContactInfo } from '../../entities/contact-info.entity';
import { Person } from '../../entities/Person.entity';
import { Step2Profile } from './step2.profile';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactInfo, Person]),
    AutomapperModule
  ],
  controllers: [Step2Controller],
  providers: [Step2Service, Step2Repository, Step2Profile],
  exports: [Step2Service, Step2Repository]
})
export class Step2Module {} 