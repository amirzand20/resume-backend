import { Module } from '@nestjs/common';
import { WebOrganPropertyController } from './web-organ-property.controller';
import { OrganPropertyModule } from '@/domain/common/organ-property/organ-propety.module';

@Module({
  imports: [OrganPropertyModule],
  controllers: [WebOrganPropertyController],
})
export class WebOrganPropertyModule { }
