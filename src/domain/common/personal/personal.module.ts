import {TypeOrmModule} from "@nestjs/typeorm";
import {Personal} from "@/entities/personal.entity";
import {Module} from "@nestjs/common";
import {Organ} from "@/entities/organ.entity";
import {QuestionAttachmentModule} from "@/domain/common/question-attachment/question-attachment.module";
import {ExamQuestionModule} from "@/domain/common/exam-question/exam-question.module";
import {OrganModule} from "@/domain/common/organ/organ.module";
import {PersonalRepository} from "@/domain/common/personal/personal.repository";
import {PersonalService} from "@/domain/common/personal/personal.service";
import {PersonalProfile} from "@/domain/common/personal/personal.profile";
import {OrganRepository} from "@/domain/common/organ/organ.repository";
import { FileManagerModule } from "../file-manager/file-manager.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Personal, Organ]),
        QuestionAttachmentModule,
        FileManagerModule,
        ExamQuestionModule,
        OrganModule
    ],
    providers: [PersonalRepository, PersonalService, PersonalProfile, OrganRepository],
    exports: [PersonalRepository, PersonalService],
})
export class PersonalModule {
}
