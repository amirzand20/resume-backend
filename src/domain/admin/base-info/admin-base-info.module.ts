import { Module } from '@nestjs/common';
import { BaseInfoModule } from "@/domain/common/base-info/base-info.module";
import { AdminBaseInfoController } from './admin-base-info.controller';


@Module({
    imports: [BaseInfoModule],
    controllers: [AdminBaseInfoController],
})
export class AdminBaseInfoModule {
}
