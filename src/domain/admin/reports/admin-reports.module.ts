import { ReportsModule } from '@/domain/common/reports/reports.module';
import { Module } from '@nestjs/common';
import { AdminReportsController } from './admin-reports.controller';
import { FileManagerModule } from '@/domain/common/file-manager/file-manager.module';

@Module({
  imports: [ReportsModule, FileManagerModule],
  controllers: [AdminReportsController],
})
export class AdminReportsModule {}
