import { BaseInfoItemModule } from '@/domain/common/base-info-item/base-info-item.module';
import { Module } from '@nestjs/common';
import { AdminBaseInfoItemController } from './admin-base-info-item.controller';

@Module({
  imports: [BaseInfoItemModule],
  controllers: [AdminBaseInfoItemController],
})
export class AdminBaseInfoItemModule {}
