import { Module } from '@nestjs/common';
import { AdminOrganPropertyController } from './admin-organ-property.controller';
import { OrganPropertyModule } from '@/domain/common/organ-property/organ-propety.module';

@Module({
  imports: [OrganPropertyModule],
  controllers: [AdminOrganPropertyController],
})
export class AdminOrganPropertyModule { }
