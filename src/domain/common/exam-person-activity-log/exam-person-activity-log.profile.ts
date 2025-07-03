import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadExamPersonActivityLogDto } from './dto/read-exam-person-activity-log.dto';
import { CreateExamPersonActivityLogDto } from './dto/create-exam-person-activity-log.dto';
import { VolunteerInfo } from '@/entities/volunteer-info.entity';
import { Personal } from '@/entities/personal.entity';
import { Exam } from '@/entities/exam.entity';
import { ReadExamDto } from '../exam/dto/read-exam.dto';
import { ReadPersonalDto } from '../personal/dto/read-personal.dto';
import { ReadVolunteerInfoDto } from '../volunteer-info/dto/read-volunteer-info.dto';
import { ExamPersonActivityLog } from '@/entities/exam-person-activity-log.entity';

@Injectable()
export class ExamPersonActivityLogProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateExamPersonActivityLogDto, ExamPersonActivityLog);

      createMap(
        mapper,
        ExamPersonActivityLog,
        ReadExamPersonActivityLogDto,
        forMember(
          (d) => d.volunteerInfo,
          mapWith(ReadVolunteerInfoDto, VolunteerInfo, (s) => s.volunteerInfo),
        ),
        forMember(
          (d) => d.personal,
          mapWith(ReadPersonalDto, Personal, (s) => s.personal),
        ),
        forMember(
          (d) => d.exam,
          mapWith(ReadExamDto, Exam, (s) => s.exam),
        ),
      );
    };
  }
}
