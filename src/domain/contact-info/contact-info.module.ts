import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from '@/entities/contact-info.entity';
import { ContactInfoRepository } from './contact-info.repository';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoProfile } from './contact-info.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactInfo]),
  ],
  controllers: [ContactInfoController],
  providers: [
    ContactInfoRepository,
    ContactInfoService,
    ContactInfoProfile,
  ],
  exports: [ContactInfoRepository, ContactInfoService],
})
export class ContactInfoModule {} 