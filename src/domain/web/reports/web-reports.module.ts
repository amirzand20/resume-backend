import { ReportsModule } from '@/domain/common/reports/reports.module';
import { Module } from '@nestjs/common';
import { WebReportsController } from './web-reports.controller';
import { FileManagerModule } from '@/domain/common/file-manager/file-manager.module';

@Module({
  imports: [ReportsModule, FileManagerModule],
  controllers: [WebReportsController],
})
export class WebReportsModule {}
