import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step6LanguageInfoController } from './step6-language-info.controller';
import { Step6LanguageInfoService } from './step6-language-info.service';
import { Step6LanguageInfoRepository } from './step6-language-info.repository';
import { LanguageInfo } from '../../entities/language-info.entity';
import { Person } from '../../entities/Person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageInfo, Person]),
  ],
  controllers: [Step6LanguageInfoController],
  providers: [Step6LanguageInfoService, Step6LanguageInfoRepository],
  exports: [Step6LanguageInfoService, Step6LanguageInfoRepository],
})
export class Step6Module {} 