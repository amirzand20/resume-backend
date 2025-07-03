import {Module} from '@nestjs/common';
import {AdminExamController} from "@/domain/admin/exam/admin-exam.controller";
import {ExamModule} from '@/domain/common/exam/exam.module';
import {ExamPersonModule} from '@/domain/common/exam-person/exam-person.module';
import {AnswerSubmissionModule} from '@/domain/common/exam-answer-submission/exam-answer-submission.module';

@Module({
    imports: [ExamModule, ExamPersonModule, AnswerSubmissionModule],
    controllers: [AdminExamController],
})
export class AdminExamModule {
}
