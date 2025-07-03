import { Module } from '@nestjs/common';
import { WebAnswerSubmissionController } from "@/domain/web/exam-answer-submission/web-exam-answer-submission.controller";
import { CommonModule } from "@/domain/common/common.module";
import { AnswerSubmissionModule } from '@/domain/common/exam-answer-submission/exam-answer-submission.module';


@Module({
    imports: [AnswerSubmissionModule, CommonModule],
    controllers: [WebAnswerSubmissionController],

})
export class WebAnswerSubmissionModule {
}
