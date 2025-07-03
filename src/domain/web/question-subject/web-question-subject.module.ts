import { Module } from "@nestjs/common";
import { WebQuestionSubjectController } from "@/domain/web/question-subject/web-question-subject.controller";
import { QuestionSubjectModule } from "@/domain/common/question-subject/question-subject.module";


@Module({
    imports: [QuestionSubjectModule],
    controllers: [WebQuestionSubjectController],

})
export class WebQuestionSubjectModule {
}