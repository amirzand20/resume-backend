import { Module } from '@nestjs/common';
import { AdminAnswerSubmissionController } from './admin-exam-answer-submission.controller';
import { AnswerSubmissionModule } from '@/domain/common/exam-answer-submission/exam-answer-submission.module';

@Module({
    imports: [AnswerSubmissionModule],
    controllers: [AdminAnswerSubmissionController],

})
export class AdminAnswerSubmissionModule {
}
