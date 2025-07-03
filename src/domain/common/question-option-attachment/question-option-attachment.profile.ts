import {QuestionOptionAttachment} from '@/entities/question-option-attachment.entity';
import {createMap, forMember, mapFrom, Mapper} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {
    ReadQuestionOptionAttachmentDto
} from "@/domain/common/question-option-attachment/dto/read-question-option-attachment.dto";
import {
    CreateQuestionOptionAttachmentDto
} from "@/domain/common/question-option-attachment/dto/create-question-option-attachment.dto";

@Injectable()
export class QuestionOptionAttachmentProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                ReadQuestionOptionAttachmentDto,
                QuestionOptionAttachment,
                forMember(
                    (des) => des.attachmentId,
                    mapFrom((source) => source.attachmentId),
                ),
                forMember(
                    (des) => des.fileName,
                    mapFrom((source) => source.fileName),
                ),
            );
            createMap(
                mapper,
                QuestionOptionAttachment,
                ReadQuestionOptionAttachmentDto,
                forMember(
                    (des) => des.attachmentId,
                    mapFrom((source) => source.attachmentId),
                ),
                forMember(
                    (des) => des.fileName,
                    mapFrom((source) => source.fileName),
                ),
            );
            createMap(
                mapper,
                CreateQuestionOptionAttachmentDto,
                QuestionOptionAttachment,
            );
        };
    }
}
