import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { BaseInfo } from '@/entities/base-info.entity';
import { BaseInfoModule } from '@/domain/common/base-info/base-info.module';
import { WebBaseInfoItemController } from '@/domain/web/base-info-item/web-base-info-item.controller';
import { BaseInfoItemService } from '@/domain/common/base-info-item/base-info-item.service';
import { BaseInfoItemProfile } from '@/domain/common/base-info-item/base-info-item.profile';
import { BaseInfoItemRepository } from '@/domain/common/base-info-item/base-info-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BaseInfoItem, BaseInfo]), BaseInfoModule],
  providers: [BaseInfoItemService, BaseInfoItemProfile, BaseInfoItemRepository],
  exports: [BaseInfoItemService, BaseInfoItemRepository],
})
export class BaseInfoItemModule {}
