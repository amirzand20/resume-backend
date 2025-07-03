import { QuestionOptionAttachment } from '@/entities/question-option-attachment.entity';
import { QuestionOption } from '@/entities/question-option.entity';
import { Mapper, createMap, forMember, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateQuestionOptionAttachmentDto } from '../question-option-attachment/dto/create-question-option-attachment.dto';
import { ReadQuestionOptionAttachmentDto } from '../question-option-attachment/dto/read-question-option-attachment.dto';
import { CreateQuestionOptionDto } from './dto/create-question-option.dto';
import { ReadQuestionOptionDto } from './dto/read-question-option.dto';
import { UpdateQuestionOptionDto } from './dto/update-question-option.dto';
import { ReadPublicQuestionOptionDto } from './dto/read-public-question-option.dto';

@Injectable()
export class QuestionOptionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateQuestionOptionDto,
        QuestionOption,
        forMember(
          (d) => d.attachments,
          mapWith(
            QuestionOptionAttachment,
            CreateQuestionOptionAttachmentDto,
            (s) => s.files,
          ),
        ),
      );
      createMap(
        mapper,
        ReadQuestionOptionDto,
        QuestionOption,
        forMember(
          (d) => d.attachments,
          mapWith(
            QuestionOptionAttachment,
            ReadQuestionOptionAttachmentDto,
            (s) => s.files,
          ),
        ),
      );
      createMap(
        mapper,
        QuestionOption,
        ReadQuestionOptionDto,
        forMember(
          (d) => d.files,
          mapWith(
            ReadQuestionOptionAttachmentDto,
            QuestionOptionAttachment,
            (s) => s.attachments,
          ),
        ),
      );
      createMap(
        mapper,
        ReadPublicQuestionOptionDto,
        QuestionOption,
        forMember(
          (d) => d.attachments,
          mapWith(
            QuestionOptionAttachment,
            ReadQuestionOptionAttachmentDto,
            (s) => s.files,
          ),
        ),
      );
      createMap(
        mapper,
        QuestionOption,
        ReadPublicQuestionOptionDto,
        forMember(
          (d) => d.files,
          mapWith(
            ReadQuestionOptionAttachmentDto,
            QuestionOptionAttachment,
            (s) => s.attachments,
          ),
        ),
      );
      createMap(mapper, UpdateQuestionOptionDto, QuestionOption);
    };
  }
}
