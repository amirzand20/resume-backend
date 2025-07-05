import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageInfo } from '@/entities/language-info.entity';
import { LanguageInfoRepository } from './language-info.repository';
import { LanguageInfoService } from './language-info.service';
import { LanguageInfoController } from './language-info.controller';
import { LanguageInfoProfile } from './language-info.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageInfo]),
  ],
  controllers: [LanguageInfoController],
  providers: [
    LanguageInfoRepository,
    LanguageInfoService,
    LanguageInfoProfile,
  ],
  exports: [LanguageInfoRepository, LanguageInfoService],
})
export class LanguageInfoModule {} 