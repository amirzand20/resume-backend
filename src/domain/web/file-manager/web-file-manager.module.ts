import { Module } from '@nestjs/common';

import { FileManagerModule } from '@/domain/common/file-manager/file-manager.module';
import { WebFileManagerController } from './web-file-manager.controller';

@Module({
  imports: [FileManagerModule],
  controllers: [WebFileManagerController],
})
export class WebFileManagerModule {}
