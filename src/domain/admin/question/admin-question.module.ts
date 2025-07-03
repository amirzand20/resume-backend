import { Module } from "@nestjs/common";
import { AdminQuestionController } from "@/domain/admin/question/admin-question.controller";
import { QuestionModule } from "@/domain/common/question/question.module";

@Module({
    imports: [QuestionModule],
    controllers: [AdminQuestionController],
})
export class AdminQuestionModule {
}
