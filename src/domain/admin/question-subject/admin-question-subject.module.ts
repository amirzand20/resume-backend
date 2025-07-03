import { Module } from "@nestjs/common";
import { AdminQuestionSubjectController } from "@/domain/admin/question-subject/admin-question-subject.controller";
import { QuestionSubjectModule } from "@/domain/common/question-subject/question-subject.module";

@Module({
    imports: [QuestionSubjectModule],
    controllers: [AdminQuestionSubjectController],

})
export class AdminQuestionSubjectModule {
}