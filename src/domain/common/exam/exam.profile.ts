import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { Exam } from '@/entities/exam.entity';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadBaseInfoItemDto } from '../base-info-item/dto/read-base-info-item.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { ReadExamDto } from './dto/read-exam.dto';
import { UpdateExamDifficultyDto } from './dto/update-exam-difficulty.dto';

@Injectable()
export class ExamProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateExamDto, Exam);
      createMap(mapper, UpdateExamDto, Exam);
      createMap(mapper, UpdateExamDifficultyDto, Exam);
      createMap(mapper, ReadExamDto, Exam);
      createMap(
        mapper,
        Exam,
        ReadExamDto,
        forMember(
          (d) => d.maxScore,
          mapFrom((s) => s.maxScore),
        ),
        forMember(
          (d) => d.examQuestionType,
          mapFrom((s) => s.examQuestionType),
        ),
        forMember(
          (d) => d.difficultyMeta,
          mapFrom((s) => s.difficultyMeta),
        ),
        forMember(
          (d) => d.examType,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.examType),
        ),
        forMember(
          (d) => d.examHold,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.examHold),
        ),
        forMember(
          (d) => d.examScope,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.examScope),
        ),
      );
    };
  }
}
