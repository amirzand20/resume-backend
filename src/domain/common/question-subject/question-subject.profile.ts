import { QuestionSubject } from '@/entities/question-subject.entity';
import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {ReadQuestionSubjectDto} from "@/domain/common/question-subject/dto/read-question-subject.dto";
import {CreateQuestionSubjectDto} from "@/domain/common/question-subject/dto/create-question-subject.dto";
import {UpdateQuestionSubjectDto} from "@/domain/common/question-subject/dto/update-question-subject.dto";

@Injectable()
export class QuestionSubjectProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        QuestionSubject,
        ReadQuestionSubjectDto,
        forMember(
          (des) => des.parentId,
          mapFrom((source) =>
            source.parentId === null ? null : source.parentId,
          ),
        ),
        forMember(
          (d) => d.children,
          mapWith(ReadQuestionSubjectDto, QuestionSubject, (s) => s.children),
        ),
        forMember(
          (des) => des.isParent,
          mapFrom((source) =>(source.children && source.children.length>0)),
        ),
      );
      createMap(mapper, ReadQuestionSubjectDto, QuestionSubject);
      createMap(mapper, CreateQuestionSubjectDto, QuestionSubject);
      createMap(mapper, UpdateQuestionSubjectDto, QuestionSubject);
    };
  }
}
