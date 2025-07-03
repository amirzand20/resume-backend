import { Module } from '@nestjs/common';
import { WebExamController } from '@/domain/web/exam/web-exam.controller';
import { ExamModule } from '@/domain/common/exam/exam.module';
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';
import { AnswerSubmissionModule } from '@/domain/common/exam-answer-submission/exam-answer-submission.module';
import { ExamPersonActivityLogModule } from '@/domain/common/exam-person-activity-log/exam-person-activity-log.module';

@Module({
  imports: [
    ExamPersonActivityLogModule,
    ExamModule,
    ExamPersonModule,
    AnswerSubmissionModule,
  ],
  controllers: [WebExamController],
})
export class WebExamModule {}
