import { Module } from '@nestjs/common';
import { WebBaseInfoController } from './web-base-info.controller';
import {BaseInfoModule} from "@/domain/common/base-info/base-info.module";


@Module({
  imports: [BaseInfoModule],
  controllers: [WebBaseInfoController],
  providers: [],
  exports: [],
})
export class WebBaseInfoModule {}
