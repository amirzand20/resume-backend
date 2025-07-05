import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageInfo } from '@/entities/language-info.entity';
import { LanguageInfoRepository } from './language-info.repository';
import { LanguageInfoService } from './language-info.service';
import { LanguageInfoController } from './language-info.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageInfo]),
  ],
  controllers: [LanguageInfoController],
  providers: [
    LanguageInfoRepository,
    LanguageInfoService,
  ],
  exports: [LanguageInfoRepository, LanguageInfoService],
})
export class LanguageInfoModule {} 