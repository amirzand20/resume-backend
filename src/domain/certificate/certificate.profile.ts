import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { Certificate } from '@/entities/certificate.entity';
import { ReadCertificateDto } from './dto/read-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Certificate, ReadCertificateDto);
      createMap(mapper, ReadCertificateDto, Certificate);
      createMap(mapper, CreateCertificateDto, Certificate);
      createMap(mapper, UpdateCertificateDto, Certificate);
    };
  }
} 