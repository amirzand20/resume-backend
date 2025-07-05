import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Applicant } from '@/entities/applicant.entity';
import { ReadApplicantDto } from './dto/read-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class Step7ApplicantProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Applicant,
        ReadApplicantDto,
        forMember(dest => dest.id, mapFrom(src => src.id)),
        forMember(dest => dest.personId, mapFrom(src => src.personId)),
        forMember(dest => dest.applicantStatusId, mapFrom(src => src.applicantStatusId)),
        forMember(dest => dest.createdMethodId, mapFrom(src => src.createdMethodId)),
        forMember(dest => dest.tableId, mapFrom(src => src.tableId)),
        forMember(dest => dest.createdBy, mapFrom(src => src.createdBy)),
        forMember(dest => dest.createdDate, mapFrom(src => src.createdDate)),
        forMember(dest => dest.updatedBy, mapFrom(src => src.updatedBy)),
        forMember(dest => dest.updatedDate, mapFrom(src => src.updatedDate)),
      );
      createMap(mapper, ReadApplicantDto, Applicant);
      createMap(mapper, CreateApplicantDto, Applicant);
      createMap(mapper, UpdateApplicantDto, Applicant);
    };
  }
} 