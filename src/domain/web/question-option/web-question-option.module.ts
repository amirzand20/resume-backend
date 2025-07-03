import {Module} from '@nestjs/common';
import {WebQuestionOptionController} from "@/domain/web/question-option/web-question-option.controller";
import { QuestionOptionModule } from '@/domain/common/question-option/question-option.module';


@Module({
    imports: [QuestionOptionModule],
    controllers: [WebQuestionOptionController],
})
export class WebQuestionOptionModule {
}
