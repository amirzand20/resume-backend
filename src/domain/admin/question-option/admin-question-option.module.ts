import {Module} from '@nestjs/common';
import {AdminQuestionOptionController} from "@/domain/admin/question-option/admin-question-option.controller";
import { QuestionOptionModule } from '@/domain/common/question-option/question-option.module';

@Module({
    imports: [QuestionOptionModule],
    controllers: [AdminQuestionOptionController],
})
export class AdminQuestionOptionModule {
}
