import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, forwardRef } from "@nestjs/common";
import { Question } from "@/entities/question.entity";
import { QuestionAttachmentModule } from "@/domain/common/question-attachment/question-attachment.module";
import { ExamQuestionModule } from "@/domain/common/exam-question/exam-question.module";
import { AdminExamModule } from "@/domain/admin/exam/admin-exam.module";
import { QuestionRepository } from "@/domain/common/question/question.repository";
import { QuestionService } from "@/domain/common/question/question.service";
import { QuestionProfile } from "@/domain/common/question/question.profile";
import { ExamModule } from "../exam/exam.module";
import { FileManagerModule } from "../file-manager/file-manager.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        QuestionAttachmentModule,
        FileManagerModule,
        ExamQuestionModule,
        forwardRef(() => ExamModule)
    ],
    providers: [QuestionRepository, QuestionService, QuestionProfile],
    exports: [QuestionRepository, QuestionService],
})
export class QuestionModule {
}
