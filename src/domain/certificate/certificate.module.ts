import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from '@/entities/certificate.entity';
import { CertificateRepository } from './certificate.repository';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { CertificateProfile } from './certificate.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]),
  ],
  controllers: [CertificateController],
  providers: [
    CertificateRepository,
    CertificateService,
    CertificateProfile,
  ],
  exports: [CertificateRepository, CertificateService],
})
export class CertificateModule {} 