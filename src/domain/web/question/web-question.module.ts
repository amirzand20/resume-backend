import { Module } from '@nestjs/common';
import { WebQuestionController } from "@/domain/web/question/web-question.controller";
import { QuestionModule } from '@/domain/common/question/question.module';


@Module({
    imports: [QuestionModule],
    controllers: [WebQuestionController],
})
export class WebQuestionModule {
}
