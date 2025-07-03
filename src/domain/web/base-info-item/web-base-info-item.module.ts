import { Module } from '@nestjs/common';
import { WebBaseInfoItemController } from "@/domain/web/base-info-item/web-base-info-item.controller";
import { BaseInfoModule } from "@/domain/common/base-info/base-info.module";
import { BaseInfoItemModule } from '@/domain/common/base-info-item/base-info-item.module';

@Module({
    imports: [BaseInfoModule, BaseInfoItemModule],
    controllers: [WebBaseInfoItemController],
})
export class WebBaseInfoItemModule {
}
