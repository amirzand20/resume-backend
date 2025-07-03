import { LoggerService } from '@/common/services/logger.service';
import { HttpClientService } from '@/http-client/http-client.service';
import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsProfile } from './reports.profile';
import { ReportsRepository } from './reports.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportDocument } from '@/entities/report-document.entity';
import { FileManagerService } from '@/domain/common/file-manager/file-manager.service';
import { FileManagerModule } from '../file-manager/file-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReportDocument]), FileManagerModule],
  providers: [
    ReportsService,
    ReportsProfile,
    ReportsRepository,
    FileManagerService,
    HttpClientService,
    LoggerService,
  ],

  exports: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
