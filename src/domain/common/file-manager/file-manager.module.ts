import { Module } from '@nestjs/common';

import { HttpClientModule } from '@/http-client/http-client.module';
import { HttpClientService } from '@/http-client/http-client.service';
import { FileManagerService } from './file-manager.service';

@Module({
  imports: [HttpClientModule],
  providers: [FileManagerService, HttpClientService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
