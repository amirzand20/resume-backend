import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ExamPerson } from '@/entities/exam-person.entity';
import { ReadExamPersonDto } from './dto/read-exam-person.dto';
import { CreateExamPersonDto } from './dto/create-exam-person.dto';
import { VolunteerInfo } from '@/entities/volunteer-info.entity';
import { Personal } from '@/entities/personal.entity';
import { Exam } from '@/entities/exam.entity';
import { ReadExamDto } from '../exam/dto/read-exam.dto';
import { AssignExamPersonDto } from './dto/assign-exam-person.dto';
import { ReadPersonalDto } from '../personal/dto/read-personal.dto';
import { ReadVolunteerInfoDto } from '../volunteer-info/dto/read-volunteer-info.dto';
import { ReadExamPersonCardDto } from './dto/read-exam-person-card.dto';
import { ResultExamPersonDto } from '@/domain/common/exam-person/dto/result-exam-person.dto';

@Injectable()
export class ExamPersonProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateExamPersonDto, ExamPerson);
      createMap(mapper, AssignExamPersonDto, ExamPerson);
      createMap(mapper, ReadExamPersonCardDto, ExamPerson);
      createMap(mapper, ExamPerson, ReadExamPersonCardDto);
      // createMap(mapper, ExamPerson, ResultExamPersonDto,
      //     forMember(
      //         (d) => d.score,
      //         mapFrom((s) => {
      //
      //         }),
      //     ),
      //     forMember(
      //         (d) => d.answered,
      //         mapFrom((s) => {
      //
      //         }),
      //     ),
      //     );

      createMap(
        mapper,
        ExamPerson,
        ReadExamPersonDto,
        forMember(
          (d) => d.volunteerInfo,
          mapWith(VolunteerInfo, ReadVolunteerInfoDto, (s) => s.volunteerInfo),
        ),
        forMember(
          (d) => d.personal,
          mapWith(ReadPersonalDto, Personal, (s) => s.personal),
        ),
        forMember(
          (d) => d.isChecked,
          mapFrom(
            (s) =>
              !s.answerSubmissions?.some((s) => typeof s.score !== 'number'),
          ),
        ),
        forMember(
          (d) => d.isPresent,
          mapFrom((s) => s.isPresent),
        ),
        forMember(
          (d) => d.examStartTime,
          mapFrom((s) => s.examStartTime),
        ),
        forMember(
          (d) => d.examEndTime,
          mapFrom((s) => s.examEndTime),
        ),
        forMember(
          (d) => d.personal,
          mapWith(Personal, ReadPersonalDto, (s) => s.personal),
        ),
        forMember(
          (d) => d.exam,
          mapWith(Exam, ReadExamDto, (s) => s.exam),
        ),
      );
    };
  }
}
