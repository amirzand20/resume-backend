import { Module } from '@nestjs/common';

import { FileManagerModule } from '@/domain/common/file-manager/file-manager.module';
import { AdminFileManagerController } from './admin-file-manager.controller';

@Module({
  imports: [FileManagerModule],
  controllers: [AdminFileManagerController],
})
export class AdminFileManagerModule {}
