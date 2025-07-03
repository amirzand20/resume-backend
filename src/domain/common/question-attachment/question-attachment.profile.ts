import {QuestionAttachment} from '@/entities/question-attachment.entity';
import {createMap, Mapper} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {CreateQuestionAttachmentDto} from './dto/create-question-attachment.dto';
import {ReadQuestionAttachmentDto} from './dto/read-question-attachment.dto';

@Injectable()
export class QuestionAttachmentProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, ReadQuestionAttachmentDto, QuestionAttachment);
            createMap(
                mapper,
                QuestionAttachment,
                ReadQuestionAttachmentDto,
            );
            createMap(mapper, CreateQuestionAttachmentDto, QuestionAttachment);
        };
    }
}
