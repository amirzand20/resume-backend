import {TypeOrmModule} from "@nestjs/typeorm";
import {
    QuestionOptionAttachmentProfile
} from "@/domain/common/question-option-attachment/question-option-attachment.profile";
import {Module} from "@nestjs/common";
import {QuestionOptionAttachment} from "@/entities/question-option-attachment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuestionOptionAttachment])],
    controllers: [],
    providers: [QuestionOptionAttachmentProfile],
    exports: [],
})
export class QuestionOptionAttachmentModule {
}
